<template>
	<div class="py-6 space-y-6">
		<template v-if="route.name === 'project'">
			<div
				v-if="project && tasks.length"
				:class="[
					'grid gap-6 relative',
					{
						'grid-cols-1 sm:grid-cols-3':
							projectsStore.tasksView === 'grid',
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
					<AddTaskButton @click="addTask = true"/>
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
import { useProjectsStore } from "@/stores/ProjectsStore";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const projectsStore = useProjectsStore();
const route = useRoute();
const router = useRouter();

const addTask = ref(false);

const project = computed(
	() => projectsStore.projects.find((p) => p.id === route.params.id) || null
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
			if (route.name === "project" && projectsStore.projects.length) {
				router.push({
					name: "project",
					params: { id: projectsStore.projects[0].id },
				});
			}
		} else {
			document.title = `Project: ${project.value.title} | Vuedo`;
		}
	},
	{ immediate: true }
);
</script>
