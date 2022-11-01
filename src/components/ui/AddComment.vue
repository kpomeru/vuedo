<template>
	<Card has-border padding="p-4">
		<form class="space-y-2 w-full" @submit.prevent="addComment">
			<textarea
				ref="commentArea"
				class="w-full min-h-[80px] max-h-20 focus:outline-none focus:border-none text-xs"
				v-model="comment"
				placeholder="Add a comment"
			></textarea>
			<div class="flex justify-end">
				<Button :disabled="!comment || processing" type="submit">
					<spinner
						v-if="processing"
						color="light"
						size="w-6 h-6"
					></spinner>
					<span v-else>Add</span>
				</Button>
			</div>
		</form>
	</Card>
</template>

<script setup>
import { useProjects } from "@/compositions/projects";
import { useProjectsStore } from "@/stores/ProjectsStore";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";

const projectsStore = useProjectsStore();
const { addComment: aComment } = useProjects();

const route = useRoute();

const processing = ref(false);
const commentArea = ref(null);
watch(
	() => projectsStore.viewComments,
	(value) => {
		if (value) {
			commentArea.value && commentArea.value.focus();
		}
	},
	{ immediate: true }
);
const comment = ref("");
const toast = useToast();

const project = computed(
	() => projectsStore.projects.find((p) => p.id === route.params.id) || null
);

const addComment = async () => {
	processing.value = true;
	await aComment({
		project: project.value,
		type: projectsStore.viewComments.type,
		id: projectsStore.viewComments.id,
		comment: comment.value,
	});
	comment.value = "";
	processing.value = false;
};
</script>
