<template>
	<span
		class="rounded-full p-1 px-1.5 min-w-[20px] text-[10px] leading-none items-center flex justify-center badge max-w-max space-x-1"
	>
		<slot></slot>
	</span>
</template>

<style lang="scss" scoped>
.badge {
	@apply bg-rose-500 text-white;
	&.light {
		@apply text-rose-500 bg-white;
	}
	&.dark {
		@apply text-white bg-black;
	}
	&.slate {
		@apply text-slate-600 bg-slate-300;
	}
}
</style>

<script setup></script>
