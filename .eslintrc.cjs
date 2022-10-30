/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
	//
	root: true,
	// eslint-disable-next-line prettier/prettier
	extends: [
		"plugin:vue/vue3-essential",
		"eslint:recommended",
		"@vue/eslint-config-prettier",
	],
	parserOptions: {
		ecmaVersion: "latest",
	},
	indent: ["error", 4],
	rules: {
		"prettier/prettier": [
			"error",
			{
				tabWidth: 4,
				useTabs: true,
			},
		],
	},
};
