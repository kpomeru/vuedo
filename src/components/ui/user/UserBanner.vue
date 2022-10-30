<template>
	<div
		v-if="user"
		class="bg-rose-500 text-white p-4 rounded-md flex justify-between items-center overflow-hidden shadow-lg"
	>
		<div class="w-1/4 grow-0 shrink-0">
			<img
				class="rounded-full -translate-x-6 scale-[1.75]"
				alt=""
				:src="
					user.photoURL || `https://i.pravatar.cc/300?u=${user.email}`
				"
			/>
		</div>
		<div class="w-3/4 text-sm flex flex-col grow-0 shrink-0 pl-2 sm:pl-4">
			<span class="text-ellipsis">
				{{ user.displayName }}
			</span>
			<span class="text-xs text-ellipsis overflow-hidden">
				{{ user.email }}
			</span>
		</div>
	</div>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "../../../stores/AuthStore";

const authStore = useAuthStore();
const user = computed(() => authStore.user);
</script>
