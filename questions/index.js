import en from "./en.js";
import ptBr from "./pt-br.js";

export const questions = {
	en,
	"pt-br": ptBr,
};

export const availableLanguages = Object.keys(questions);
