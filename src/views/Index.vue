<template>
	<div>
		<NotFound
			v-if="isNotFound"
			class="mb-6 md:mb-8 lg:mb-10 xl:mb-12 2xl:mb-16"
		/>
		<LandingBanner v-else />
	</div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import NotFound from "@/components/home/NotFound.vue";
import LandingBanner from "@/components/home/LandingBanner.vue";

const route = useRoute();

const isNotFound = computed(() => route.name === "not-found");
</script>
