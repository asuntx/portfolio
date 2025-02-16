import { ui, defaultLang } from "./ui";

type TranslationKey = keyof (typeof ui)[typeof defaultLang];

export function getLangFromURl(url: URL) {
    const [, lang] = url.pathname.split('/');
    if (lang in ui) return lang as keyof typeof ui;
    return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
    return function t(key: TranslationKey) {
        return ui[lang][key] || ui[defaultLang][key];
    };
}