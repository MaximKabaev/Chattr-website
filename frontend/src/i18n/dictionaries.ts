import type { Locale } from "./config";
import { defaultLocale } from "./config";
import ru from "./messages/ru.json";
import en from "./messages/en.json";

export type Dictionary = typeof ru;

const dictionaries: Record<Locale, Dictionary> = {
  ru,
  en: en as Dictionary,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
