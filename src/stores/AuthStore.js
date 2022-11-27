import { defineStore } from "pinia";
import { getAuth, signOut } from "firebase/auth";
import { useUiStore } from "@/stores/UiStore";
import { useToast } from "vue-toastification";
import { auth } from "@/vuedo-firebase";
const toast = useToast();

export const useAuthStore = defineStore("auth-store", {
	state: () => {
		return {
			user: null,
		};
	},
	getters: {
		isLoggedIn: (state) => {
			return state.user !== null;
		},
		getUsername: (state) => {
			if (!state.user || (state.user && !state.user.displayName)) {
				return "VuedoUser";
			}
			return state.user.displayName.split(" ")[0];
		},
	},
	actions: {
		async signOutUser() {
			const uiStore = useUiStore();
			uiStore.pageLoading = true;
			await signOut(auth);
			toast("Signed out");
			uiStore.pageLoading = false;
		},
	},
});
