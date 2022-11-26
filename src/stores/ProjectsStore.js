import { defineStore } from "pinia";

const tasksView = localStorage.getItem("tasksView") || "list";

export const useProjectsStore = defineStore("projects-store", {
	state: () => {
		return {
			addNewProject: false,
			project: null,
			projects: [],
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
		toggleTasksView(view) {
			this.tasksView = ["grid", "list"].includes(view)
				? view
				: this.tasksView;
			localStorage.setItem("tasksView", this.tasksView);
		},
	},
});
