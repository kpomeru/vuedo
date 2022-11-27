<template>
	<div class="space-y-3">
		<template v-if="!list.length">
			<span class="text-xs text-slate-500"
				>No {{ title }} for this search.</span
			>
			<!-- <span v-if="!list.length">Showing {{ title }} for</span> -->
		</template>

		<div v-for="item in list" :key="item.id">
			<router-link
				:to="{
					name: title === 'projects' ? 'project' : 'task',
					params: {
						id: title === 'projects' ? item.id : item.projectId,
						taskId: item.id,
					},
				}"
			>
				<div class="rounded-md p-4 md:px-6 bg-slate-100 space-y-1">
					<div>
						<span
							:class="[
								{
									'line-through':
										title === 'tasks' && item.completed,
								},
							]"
							>{{ item.title }}</span
						>
					</div>
					<div
						class="flex items-center justify-between text-[10px] leading-none"
					>
						<span v-if="title === 'projects'">
							{{ `Created: ${item.createdAt.date}` }}
						</span>
						<span v-if="title === 'tasks'">
							{{
								`Created: ${daysjs(
									item.createdAt.toDate()
								).format("YYYY-MM-DD")}`
							}}
						</span>
						<span v-if="title === 'tasks'">
							{{ `Due: ${item.dueDate || "N/A"}` }}
						</span>
					</div>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script setup>
import daysjs from "dayjs";
const props = defineProps({
	list: { type: Array, required: true },
	title: { type: String, required: true },
});
</script>
