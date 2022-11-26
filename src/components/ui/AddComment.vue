<template>
	<Card has-border padding="p-4">
		<form class="space-y-2 w-full" @submit.prevent="addComment">
			<textarea
				ref="commentArea"
				class="w-full min-h-[80px] max-h-20 border-0 p-0 focus:outline-none focus:border-0 focus:ring-0 text-xs"
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
import { ref, watch } from "vue";

const props = defineProps({
	project: { type: Object, required: true },
	task: { type: Object, required: true },
});

const projectsStore = useProjectsStore();
const { addComment: aComment } = useProjects();

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

const addComment = async () => {
	processing.value = true;
	await aComment({
		project: props.project,
		task: props.task,
		comment: comment.value,
	});
	comment.value = "";
	processing.value = false;
};
</script>
