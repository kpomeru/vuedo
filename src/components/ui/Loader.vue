<template>
	<div
		:class="{
			'fixed inset-0 z-[60] bg-white flex items-center justify-center':
				block,
		}"
	>
		<div class="relative flex items-center justify-center w-24 h-24">
			<span
				class="absolute inset-6 border-2 border-violet-500 rounded-full animate-ping"
			></span>
			<img
				src="/images/vd-logomark-transparent.svg"
				class="absolute w-[40%] animate-pulse z-10"
				alt=""
			/>
			<!-- <Spinner color="brand" size="w-24 h-24"> </Spinner> -->
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps({
	block: { type: Boolean, default: true },
	hasPadding: { type: Boolean, default: true },
});
</script>
