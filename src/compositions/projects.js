import { v4 as uuidv4 } from "uuid";
import { useAuthStore } from "../stores/authStore";
import { db } from "../vuedo-firebase";
import { useProjectsStore } from "@/stores/projectsStore";
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

import { useDates } from "@/compositions/dates";
const { formatDate } = useDates();

export const useProjects = () => {
	const authStore = useAuthStore();
	const projectsStore = useProjectsStore();
	const toast = useToast();

	const addProject = async ({ title }) => {
		if (!title) {
			toast.error("Please enter a title.");
			return;
		}

		if (
			projectsStore.projects
				.map((p) => p.title.toLowerCase())
				.includes(title.toLowerCase())
		) {
			if (title.toLowerCase() !== "general") {
				toast.error(`A project with title "${title} already exists."`);
			}
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

	const addComment = async ({ project, task, comment }) => {
		if (!comment || (comment && comment.length < 2)) {
			toast("Comment must be 2 or more characters");
			return;
		}

		// console.log(project, task, comment);
		// return;

		const newComment = {
			content: comment,
			createdAt: Timestamp.fromDate(new Date()),
			id: uuidv4(),
		};

		const updateData = task
			? {
					tasks: [
						...project.tasks.filter((i) => i.id !== task.id),
						project.tasks
							.filter((i) => i.id === task.id)
							.map((i) => {
								return {
									...i,
									comments:
										i.comments && i.comments.length
											? [...i.comments, newComment]
											: [newComment],
								};
							})[0],
					],
			  }
			: {
					comments:
						project.comments && project.comments.length
							? [...project.comments, newComment]
							: [newComment],
			  };

		// console.log(updateData);
		// return;

		try {
			await updateDoc(
				doc(db, "projects", project.id),
				updateData
				// {
				// 	comments:
				// 		project.comments && project.comments.length
				// 			? [...project.comments, newComment]
				// 			: [newComment],
				// }
			);
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

	const addTask = async (task, isCompleteUpdate = false) => {
		if (!task.title || (task.title && task.title.length < 2)) {
			toast("Task must have a title of 2 or more characters.");
			return;
		}

		const project = projectsStore.projects.find(
			(p) => p.id === task.projectId
		);

		const currentProject = projectsStore.projects.find(
			(p) => p.id === task.currentProjectId
		);

		if (!project) {
			toast("Project not found.");
			return;
		}

		let tasks = project.tasks || [];
		let oldTask;

		if (task.id) {
			oldTask = project.tasks.find((t) => t.id === task.id);
		}

		if (oldTask) {
			tasks = tasks.filter((t) => t.id !== oldTask.id);
		}

		const uTask = {
			content: task.content,
			completed: task.completed,
			dueDate: task.dueDate,
			title: _.startCase(task.title),

			comments: oldTask && oldTask.comments ? oldTask.comments : [],
			createdAt: oldTask
				? oldTask.createdAt
				: Timestamp.fromDate(new Date()),
			id: oldTask && oldTask.id ? oldTask.id : uuidv4(),
		};

		try {
			const result = await updateDoc(doc(db, "projects", project.id), {
				tasks: [...tasks, uTask],
			});

			if (currentProject.id !== project.id) {
				await updateDoc(doc(db, "projects", currentProject.id), {
					tasks: currentProject.tasks.filter((t) => t.id !== task.id),
				});
			}

			if (!isCompleteUpdate) {
				toast.success(
					oldTask && oldTask.id ? "Task updated." : "Task added."
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const deleteTask = async (project, id) => {
		if (!project) {
			toast("Project not found.");
			return;
		}

		try {
			await updateDoc(doc(db, "projects", project.id), {
				tasks: project.tasks.filter((i) => i.id !== id),
			});
			toast.success("Task deleted.");
		} catch (error) {
			console.log(error);
		}
	};

	const setProject = (doc) => {
		return {
			id: doc.id,
			comments: [],
			tasks: [],
			...doc.data(),
			createdAt: formatDate(doc.data().createdAt),
		};
	};

	return {
		addComment,
		addProject,
		addTask,
		deleteComment,
		deleteProject,
		deleteTask,
		setProject,
	};
};
