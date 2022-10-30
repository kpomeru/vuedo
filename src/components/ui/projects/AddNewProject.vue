<template>
	<teleport to="body">
		<div
			v-if="addNewProject"
			class="fixed inset-0 z-[60] flex justify-center bg-white"
		>
			<div class="relative w-full sm:w-2/3 md:w-1/4 z-10 p-6 space-y-3">
				<div class="flex items-center justify-between space-x-4">
					<h5>Add Project</h5>
					<span class="cursor-pointer" @click="addNewProject = false">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							class="w-5 h-5"
						>
							<path
								fill-rule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
								clip-rule="evenodd"
							/>
						</svg>
					</span>
				</div>
				<form
					class="flex items-center space-x-2"
					@submit.prevent="addProject"
				>
					<TextInput v-model:value="projectData.title" />
					<Button
						:disabled="!projectData.title || processing"
						type="submit"
					>
						<spinner
							v-if="processing"
							color="light"
							size="w-6 h-6"
						></spinner>
						<span v-else>Add</span>
					</Button>
				</form>
			</div>
		</div>
	</teleport>
</template>

<script setup>
import _ from "lodash";
import { useProjects } from "@/compositions/projects";
import { useProjectsStore } from "@/stores/ProjectsStore";
import { storeToRefs } from "pinia";
import { reactive, ref, watch } from "vue";
import { useToast } from "vue-toastification";

const projectsStore = useProjectsStore();
const { addProject: aProject } = useProjects();
const { addNewProject, projects } = storeToRefs(projectsStore);

const processing = ref(false);
const projectData = reactive({
	title: "",
});
const toast = useToast();

const checkProjectsLimit = () => {
	if (projectsStore.projects.length === 5) {
		addNewProject.value = false;
		toast.error("You can only have 5 active projects on your account.");
		return true;
	}
	return false;
};

watch(
	() => addNewProject.value,
	(value) => {
		if (value) {
			checkProjectsLimit();
		}
	}
	// { immediate: true }
);

const addProject = async () => {
	if (checkProjectsLimit()) {
		return;
	}

	if (
		projectsStore.projects
			.map((i) => i.title.toLowerCase())
			.includes(projectData.title.toLowerCase())
	) {
		toast.error(
			`${_.startCase(projectData.title)} project already exists.`
		);
		return;
	}
	processing.value = true;
	await aProject({ title: projectData.title });
	projectData.title = "";
	processing.value = false;
	addNewProject.value = false;
};
</script>
