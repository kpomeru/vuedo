import { useAuthStore } from "../stores/authStore";
import { db } from "../vuedo-firebase";
import { addDoc, collection, Timestamp } from "@firebase/firestore";
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
				createdAt: Timestamp.fromDate(new Date()),
				title: t,
				userId: authStore.user.uid,
			});
			toast.success(`${t} project added.`);
		} catch (error) {
			console.log(error);
		}
	};

	return { addProject };
};
