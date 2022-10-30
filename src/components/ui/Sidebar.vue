<template>
	<div :class="['h-auto bg-white overflow-y-scroll flex flex-col']">
		<div class="h-full p-6 flex flex-col space-y-6">
			<UserBanner />
			<ProjectsMenu></ProjectsMenu>
			<span class="cursor-pointer" @click="authStore.signOutUser"
				>Sign Out</span
			>

			<!-- <router-link :to="{ name: 'sign-in' }">Sign In</router-link>
			<router-link :to="{ name: 'sign-up' }">Sign Up</router-link> -->
		</div>
		<Footer />
	</div>
</template>

<script setup>
import { useAuthStore } from "../../stores/AuthStore";
import UserBanner from "./user/UserBanner.vue";
const authStore = useAuthStore();
</script>
