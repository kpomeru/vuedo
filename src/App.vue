<template>
	<Loader v-if="uiStore.pageLoading" />
	<Sidebar
		:class="[
			'fixed inset-y-0 z-50 w-80',
			uiStore.sidebarOpen && authStore.isLoggedIn
				? 'left-0 border-r border-slate-100'
				: '-left-80',
		]"
	/>
	<div
		:class="[
			'flex flex-col md:fixed md:inset-y-0 md:right-0',
			uiStore.sidebarOpen && authStore.isLoggedIn ? 'left-80' : 'left-0',
		]"
	>
		<Header />
		<div :class="['h-screen overflow-y-scroll pt-16 md:pt-0']">
			<div
				class="py-6 md:py-10 px-6 md:pr-8 w-full md:max-w-screen-md mx-auto"
			>
				<!-- <router-view v-slot="{ Component }">
					<keep-alive>
						<component :is="Component" />
					</keep-alive>
				</router-view> -->

				<router-view></router-view>
			</div>
		</div>
	</div>
	<template v-if="authStore.user">
		<Search />
	</template>
</template>

<script setup>
import { onMounted, watch } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { useUiStore } from "@/stores/UiStore";
import { useAuthStore } from "@/stores/AuthStore";
import { auth } from "@/vuedo-firebase";
import { useRoute, useRouter } from "vue-router";
import { useProjectsStore } from "@/stores/ProjectsStore";

const authStore = useAuthStore();
const uiStore = useUiStore();
const route = useRoute();
const router = useRouter();
const projectsStore = useProjectsStore();

const redirectChecks = () => {
	if (authStore.user && route.meta.isGuest) {
		router.push({ name: "projects" });
	}
	if (!authStore.user && route.meta.requiresAuth) {
		router.push({ name: "sign-in" });
	}
	return;
};

watch(
	() => route.path,
	() => {
		return redirectChecks();
	},
	{ immediate: true }
);

watch(
	() => authStore.user,
	() => {
		return redirectChecks();
	},
	{ immediate: true }
);

onMounted(() => {
	onAuthStateChanged(auth, (user) => {
		authStore.user = user ? user : null;
		projectsStore.projects = [];
	});
	uiStore.pageLoading = false;
});
</script>
