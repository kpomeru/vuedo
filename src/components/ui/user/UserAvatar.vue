<template>
	<img
		class="rounded-full -translate-x-6 scale-[1.75]"
		alt=""
		:src="
			authStore.user.photoURL ||
			`https://i.pravatar.cc/300?u=${authStore.user.email}`
		"
	/>
</template>

<script setup>
import { useAuthStore } from "../../../stores/AuthStore";
const authStore = useAuthStore();
</script>
