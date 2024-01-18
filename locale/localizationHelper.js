export default function createLocalizationHelper(defaultTranslations) {
	let currentLanguage;
	const translations = { ...defaultTranslations };

	function setLanguage(language) {
		console.log("language", language);
		if (translations[language]) {
			currentLanguage = language;
		} else {
			console.log("Unsupported language: ", language);
		}
	}

	function setTranslations(newTranslations) {
		Object.assign(translations, newTranslations);
	}

	function localize(key) {
		console.log("key", key);
		const language = currentLanguage;
		const translation = translations[language];

		if (translation && translation[key]) {
			return translation[key];
		} else {
			console.error("Translation not found for key: ", key);
			return key;
		}
	}

	return {
		setLanguage,
		setTranslations,
		localize,
	};
}
