import _ from "lodash";

export default {
	install(app) {
		const uiComponents = import.meta.globEager("../components/ui/**/*.vue");

		Object.entries(uiComponents).forEach(([path, m]) => {
			const componentName = _.upperFirst(
				_.camelCase(
					path
						.split("/")
						.pop()
						.replace(/\.\w+$/, "")
				)
			);
			app.component(`${componentName}`, m.default);
		});
	},
};
