import { defineStore } from "pinia";

const sidebarOpen = JSON.parse(localStorage.getItem("sidebarOpen")) || false;

export const useUiStore = defineStore("ui-store", {
	state: () => {
		return {
			sidebarOpen,
			pageLoading: true,
		};
	},
	actions: {
		toggleSidebar() {
			this.sidebarOpen = !this.sidebarOpen;
			localStorage.setItem("sidebarOpen", this.sidebarOpen);
		},
		togglePageLoading() {
			this.pageLoading = !this.pageLoading;
		},
	},
});
