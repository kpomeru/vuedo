<template>
	<div
		class="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-4"
	>
		<div class="md:hidden w-full px-8 border-b pt-8">
			<img
				src="/images/landing-image-split-top@2x.png"
				alt="Landing image"
				class="w-full"
			/>
		</div>
		<div class="w-full space-y-4 text-center md:text-left py-8 md:py-0">
			<h1>
				Accomplish <br />
				Something <br />
				<span class="text-rose-500">Everyday</span>
			</h1>

			<h2>
				<s>Check</s> individual <br class="hidden md:inline-block" />
				or group tasks <br class="hidden md:inline-block" />
				off your lists.
			</h2>
			<SignInButton class="hidden md:flex" />
		</div>
		<div class="w-full hidden md:block">
			<img
				src="/images/landing-image@2x.png"
				alt="Landing image"
				class="w-2/3 md:w-full"
			/>
		</div>
		<SignInButton class="md:hidden" />
	</div>
</template>

<script setup>
import SignInButton from "./SignInButton.vue";
</script>
