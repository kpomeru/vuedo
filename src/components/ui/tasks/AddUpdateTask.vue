<template>
	<Card
		class="shadow-2xl shadow-slate-200 relative"
		padding="p-4 md:p-6"
		has-border
	>
		<span
			class="cursor-pointer text-slate-500 hover:text-rose-500"
			@click="closeCreate"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="w-6 h-6 absolute -top-2.5 -right-2.5"
			>
				<path
					fill-rule="evenodd"
					d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
					clip-rule="evenodd"
				/>
			</svg>
		</span>
		<form class="space-y-4" @submit.prevent="addTask">
			<input
				class="leading-none w-full focus:outline-none focus:border-0 focus:ring-0 p-0 text-base"
				placeholder="Enter Task title"
				v-model="taskData.title"
			/>
			<textarea
				class="w-full min-h-[80px] sm:min-h-[64px] max-h-32 sm:max-h-28 md:max-h-20 border-0 p-0 focus:outline-none focus:border-0 focus:ring-0 text-slate-500"
				placeholder="Description"
				v-model="taskData.content"
			></textarea>
			<div class="flex items-center space-x-3">
				<input
					class="text-rose-600 rounded focus:ring-rose-500"
					id="input-completed"
					type="checkbox"
					v-model="taskData.completed"
				/>
				<label for="input-completed">Completed?</label>
			</div>
			<div class="flex items-center justify-between space-x-2">
				<div class="flex items-center relative space-x-2">
					<Button color="white" @click="dueOnDate.showPicker()">
						<span class="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="w-4 h-4 hidden sm:inline-block mr-1.5"
							>
								<path
									d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z"
								/>
								<path
									fill-rule="evenodd"
									d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
									clip-rule="evenodd"
								/>
							</svg>
							<span>{{ selectdDate }}</span>
						</span>
					</Button>
					<Dropdown>
						<template #trigger>
							<Button color="white">
								<span class="leading-none">{{
									(project && project.title) ||
									"Select Project"
								}}</span>
							</Button>
						</template>
						<template #content>
							<div
								v-for="p in projectStore.projects"
								:key="p.id"
								class="cursor-pointer px-4 py-2 hover:bg-slate-100"
								@click="taskData.projectId = p.id"
							>
								{{ p.title }}
							</div>
						</template>
					</Dropdown>
					<input
						class="absolute left-0 top-0 opacity-0 pointer-events-none h-full"
						ref="dueOnDate"
						type="date"
						v-model="taskData.dueDate"
					/>
				</div>
				<Button :disabled="!taskData.title || processing" type="submit">
					<spinner
						v-if="processing"
						color="light"
						size="w-6 h-6"
					></spinner>
					<span v-else>
						{{ props.task && taskData.id ? "Update" : "Add" }}
					</span>
				</Button>
			</div>
		</form>
	</Card>
</template>

<script setup>
import dayjs from "dayjs";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useProjectsStore } from "@/stores/projectsStore";
import { useProjects } from "@/compositions/projects";
import { useRoute } from "vue-router";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
	modelValue: { type: Boolean, required: true },
	projectId: { type: String, default: "" },
	task: { type: Object, required: false },
});

const { addTask: aTask } = useProjects();
const projectStore = useProjectsStore();
const route = useRoute();

const dueOnDate = ref(null);
const processing = ref(false);

const taskData = reactive({
	completed: false,
	content: "",
	currentProjectId: "",
	dueDate: "",
	id: "",
	title: "",
	projectId: "",
});

const project = computed(() => {
	return projectStore.projects.find((p) => p.id === taskData.projectId);
});

const selectdDate = computed(() => {
	if (!taskData.dueDate) {
		return "Due Date";
	}

	return dayjs(taskData.dueDate).format("MMM D, YYYY");
});

const closeCreate = () => {
	emit("update:modelValue", false);
};

const addTask = async () => {
	if (!taskData.title) {
		return;
	}

	processing.value = true;

	await aTask(taskData);

	taskData.completed = false;
	taskData.content = "";
	taskData.currentProjectId = "";
	taskData.dueDate = "";
	taskData.id = "";
	taskData.title = "";
	taskData.projectId = "";

	closeCreate();
	processing.value = false;
};

watch(
	() => route.path,
	() => {
		closeCreate();
	}
);

onMounted(() => {
	if (props.task) {
		taskData.completed = props.task.completed;
		taskData.content = props.task.content;
		taskData.dueDate = props.task.dueDate;
		taskData.id = props.task.id;
		taskData.title = props.task.title;
	}

	taskData.currentProjectId = taskData.projectId =
		props.projectId ||
		projectStore.projects.find((p) => p.title.toLowerCase() === "general")
			.id;
});
</script>
