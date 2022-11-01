<template>
	<span class="text-xs leading-none">
		Are you sure
		<span v-if="showMore" class="">you want to delete this</span>?
		<span class="underline cursor-pointer" @click="$emit('process-delete')"
			>Yes, delete</span
		>,
		<span class="underline cursor-pointer" @click="$emit('cancel')"
			>No</span
		>
	</span>
</template>

<script setup>
defineEmits(["process-delete", "cancel"]);
defineProps({ showMore: { type: Boolean, default: false } });
</script>
