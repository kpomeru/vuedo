<template>
	<div>hello</div>
</template>

<script setup>
import { useProjectsStore } from "@/stores/projectsStore";
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const projectStore = useProjectsStore();
const route = useRoute();
const router = useRouter();

const project = computed(
	() => projectStore.projects.find((p) => p.id === route.params.id) || null
);

watch(
	() => project.value,
	(value) => {
		if (!value) {
			if (route.name === "project") {
				router.push({
					name: "project",
					params: { id: projectStore.projects[0].id },
				});
			}
		} else {
			document.title = `Project: ${project.value.title} | Vuedo`;
		}
	},
	{ immediate: true }
);
</script>
