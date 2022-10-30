<template>
	<div>
		<AddNewProject />
		<Card v-if="loading">
			<spinner :has-padding="true"></spinner>
		</Card>

		<template v-else>
			<h1>Projects</h1>
			<router-view></router-view>
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
import { onBeforeRouteLeave } from "vue-router";
import { db } from "../../vuedo-firebase";
import { useProjectsStore } from "@/stores/projectsStore";
import { useProjects } from "@/compositions/projects";
import { useAuthStore } from "../../stores/AuthStore";

const authStore = useAuthStore();
const projectStore = useProjectsStore();
const loading = ref(true);
let removeProjectsListener;

const projects = useProjects();

onMounted(() => {
	const projectsRef = collection(db, "projects");
	const q = query(
		projectsRef,
		where("userId", "==", authStore.user.uid),
		orderBy("title"),
		orderBy("createdAt")
	);
	// const removeProjectsListener =
	onSnapshot(
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
					...doc.data(),
				});
				projectStore.projects = list;
			});
		},
		(error) => {
			console.log(error);
		}
	);
	loading.value = false;
});

onBeforeRouteLeave(() => {
	if (removeProjectsListener) {
		removeProjectsListener();
	}
});
</script>
