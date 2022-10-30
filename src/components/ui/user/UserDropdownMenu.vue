<template>
	<div>
		<div class="menu__item" title="Open profile">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				class="w-4 h-4"
			>
				<path
					fill-rule="evenodd"
					d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
					clip-rule="evenodd"
				/>
			</svg>

			<span>Profile</span>
		</div>
		<div
			class="menu__item"
			@click="authStore.signOutUser"
			title="Sign out from Vuedo"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				class="w-4 h-4"
			>
				<path
					fill-rule="evenodd"
					d="M10 2a.75.75 0 01.75.75v7.5a.75.75 0 01-1.5 0v-7.5A.75.75 0 0110 2zM5.404 4.343a.75.75 0 010 1.06 6.5 6.5 0 109.192 0 .75.75 0 111.06-1.06 8 8 0 11-11.313 0 .75.75 0 011.06 0z"
					clip-rule="evenodd"
				/>
			</svg>
			<span>Sign Out</span>
		</div>
	</div>
</template>

<script setup>
import { useAuthStore } from "@/stores/AuthStore";
const authStore = useAuthStore();
</script>

<style lang="scss" scoped>
.menu__item {
	@apply cursor-pointer space-x-2 flex items-center text-xs px-4 hover:bg-slate-100 hover:text-rose-500 py-2;
}
</style>
