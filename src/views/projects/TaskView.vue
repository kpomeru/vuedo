<template>
	<div v-if="task" class="space-y-6">
		<template v-if="!editState">
			<Card has-header>
				<template #header>
					<div class="flex items-center space-x-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							class="w-5 h-5"
						>
							<path
								fill-rule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
								clip-rule="evenodd"
							/>
						</svg>

						<h6 class="leading-none">Task Details</h6>
					</div>
				</template>
				<div class="divide-y divide-dashed divide-slate-200">
					<div class="grid grid-cols-3 pb-3 gap-4 sm:gap-6">
						<div class="italic text-slate-500">Id</div>
						<div class="col-span-2">
							{{ task.id }}
						</div>
					</div>
					<div class="grid grid-cols-3 py-3 gap-4 sm:gap-6">
						<div class="italic text-slate-500">Title</div>
						<div class="col-span-2">
							{{ task.title }}
						</div>
					</div>
					<div class="grid grid-cols-3 py-3 gap-4 sm:gap-6">
						<div class="italic text-slate-500">Content</div>
						<div class="col-span-2">
							{{ task.content }}
						</div>
					</div>
					<div class="grid grid-cols-3 py-3 gap-4 sm:gap-6">
						<div class="italic text-slate-500">Due Date</div>
						<div class="col-span-2">
							<span v-if="task.dueDate">{{
								dayjs(task.dueDate).format("MMM D, YYYY")
							}}</span>
							<span v-else class="text-slate-400">N/A</span>
							<template v-if="task.completed">
								<Badge> Completed </Badge>
							</template>
						</div>
					</div>
					<div class="grid grid-cols-3 py-3 gap-4 sm:gap-6">
						<div class="italic text-slate-500">Comments</div>
						<div
							class="col-span-2 cursor-pointer flex items-center space-x-1"
						>
							<span>{{ task.comments.length }} </span>
							<span>Comments.</span>
						</div>
					</div>
					<div class="grid grid-cols-3 py-3 gap-4 sm:gap-6">
						<div class="italic text-slate-500">Created At</div>
						<div class="col-span-2">
							{{ createdAt.date }}
							{{
								`${createdAt.hour}:${createdAt.minute}${createdAt.ampm}`
							}}
						</div>
					</div>
				</div>
			</Card>

			<Button @click="editState = !editState">
				<span>Edit Task</span>
			</Button>
		</template>

		<template v-if="editState">
			<AddUpdateTask
				:project-id="(project && project.id) || ''"
				:task="{ ...task }"
				v-model:modelValue="editState"
			/>
		</template>
	</div>
</template>

<script setup>
import dayjs from "dayjs";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProjectsStore } from "@/stores/projectsStore";
import { useDates } from "@/compositions/dates";

const { formatDate } = useDates();
const projectStore = useProjectsStore();
const route = useRoute();
const router = useRouter();

const editState = ref(false);

const task = computed(() =>
	projectStore.tasks.find((t) => t.id === route.params.taskId)
);

const project = computed(
	() => projectStore.projects.find((p) => p.id === task.projectId) || null
);

const createdAt = computed(() => formatDate(task.value.createdAt));

watch(
	() => task.value,
	(value) => {
		if (!value) {
			if (route.name === "task") {
				router.go(-1);
			}
		} else {
			document.title = `Task: ${task.value.title} | Vuedo`;
		}
	},
	{ immediate: true }
);
</script>
