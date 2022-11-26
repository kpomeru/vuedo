<template>
	<div class="py-6 space-y-6">
		<template v-if="route.name === 'project'">
			<div
				v-if="project && tasks.length"
				:class="[
					'grid gap-6 relative',
					{
						'grid-cols-1 sm:grid-cols-3':
							projectStore.tasksView === 'grid',
					},
				]"
			>
				<Task
					v-for="task in project.tasks"
					:key="`project-task-item-${task.id}`"
					:id="task.id"
				/>
			</div>

			<div v-else class="text-xs text-slate-500 italic">
				<span>No tasks for this project</span>
			</div>

			<template v-if="!addTask">
				<div>
					<span
						class="flex items-center space-x-1.5 cursor-pointer hover:text-rose-500"
						@click="addTask = true"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							class="w-4 h-4"
						>
							<path
								d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
							/>
						</svg>

						<span>Add Task</span>
					</span>
				</div>
			</template>

			<template v-else>
				<AddUpdateTask
					:project-id="(project && project.id) || ''"
					v-model:modelValue="addTask"
				/>
			</template>
		</template>

		<template v-if="route.name === 'task'">
			<router-view></router-view>
		</template>
	</div>
</template>

<script setup>
import { useProjectsStore } from "@/stores/projectsStore";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const projectStore = useProjectsStore();
const route = useRoute();
const router = useRouter();

const addTask = ref(false);

const project = computed(
	() => projectStore.projects.find((p) => p.id === route.params.id) || null
);

const tasks = computed(() => {
	const ts = project.value.tasks;
	ts.sort((a, b) => (a.title > b.title ? 1 : -1));
	return ts;
});

watch(
	() => project.value,
	(value) => {
		if (!value) {
			if (route.name === "project" && projectStore.projects.length) {
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
