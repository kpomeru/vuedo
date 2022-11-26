import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Index.vue";
import { auth } from "../vuedo-firebase";
import { useAuthStore } from "../stores/authStore";

import { onAuthStateChanged } from "firebase/auth";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
			meta: {
				pageTitle: "VueDo",
				isGuest: true,
			},
		},
		{
			path: "/auth",
			meta: {
				isGuest: true,
			},
			children: [
				{
					path: "sign-in",
					name: "sign-in",
					component: () => import("../views/auth/SignIn.vue"),
					meta: {
						pageTitle: "Sign - In",
						isGuest: true,
					},
				},
				{
					path: "sign-up",
					name: "sign-up",
					component: () => import("../views/auth/SignUp.vue"),
					meta: {
						pageTitle: "Sign - Up",
						isGuest: true,
					},
				},
			],
		},
		{
			path: "/projects",
			name: "projects",
			component: () => import("../views/projects/Index.vue"),
			meta: {
				pageTitle: "Projects",
				requiresAuth: true,
			},
			children: [
				{
					path: ":id",
					name: "project",
					component: () =>
						import("../views/projects/ProjectView.vue"),
					children: [
						{
							path: ":taskId",
							name: "task",
							component: () =>
								import("../views/projects/TaskView.vue"),
							meta: {
								pageTitle: "Task",
								requiresAuth: true,
							},
						},
					],
					meta: {
						pageTitle: "Project",
						requiresAuth: true,
					},
				},
			],
		},
		{
			path: "/todays-tasks",
			name: "todays-tasks",
			component: () => import("../views/TodaysTasks.vue"),
			meta: {
				pageTitle: "Todays - Tasks",
				requiresAuth: true,
			},
		},
		{
			path: "/upcoming-tasks",
			name: "upcoming-tasks",
			component: () => import("../views/UpcomingTasks.vue"),
			meta: {
				pageTitle: "Upcoming - Tasks",
				requiresAuth: true,
			},
		},
	],
});

// const getCurrentUser = () => {
// 	return new Promise((resolve, reject) => {
// 		const removeListener = onAuthStateChanged(
// 			auth,
// 			(user) => {
// 				removeListener();
// 				resolve(user);
// 			},
// 			reject
// 		);
// 	});
// };

router.beforeEach(async (to, from, next) => {
	const authStore = useAuthStore();
	const user = authStore.user;
	if (to.matched.some((r) => r.meta.isGuest) && user) {
		next("/projects");
		return;
	} else if (to.matched.some((r) => r.meta.requiresAuth) && !user) {
		next("/auth/sign-in");
		return;
	}

	const suffix = to.name !== "home" ? " | Vuedo" : "";
	document.title = `${to.meta.pageTitle}${suffix}`;
	next();
});

export default router;
