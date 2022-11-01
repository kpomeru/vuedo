<template>
	<div>
		<AddNewProject />
		<Card v-if="loading">
			<spinner :has-padding="true"></spinner>
		</Card>

		<template v-else>
			<div class="flex items-center justify-between space-x-4">
				<h3 v-if="route.name === 'projects'">Projects</h3>
				<ProjectHeading v-else />
			</div>
			<router-view></router-view>
			<transition>
				<Comments v-if="projectStore.viewComments" />
			</transition>
		</template>
	</div>
</template>

<script setup>
import {
	collection,
	onSnapshot,
	query,
	where,
	orderBy,
} from "@firebase/firestore";
import { onMounted, ref, watch } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import { db } from "../../vuedo-firebase";
import { useProjectsStore } from "@/stores/projectsStore";
import { useProjects } from "@/compositions/projects";
import { useDates } from "@/compositions/dates";
import { useAuthStore } from "../../stores/AuthStore";
import router from "../../router";

const authStore = useAuthStore();
const { formatDate } = useDates();
const projects = useProjects();
const projectStore = useProjectsStore();
const route = useRoute();

const loading = ref(true);
const removeProjectsListener = ref(null);

onMounted(() => {
	const projectsRef = collection(db, "projects");
	const q = query(
		projectsRef,
		where("userId", "==", authStore.user.uid),
		orderBy("title"),
		orderBy("createdAt")
	);

	removeProjectsListener.value = onSnapshot(
		q,
		async (snapshots) => {
			if (!snapshots.docs.length) {
				await projects.addProject({ title: "general" });
				return;
			}
			const list = [];
			snapshots.forEach((doc) => {
				list.push({
					id: doc.id,
					comments: [],
					tasks: [],
					...doc.data(),
					createdAt: formatDate(doc.data().createdAt),
				});
			});
			projectStore.projects = list;

			if (projectStore.projects.length && route.name !== "project") {
				router.push({
					name: "project",
					params: {
						id: projectStore.projects.find(
							(p) => p.title.toLowerCase() === "general"
						).id,
					},
				});
			}
		},
		(error) => {
			console.log(error);
		}
	);
	loading.value = false;
});

onBeforeRouteLeave(() => {
	if (removeProjectsListener.value) {
		removeProjectsListener.value();
	}
});
</script>
