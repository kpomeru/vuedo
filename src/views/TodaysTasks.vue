<template>
	<div class="space-y-6">
		<h4 class="">
			<span>Today's Tasks</span>
			<span v-if="date" class="text-rose-500">
				{{
					` (${date.day.long}, ${date.day.ordinal} ${
						date.month.short
					}. ${dayjs(date.fulldate).format("YYYY")})`
				}}
			</span>
		</h4>

		<template v-if="!tasks.length">
			<div class="bg-slate-100 rounded-md p-4 md:p-6 text-center">
				<span class="text-slate-500 text-xs">
					<span> {{ `There are no tasks today` }}</span>
				</span>
			</div>
		</template>

		<template v-if="tasks.length">
			<div :class="['space-y-6 relative']">
				<Task
					v-for="(i, j) in tasks"
					:key="`todays-task-item-${j}`"
					:id="i.id"
				/>
			</div>
		</template>

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
				:due-date="date.fullDate"
				v-model:modelValue="addTask"
			/>
		</template>
	</div>
</template>

<script setup>
import { useDates } from "@/compositions/dates";
import dayjs from "dayjs";
import { computed, onMounted, ref } from "vue";
import { useProjectsStore } from "@/stores/projectsStore";
import { storeToRefs } from "pinia";

const { formatDateLite } = useDates();

const projectsStore = useProjectsStore();
const { tasks: tasksList } = storeToRefs(projectsStore);

const addTask = ref(false);

const date = ref(null);

const tasks = computed(() => {
	if (!date.value) {
		return [];
	}
	return tasksList.value.filter((i) => i.dueDate === date.value.fullDate);
});

onMounted(() => {
	date.value = formatDateLite(dayjs());
});
</script>
