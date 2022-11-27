<template>
	<div :class="['h-auto bg-white overflow-y-scroll flex flex-col']">
		<div class="h-full p-6 flex flex-col space-y-6">
			<UserBanner />
			<span class="flex flex-col space-y-4">
				<router-link
					v-for="(r, ri) in links"
					:key="`route-${ri}`"
					:to="{ name: r.name }"
					:title="`${r.title}`"
				>
					<span
						:class="['isLink', { active: route.name === r.name }]"
					>
						<svg
							v-if="r.name === 'todays-tasks'"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							class="w-4 h-4"
						>
							<path
								fill-rule="evenodd"
								d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
								clip-rule="evenodd"
							/>
						</svg>

						<svg
							v-if="r.name === 'upcoming-tasks'"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							class="w-4 h-4"
						>
							<path
								d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z"
							/>
							<path
								fill-rule="evenodd"
								d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
								clip-rule="evenodd"
							/>
						</svg>
						<span>{{ r.title }}</span>
					</span>
				</router-link>
			</span>
			<ProjectsMenu></ProjectsMenu>
			<span class="cursor-pointer" @click="authStore.signOutUser"
				>Sign Out</span
			>
		</div>
		<Footer />
		<AddNewProject />
	</div>
</template>

<script setup>
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "../../stores/AuthStore";
import UserBanner from "./user/UserBanner.vue";
import { useUiStore } from "@/stores/UiStore";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const uiStore = useUiStore();
const { sidebarOpen } = storeToRefs(uiStore);

const route = useRoute();

const links = [
	{ name: "todays-tasks", title: "Today's Tasks" },
	{ name: "upcoming-tasks", title: "Upcoming Tasks" },
];

const deviceWidth = computed(() => window.innerWidth);

watch(
	() => route.path,
	() => {
		if (sidebarOpen.value && deviceWidth.value <= 576) {
			sidebarOpen.value = false;
		}
	}
);
</script>

<style lang="scss" scoped>
.isLink {
	@apply hover:text-rose-500 flex items-center space-x-2;
	&.active {
		@apply text-rose-500 font-medium;
	}
}
</style>
