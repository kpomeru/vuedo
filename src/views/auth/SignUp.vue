<template>
	<img
		src="/images/vuedo-tasks-graphic.svg"
		class="w-40 absolute -left-16"
		alt=""
	/>
	<img
		src="/images/figma-tasks-graphic.svg"
		class="w-40 absolute -right-16 -bottom-8"
		alt=""
	/>
	<div class="max-w-lg w-full mx-auto pt-6 md:pt-12 lg:pt-16 relative">
		<Card>
			<form
				@submit.prevent="processSignUp"
				class="space-y-6 p-2 sm:p-4 md:p-6"
			>
				<h1 class="text-center">
					Let us get you <span class="text-rose-500">started</span>
				</h1>

				<div class="space-y-2">
					<FormLabel for="username"> Username </FormLabel>
					<TextInput
						id="username"
						required
						placeholder="Enter username"
						v-model:value="signUpData.username"
					/>
				</div>

				<div class="space-y-2">
					<FormLabel for="email"> Email </FormLabel>
					<TextInput
						id="email"
						required
						type="email"
						placeholder="Enter email address"
						v-model:value="signUpData.email"
					/>
				</div>

				<div class="space-y-2">
					<FormLabel for="password"> Password </FormLabel>
					<InputGroup>
						<TextInput
							icon="right"
							id="password"
							:type="passwordVisibility ? 'text' : 'password'"
							placeholder="Enter password"
							v-model:value="signUpData.password"
						/>
						<InputIcon
							class="text-slate-400 cursor-pointer"
							position="right"
							@click="passwordVisibility = !passwordVisibility"
						>
							<svg
								v-if="!passwordVisibility"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="w-4 h-4"
							>
								<path
									fill-rule="evenodd"
									d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z"
									clip-rule="evenodd"
								/>
								<path
									d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z"
								/>
							</svg>
							<svg
								v-else
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="w-4 h-4"
							>
								<path
									d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
								/>
								<path
									fill-rule="evenodd"
									d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
									clip-rule="evenodd"
								/>
							</svg>
						</InputIcon>
					</InputGroup>
				</div>

				<Button
					class="w-full"
					:disabled="
						processing ||
						!signUpData.email ||
						!signUpData.password ||
						!signUpData.username
					"
					type="submit"
				>
					<spinner
						v-if="processing"
						color="light"
						size="w-6 h-6"
					></spinner>
					<span v-else>Sign Up</span>
				</Button>

				<ContinueWithGoogle :disabled="processing" />

				<div class="flex items-center justify-between text-xs">
					<router-link
						:to="{ name: 'sign-in' }"
						class="underline sm:no-underline hover:underline hover:text-rose-500"
					>
						<span>Have an account? Sign In</span>
					</router-link>

					<router-link
						to="/"
						class="underline sm:no-underline hover:underline hover:text-rose-500"
					>
						<span>Go to Homepage</span>
					</router-link>
				</div>
			</form>
		</Card>
	</div>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { useToast } from "vue-toastification";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import ContinueWithGoogle from "@/components/auth/ContinueWithGoogle.vue";
import { useRouter } from "vue-router";
import { useUiStore } from "@/stores/UiStore";
import { auth } from "@/vuedo-firebase";

const router = useRouter();
const toast = useToast();
const uiStore = useUiStore();

const signUpData = reactive({
	email: "",
	password: "",
	username: "",
});

const passwordVisibility = ref(false);
const processing = ref(false);

const processSignUp = async () => {
	toast.clear();
	processing.value = true;

	try {
		await createUserWithEmailAndPassword(
			auth,
			signUpData.email,
			signUpData.password
		);
		uiStore.pageLoading = true;
		const user = auth.currentUser;
		await updateProfile(user, {
			displayName: signUpData.username,
		});
		// toast.success("Sign up with email and password successful.");
		router.push({ name: "home" });
		uiStore.pageLoading = false;
	} catch (error) {
		// console.log(error.code)
		if (error.code === "auth/email-already-in-use") {
			toast.error("Email already exists.");
		}
		if (error.code === "auth/weak-password") {
			toast.error("Your password is weak.");
		}
	}
	processing.value = false;
};
</script>
