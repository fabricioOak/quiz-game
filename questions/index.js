import en from "./en.js";
import ptBr from "./pt-br.js";
import lol from "./lol.js";

export const questions = {
	en,
	"pt-br": ptBr,
	lol,
};

export const availableLanguages = Object.keys(questions);
