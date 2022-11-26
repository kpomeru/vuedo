<template>
	<div>
		<div
			v-if="hasHeader"
			:class="[
				'block bg-white rounded-t-md border-b border-slate-100',
				padding,
			]"
		>
			<slot name="header"></slot>
		</div>
		<div
			:class="[
				'bg-white block',
				padding,
				{ 'border-x': hasBorder },
				{ 'border-t': hasBorder && !hasHeader },
				{ 'border-b': hasBorder && !hasFooter },
				{ 'h-full': fullBody },
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
		>
			<slot name="footer"></slot>
		</div>
	</div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
	fullBody: { type: Boolean, default: false },
	hasBorder: { type: Boolean, default: false },
	hasFooter: { type: Boolean, default: false },
	hasHeader: { type: Boolean, default: false },
	padding: { type: String, default: "p-6" },
});
</script>
