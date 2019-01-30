export function validationRules (name, value) {
	const rule = {
		title: !!value.trim() && value.length > 6,
		body: !!value.trim() && value.length > 6
	}

	return rule[name]
}

export function isValid (form) {
	return Object.keys(form).every(function (key) {
		return form[key]
	});
}
