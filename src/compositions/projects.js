import { v4 as uuidv4 } from "uuid";
import { useAuthStore } from "../stores/authStore";
import { db } from "../vuedo-firebase";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	Timestamp,
	updateDoc,
} from "@firebase/firestore";
import { useToast } from "vue-toastification";
import _ from "lodash";

export const useProjects = () => {
	const authStore = useAuthStore();
	const toast = useToast();

	const addProject = async ({ title }) => {
		if (!title) {
			toast.error("Please enter a title.");
			return;
		}

		try {
			const t = _.startCase(title);
			await addDoc(collection(db, "projects"), {
				comments: [],
				createdAt: Timestamp.fromDate(new Date()),
				tasks: [],
				title: t,
				userId: authStore.user.uid,
			});
			if (title !== "general") {
				toast.success(`"${t}" project added.`);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const deleteProject = async (project) => {
		if (project.title.toLowerCase() === "general") {
			toast.error("Default project 'general' cannot be deleted.");
			return;
		}

		try {
			const t = _.startCase(project.title);
			await deleteDoc(doc(db, "projects", project.id));
			toast.success(`"${t}" project deleted.`);
		} catch (error) {
			console.log(error);
		}
	};

	const addComment = async ({ project, type, id = null, comment }) => {
		if (!comment || (comment && comment.length < 2)) {
			toast("Comment must be 2 or more characters");
			return;
		}
		const newComment = {
			content: comment,
			createdAt: Timestamp.fromDate(new Date()),
			id: uuidv4(),
		};

		try {
			await updateDoc(doc(db, "projects", project.id), {
				comments:
					project.comments && project.comments.length
						? [...project.comments, newComment]
						: [newComment],
			});
		} catch (error) {
			console.log(error);
		}
	};

	const deleteComment = async ({ project, type, id = null, comment }) => {
		try {
			await updateDoc(doc(db, "projects", project.id), {
				comments: project.comments.filter((i) => i.id !== comment.id),
			});
		} catch (error) {
			console.log(error);
		}
	};

	return { addComment, addProject, deleteComment, deleteProject };
};
