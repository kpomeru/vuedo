<template>
	<div class="flex items-center space-x-2">
		<router-link
			:to="{ name: 'sign-up' }"
			title="Sign up and start organising"
		>
			<Button>
				<span>Get Started</span>
			</Button>
		</router-link>
		<router-link :to="{ name: 'sign-in' }" title="Continue to your tasks">
			<Button>
				<span>Sign In</span>
			</Button>
		</router-link>
	</div>
</template>
