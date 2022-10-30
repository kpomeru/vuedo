import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import UiComponents from "./plugins/ui";
import { app as firebaseApp } from "./vuedo-firebase";
import "./assets/app.scss";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

firebaseApp;
const app = createApp(App);

app.use(createPinia());
app.use(UiComponents);
app.use(router);
app.use(Toast, {
	containerClassName: "toast-class-override",
	maxToasts: 5,
	newestOnTop: true,
	// position: "top-center",
	// transition: "toast__transition",
	// transition: "Vue-Toastification__fade",
	// transition: {
	// 	enter: "Vue-Toastification__fade-enter-active !duration-300",
	// 	leave: "Vue-Toastification__fade-leave-active duration-300",
	// 	move: "Vue-Toastification__fade-move duration-300",
	// },
});
app.mount("#app");
