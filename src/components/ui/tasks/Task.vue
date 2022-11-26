<template>
	<Card
		class="relative group"
		full-body
		has-border
		:padding="projectStore.tasksView === 'list' ? 'p-6' : 'p-4'"
	>
		<router-link
			v-if="task.id"
			:to="{
				name: 'task',
				params: {
					id: route.params.id || task.projectId,
					taskId: task.id,
				},
			}"
		>
			<span
				class="rounded-full w-8 h-8 bg-rose-500 absolute -right-4 top-1/2 -mt-4 hidden group-hover:flex items-center justify-center text-white"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="w-5 h-5 ml-0.5"
				>
					<path
						fill-rule="evenodd"
						d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
						clip-rule="evenodd"
					/>
				</svg>
			</span>
		</router-link>

		<div
			:class="[
				'flex',
				projectStore.tasksView === 'list'
					? 'space-x-3 sm:space-x-4'
					: 'space-x-2 sm:space-x-3',
			]"
		>
			<div class="shrink-0 grow-0">
				<input
					class="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
					type="checkbox"
					value=""
					:id="task.id"
					:checked="completed"
					@change="completed = !completed"
				/>
			</div>
			<div class="space-y-2 w-full">
				<h6
					:class="[
						'leading-none relative max-w-max',
						{ 'line-through': completed },
					]"
				>
					<span>{{ task.title }}</span>
				</h6>
				<template v-if="task.content">
					<div class="text-slate-500">
						{{ task.content }}
					</div>
				</template>
				<template v-if="dueDate || route.name === 'upcoming-tasks'">
					<div class="flex items-center space-x-2">
						<template
							v-if="route.name === 'upcoming-tasks' && project"
						>
							<Badge class="dark"> {{ project.title }} </Badge>
						</template>
						<template v-if="dueDate">
							<Badge>
								{{ dueDate }}
							</Badge>
						</template>
					</div>
				</template>
			</div>
		</div>
	</Card>
</template>

<script setup>
import dayjs from "dayjs";
import { computed, onMounted, ref, watch } from "vue";
import { useProjects } from "@/compositions/projects";
import { useProjectsStore } from "@/stores/projectsStore";
import { useRoute } from "vue-router";

const props = defineProps({
	id: { type: String, required: true },
});

const route = useRoute();

const projectStore = useProjectsStore();
const { addTask } = useProjects();

const completed = ref(false);

const task = computed(
	() => projectStore.tasks.find((t) => t.id === props.id) || null
);

const project = computed(() =>
	task.value
		? projectStore.projects.find((p) => p.id === task.value.projectId)
		: null
);

const dueDate = computed(() => {
	if (!task.value.dueDate) {
		return;
	}

	return dayjs(task.value.dueDate).format("MMM D, YYYY");
});

watch(
	() => completed.value,
	(value) => {
		if (task.value.completed !== value) {
			addTask(
				{
					...task.value,
					completed: completed.value,
					currentProjectId: task.value.projectId,
					projectId: task.value.projectId,
				},
				true
			);
		}
	}
);

onMounted(() => {
	completed.value = task.value.completed;
});
</script>
