<template>
	<div
		v-if="task"
		class="w-full flex flex-col sm:flex-row items-start justify-between space-y-4 sm:space-y-0 sm:space-x-3"
	>
		<h5 class="flex flex-col space-y-1 items-start">
			<span class="flex items-center space-x-1.5">
				<span>
					<span>Task: </span>
					<span class="text-rose-500">{{ task.title }}</span>
				</span>
				<Badge v-if="project">
					{{ project.title }}
				</Badge>
			</span>
			<span class="flex items-center space-x-1">
				<Badge class="slate" :title="`Created ${date.date}`">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="w-3 h-3"
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

					<span> {{ `${date.date}` }}</span>
				</Badge>

				<template v-if="task.dueDate">
					<Badge :title="`Task due ${task.dueDate}`">
						Due: {{ `${task.dueDate}` }}
					</Badge>
				</template>

				<Badge class="dark" :title="`${task.comments.length} comments`">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="w-3 h-3"
					>
						<path
							fill-rule="evenodd"
							d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902 1.168.188 2.352.327 3.55.414.28.02.521.18.642.413l1.713 3.293a.75.75 0 001.33 0l1.713-3.293a.783.783 0 01.642-.413 41.102 41.102 0 003.55-.414c1.437-.231 2.43-1.49 2.43-2.902V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zM6.75 6a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 2.5a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z"
							clip-rule="evenodd"
						/>
					</svg>

					<span>
						{{ task.comments.length }}
					</span>
				</Badge>
			</span>
		</h5>

		<div class="flex items-center space-x-3 text-xs">
			<span
				class="isButton"
				title="Tasks Comments"
				@click="viewComments = true"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="w-4 h-4"
				>
					<path
						fill-rule="evenodd"
						d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902 1.168.188 2.352.327 3.55.414.28.02.521.18.642.413l1.713 3.293a.75.75 0 001.33 0l1.713-3.293a.783.783 0 01.642-.413 41.102 41.102 0 003.55-.414c1.437-.231 2.43-1.49 2.43-2.902V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zM6.75 6a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 2.5a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z"
						clip-rule="evenodd"
					/>
				</svg>

				<span class="hhidden sm:inline-block">Comments</span>
			</span>

			<Dropdown align-to="right">
				<template #trigger>
					<span class="isButton" title="Delete task">
						<template v-if="deleting">
							<spinner size="w-4 h-4"></spinner>
						</template>

						<template v-else>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="w-4 h-4"
							>
								<path
									fill-rule="evenodd"
									d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
									clip-rule="evenodd"
								/>
							</svg>
							<span class="hhidden sm:inline-block">Delete</span>
						</template>
					</span>
				</template>

				<template #content>
					<div class="px-4 text-center text-xs">
						Are you sure you want to delete this task?
						<span
							class="underline cursor-pointer font-medium"
							@click="deleteTask"
							>Yes, delete.</span
						>
					</div>
				</template>
			</Dropdown>

			<span
				class="isButton"
				title="Back to project."
				@click="router.go(-1)"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="w-5 h-5"
				>
					<path
						fill-rule="evenodd"
						d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
						clip-rule="evenodd"
					/>
				</svg>

				<span>Back</span>
			</span>
		</div>
	</div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useProjectsStore } from "@/stores/ProjectsStore";
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useProjects } from "@/compositions/projects";
import { useDates } from "@/compositions/dates";
const { formatDate } = useDates();

const { deleteTask: dTask } = useProjects();
const projectsStore = useProjectsStore();
const { viewComments } = storeToRefs(projectsStore);

const route = useRoute();
const router = useRouter();

const task = computed(() =>
	projectsStore.tasks.find((t) => t.id === route.params.taskId)
);

const project = computed(() =>
	projectsStore.projects.find((p) => p.id === task.value.projectId)
);

const date = computed(() => formatDate(task.value.createdAt));

const deleting = ref(false);
const deleteTask = async () => {
	deleting.value = true;
	await dTask(project.value, task.value.id);
	deleting.value = false;
};
</script>

<style lang="scss" scoped>
.isButton {
	@apply cursor-pointer hover:bg-slate-100 p-0.5 rounded-md flex items-center justify-center space-x-1.5 text-slate-500;
}
</style>
