<template>
	<div class="relative">
		<span class="cursor-pointer inline relative" @click="open = !open">
			<slot name="trigger"></slot>
		</span>

		<transition name="slide-in-up">
			<div
				v-if="open"
				:class="[
					'rounded-md bg-white border border-slate-200 py-2 min-w-[192px] absolute top-12',
					direction === 'left' ? 'left-0' : 'right-0',
					uiStore.sidebarOpen ? 'top-10' : 'top-14',
				]"
			>
				<slot name="content"></slot>
			</div>
		</transition>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { useUiStore } from "../../stores/UiStore";
const uiStore = useUiStore();

const props = defineProps({
	direction: {
		type: String,
		default: "left",
	},
});

const open = ref(false);
</script>
