<template>
	<div
		:class="[
			'h-auto bg-white flex flex-col fixed top-[60px] md:top-[72px] left-4 sm:left-auto bottom-4 right-4 sm:w-1/3 md:w-1/4 border rounded-md border-slate-100 z-50 p-4 md:px-6 shadow-2xl shadow-slate-200 space-y-4 overflow-y-hidden',
		]"
	>
		<div class="flex justify-between shrink-0">
			<h6>
				<span> Comments </span>
			</h6>
			<span class="cursor-pointer" @click="viewComments = null">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-5 h-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</span>
		</div>

		<div class="h-full flex flex-col shrink-0 grow-0">
			<AddComment class="shrink-0 pb-4" />
			<div class="h-full overflow-y-scroll pb-12 space-y-4">
				<Comment
					v-for="comment in comments"
					:key="comment.id"
					:comment="comment"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useProjectsStore } from "@/stores/projectsStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";
const projectsStore = useProjectsStore();
const { viewComments } = storeToRefs(projectsStore);

const comments = computed(() => {
	if (!viewComments.value) {
		return [];
	}

	if (viewComments.value.type === "project") {
		const project = projectsStore.projects.find(
			(i) => i.id === viewComments.value.id
		);
		if (project) {
			project.comments.sort((a, b) =>
				a.createdAt.seconds > b.createdAt.seconds ? -1 : 1
			);
		}
		return (project && project.comments) || [];
	}
});
</script>

<style lang="scss" scoped></style>
