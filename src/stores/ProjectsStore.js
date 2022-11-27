import { defineStore } from "pinia";
import { useDates } from "@/compositions/dates";
import { db } from "@/vuedo-firebase";
import {
	collection,
	getDocs,
	query,
	where,
	orderBy,
} from "@firebase/firestore";
import { useAuthStore } from "@/stores/AuthStore";
import { useProjects } from "@/compositions/projects";

const { formatDate } = useDates();
const tasksView = localStorage.getItem("tasksView") || "list";

export const useProjectsStore = defineStore("projects-store", {
	state: () => {
		return {
			addNewProject: false,
			project: null,
			projects: [],
			search: false,
			tasksView,
			viewComments: false,
			viewDate: null,
		};
	},
	getters: {
		tasks(state) {
			const list = [];
			state.projects
				.filter((p) => (p.tasks && p.tasks.length) || false)
				.forEach((p) => {
					const pId = p.id;
					p.tasks.forEach((t) => {
						const nT = { ...t, projectId: pId };
						list.push(nT);
					});
				});
			return list;
		},
	},
	actions: {
		async getProjects() {
			const projects = useProjects();
			const authStore = useAuthStore();
			const projectsRef = collection(db, "projects");

			const q = query(
				projectsRef,
				where("userId", "==", authStore.user.uid),
				orderBy("title"),
				orderBy("createdAt")
			);

			try {
				const querySnapshot = await getDocs(q);
				const list = [];
				querySnapshot.forEach((doc) => {
					list.push(projects.setProject(doc));
				});
				this.projects = list;
			} catch (error) {}
		},

		toggleTasksView(view) {
			this.tasksView = ["grid", "list"].includes(view)
				? view
				: this.tasksView;
			localStorage.setItem("tasksView", this.tasksView);
		},
	},
});
