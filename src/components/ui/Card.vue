<template>
	<div>
		<div
			v-if="hasHeader"
			:class="[
				'block bg-white rounded-t-md border-b border-slate-100',
				padding,
			]"
		></div>
		<div
			:class="[
				'bg-white block',
				padding,
				{ 'rounded-t-md': !hasHeader },
				{ 'rounded-b-md': !hasFooter },
			]"
		>
			<slot></slot>
		</div>
		<div
			v-if="hasFooter"
			:class="[
				'block bg-white rounded-b-md border-t border-slate-100',
				padding,
			]"
		></div>
	</div>
</template>

<script setup>
const props = defineProps({
	hasFooter: { type: Boolean, default: false },
	hasHeader: { type: Boolean, default: false },
});

const padding = "p-6";
</script>
