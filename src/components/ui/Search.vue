<template>
	<teleport to="body">
		<div
			v-if="search"
			class="fixed inset-0 z-[60] flex justify-center bg-white/90 backdrop-blur-sm p-6 md:pt-12 xl:pt-24"
			@keyup.esc="search = false"
		>
			<div class="relative w-full sm:w-2/3 md:w-2/5 z-10">
				<Card border-color="border-slate-200" has-border has-header>
					<template #header>
						<div class="space-y-3">
							<div
								class="flex items-center justify-between space-x-4"
							>
								<h6>Search Projects/Tasks</h6>
								<span
									class="cursor-pointer"
									@click="search = false"
								>
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
								@submit.prevent
							>
								<TextInput
									autofocus
									placeholder="Search"
									v-model:value="searchData"
								/>
							</form>
						</div>
					</template>

					<template v-if="!searchData">
						<div class="">
							<span class="text-slate-500 text-xs"
								>Please enter a text to search for.</span
							>
						</div>
					</template>

					<template v-else>
						<div class="space-y-4 max-h-96 overflow-y-auto">
							<div
								class="flex p-1 rounded-full bg-slate-100 items-center"
							>
								<span
									v-for="t in tabOptions"
									:key="t.id"
									:class="[
										'font-medium py-2 px-4 w-full flex items-center justify-center capitalize cursor-pointer rounded-full',
										{ 'bg-rose-500 text-white': t === tab },
									]"
									@click="tab = t"
								>
									<span>{{ t }}</span>
									<span
										class="text-xs"
										v-if="t === 'projects'"
										>({{ projectsList.length }})</span
									>
									<span class="text-xs" v-if="t === 'tasks'"
										>({{ tasksList.length }})</span
									>
								</span>
							</div>

							<template v-if="tab === 'projects'">
								<SearchResults
									:list="projectsList"
									title="projects"
								/>
							</template>
							<template v-if="tab === 'tasks'">
								<SearchResults
									:list="tasksList"
									title="tasks"
								/>
							</template>
						</div>
					</template>
				</Card>
			</div>
		</div>
	</teleport>
</template>

<script setup>
import _ from "lodash";
import dayjs from "dayjs";
import { useProjectsStore } from "@/stores/ProjectsStore";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const projectsStore = useProjectsStore();
const { search, projects, tasks } = storeToRefs(projectsStore);
const route = useRoute();
const searchData = ref("");

const tabOptions = ["projects", "tasks"];
const tab = ref("projects");

const projectsList = computed(() => {
	return projects.value.filter((i) => check(i, "project"));
});

const tasksList = computed(() => {
	return tasks.value.filter((i) => check(i, "task"));
});

const check = (item, type = "task") => {
	const cAt = dayjs(
		type === "task" ? item.createdAt.toDate() : item.createdAt.date
	).format("YYYY-MM-DD");
	const c1 = item.title
		.toLowerCase()
		.includes(searchData.value.toLowerCase());
	const c2 = cAt.includes(searchData.value);
	const c3 =
		type === "task" ? item.dueDate.includes(searchData.value) : false;
	return c1 || c2 || c3;
};

watch(
	() => route.path,
	() => (search.value = false)
);

onMounted(() => {
	//
});
</script>
