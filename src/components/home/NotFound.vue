<template>
	<div class="space-y-6">
		<div>
			<img src="/images/404.svg" alt="Landing image" class="w-full" />
		</div>
		<div class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
			<router-link
				class="nf-link"
				title="Go to today's tasks page"
				:to="{ name: 'todays-tasks' }"
			>
				Today's Task?
			</router-link>

			<router-link
				class="nf-link"
				title="Go to upcoming tasks page"
				:to="{ name: 'upcoming-tasks' }"
			>
				Upcoming's Task?
			</router-link>

			<router-link
				class="nf-link"
				title="Go to projects page"
				:to="{ name: 'projects' }"
			>
				Projects?
			</router-link>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.nf-link {
	@apply bg-indigo-200 text-indigo-700 hover:bg-indigo-500 hover:text-white px-4 py-2 rounded inline-block text-center;
}
</style>

<script setup></script>
