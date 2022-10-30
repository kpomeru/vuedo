export interface ButtonInterface {
	disabled?: boolean;
	color?: string;
	size?: string;
}

export const ButtonProps = {
	disabled: {
		type: Boolean,
		default: false,
	},
	color: {
		type: String,
		default: "default",
	},
	size: {
		type: String,
		default: "base",
	},
};
