<template>
	<header
		:class="[
			'h-16 md:h-20 bg-white flex items-center shrink-0 px-6 md:px-8 fixed md:relative inset-x-0 top-0 z-40',
			authStore.isLoggedIn ? 'justify-between' : ' justify-center',
		]"
	>
		<SidebarToggler
			v-if="authStore.isLoggedIn"
			class="hidden md:inline-block"
		/>
		<img
			src="/images/vd-combologo-transparent.svg"
			class="h-5 md:h-6 w-auto cursor-pointer"
			alt=" Vuedo white combologo"
			@click="navigateToHome"
		/>
		<div v-if="authStore.isLoggedIn" class="flex items-center space-x-4">
			<IconButton size="sm">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="w-5 h-5"
				>
					<path
						fill-rule="evenodd"
						d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
						clip-rule="evenodd"
					/>
				</svg>
			</IconButton>
			<!-- <IconButton
				size="sm"
				@click="toggleAddProject"
				:title="`Add a new  ${
					route.name === 'projects' ? 'project' : 'task'
				}`"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="w-5 h-5"
				>
					<path
						d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
					/>
				</svg>
			</IconButton> -->
			<Dropdown align-to="right">
				<template #trigger>
					<div
						:class="[
							'rounded-full  text-white flex items-center',
							uiStore.sidebarOpen
								? ''
								: 'sm:p-[3px] sm:bg-rose-500',
						]"
					>
						<img
							:class="[
								'rounded-full bg-slate-200 w-10 h-10 sm:w-8 sm:h-8',
								// uiStore.sidebarOpen
								// 	? 'sm:w-8 sm:h-8'
								// 	: 'sm:w-8 sm:h-8',
								// { 'sm:w-8 sm:h-8': uiStore.sidebarOpen },
							]"
							:src="
								authStore.user.photoURL ||
								`https://i.pravatar.cc/300?u=${authStore.user.email}`
							"
							alt=""
						/>
						<span
							v-if="!uiStore.sidebarOpen"
							class="px-2 text-xs hidden sm:inline-block"
						>
							{{ authStore.getUsername }}
						</span>
					</div>
				</template>

				<template #content>
					<UserDropdownMenu />
				</template>
			</Dropdown>

			<SidebarToggler class="md:hidden" />
		</div>
	</header>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "../../stores/AuthStore";
import { useUiStore } from "../../stores/UiStore";
import { useProjectsStore } from "@/stores/projectsStore";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const uiStore = useUiStore();
const projectsStore = useProjectsStore();
const { addNewProject } = storeToRefs(projectsStore);

const toggleAddProject = () => {
	if (route.name === "projects") {
		addNewProject.value = true;
		return;
	}
};

const navigateToHome = () => {
	if (route.name !== "home") {
		router.push({ name: "home" });
	}
};
</script>
