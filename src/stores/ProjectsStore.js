import { defineStore } from "pinia";

const tasksView = localStorage.getItem("tasksView") || "list";

export const useProjectsStore = defineStore("projects-store", {
	state: () => {
		return {
			addNewProject: false,
			viewComments: null,
			project: null,
			projects: [],
			tasksView,
		};
	},
	getters: {
		tasks(state) {
			return state.projects
				.filter((i) => (i.tasks && i.tasks.length) || false)
				.map((i) => {
					return { ...i.tasks, projectId: i.id };
				});
		},
	},
	actions: {
		toggleTasksView(view) {
			this.tasksView = ["grid", "list"].includes(view)
				? view
				: this.tasksView;
			localStorage.setItem("tasksView", this.tasksView);
		},
	},
});
