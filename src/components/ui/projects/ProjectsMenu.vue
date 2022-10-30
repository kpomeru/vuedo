<template>
	<div class="divide-y">
		<div class="py-2 space-y-3">
			<div class="flex items-center justify-between">
				<h6>Projects</h6>
				<span
					v-if="projectsStore.projects.length < 5"
					:class="['cursor-pointer']"
					@click="
						projectsStore.addNewProject =
							!projectsStore.addNewProject
					"
					title="Add a new project"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="w-5 h-5"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
							clip-rule="evenodd"
						/>
					</svg>
				</span>
			</div>
		</div>

		<div
			v-for="p in projectsStore.projects"
			:key="p.id"
			:class="[
				'py-2 hover:text-rose-500 cursor-pointer flex items-center justify-between',
				{ ' text-rose-500 font-medium': route.params.id === p.id },
			]"
			:title="p.title"
			@click="goToProject(p.id)"
		>
			<span class="capitalize">
				{{ p.title }}
			</span>
			<Badge>
				{{ (p.tasks && p.tasks.length) || 0 }}
			</Badge>
		</div>
	</div>
</template>

<script setup>
import { useProjectsStore } from "@/stores/projectsStore";
import { useRoute, useRouter } from "vue-router";
const projectsStore = useProjectsStore();
const route = useRoute();
const router = useRouter();
const goToProject = (id) => {
	router.push({ name: "project", params: { id: id } });
};
</script>
