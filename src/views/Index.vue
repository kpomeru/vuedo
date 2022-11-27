<template>
	<div>
		<LandingBanner />
	</div>
</template>

<script setup>
import { useRoute } from "vue-router";
import LandingBanner from "@/components/home/LandingBanner.vue";

const route = useRoute();
</script>
