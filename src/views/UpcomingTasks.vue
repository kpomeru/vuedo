<template>
	<div class="space-y-6">
		<h4>Upcoming Tasks</h4>

		<Week />

		<template v-if="!tasks.length && viewDate">
			<div class="bg-slate-100 rounded-md p-4 md:p-6 text-center">
				<span class="text-slate-500 text-xs">
					<span>
						{{ `No upcoming tasks for ${viewDate.fullDate}` }}</span
					>
				</span>
			</div>
		</template>

		<template v-if="tasks.length">
			<div :class="['space-y-6 relative']">
				<Task
					v-for="(i, j) in tasks"
					:key="`upcoming-task-item-${j}`"
					:id="i.id"
				/>
			</div>
		</template>

		<template v-if="!addTask">
			<div>
				<AddTaskButton @click="addTask = true"/>
			</div>
		</template>

		<template v-else>
			<AddUpdateTask
				:due-date="viewDate.fullDate"
				v-model:modelValue="addTask"
			/>
		</template>
	</div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useProjectsStore } from "@/stores/ProjectsStore";
import { storeToRefs } from "pinia";

const projectsStore = useProjectsStore();
const { tasks: tasksList, viewDate } = storeToRefs(projectsStore);

const addTask = ref(false);

const tasks = computed(() => {
	if (!viewDate.value) {
		return [];
	}
	return tasksList.value.filter((i) => i.dueDate === viewDate.value.fullDate);
});
</script>
