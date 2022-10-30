<template>
	<span
		class="rounded-full p-1 py-0.5 text-xs items-center flex justify-center badge"
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
		@apply text-rose-500 bg-black;
	}
}
</style>

<script setup></script>
