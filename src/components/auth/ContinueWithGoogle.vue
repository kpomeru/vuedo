<template>
	<Button
		class="w-full"
		color="white"
		:disabled="disabled"
		@click="continueWithGoogle"
	>
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M18.1712 8.36794H17.5V8.33335H9.99999V11.6667H14.7096C14.0225 13.6071 12.1762 15 9.99999 15C7.23874 15 4.99999 12.7613 4.99999 10C4.99999 7.23877 7.23874 5.00002 9.99999 5.00002C11.2746 5.00002 12.4342 5.48085 13.3171 6.26627L15.6742 3.90919C14.1858 2.5221 12.195 1.66669 9.99999 1.66669C5.39791 1.66669 1.66666 5.39794 1.66666 10C1.66666 14.6021 5.39791 18.3334 9.99999 18.3334C14.6021 18.3334 18.3333 14.6021 18.3333 10C18.3333 9.44127 18.2758 8.89585 18.1712 8.36794Z"
				fill="#FFC107"
			/>
			<path
				d="M2.6275 6.12127L5.36542 8.12919C6.10625 6.29502 7.90042 5.00002 10 5.00002C11.2746 5.00002 12.4342 5.48085 13.3171 6.26627L15.6742 3.90919C14.1858 2.5221 12.195 1.66669 10 1.66669C6.79917 1.66669 4.02334 3.47377 2.6275 6.12127Z"
				fill="#FF3D00"
			/>
			<path
				d="M9.99999 18.3333C12.1525 18.3333 14.1083 17.5096 15.5871 16.17L13.0079 13.9875C12.1431 14.6451 11.0864 15.0008 9.99999 15C7.83249 15 5.99207 13.6179 5.29874 11.6891L2.58124 13.7829C3.9604 16.4816 6.76124 18.3333 9.99999 18.3333Z"
				fill="#4CAF50"
			/>
			<path
				d="M18.1712 8.3679H17.5V8.33331H10V11.6666H14.7096C14.3809 12.5902 13.7889 13.3971 13.0067 13.9879L13.0079 13.9871L15.5871 16.1696C15.4046 16.3354 18.3333 14.1666 18.3333 9.99998C18.3333 9.44123 18.2758 8.89581 18.1712 8.3679Z"
				fill="#1976D2"
			/>
		</svg>

		<span> Continue with Google </span>
	</Button>
</template>

<script setup>
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useUiStore } from "@/stores/UiStore";
import _ from "lodash";
import { auth } from "@/vuedo-firebase";

const props = defineProps({
	disabled: { type: Boolean, default: false },
	page: { type: String, default: "sign-up" },
});

const route = useRoute();
const router = useRouter();
const uiStore = useUiStore();
const toast = useToast();

const continueWithGoogle = async () => {
	toast.clear();
	uiStore.pageLoading = true;
	const provider = new GoogleAuthProvider();

	try {
		const result = await signInWithPopup(auth, provider);
		// toast.success(`${_.startCase(route.name)} succesful`);

		router.push({ name: "home" });
	} catch (error) {
		// auth/popup-closed-by-user
		console.log(error);
	}
	uiStore.pageLoading = false;
};
</script>
