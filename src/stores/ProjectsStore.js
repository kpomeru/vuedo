import { defineStore } from "pinia";

export const useProjectsStore = defineStore("projects-store", {
	state: () => {
		return {
			projects: [],
			project: null,
			addNewProject: false,
		};
	},
	actions: {},
});
