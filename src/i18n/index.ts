import type { APIContext } from 'astro';
import es from './es';
import en from './en';

const dictionaries = { es, en } as const;

export type Locale = keyof typeof dictionaries;
export type TranslationKeys = typeof es;

/**
 * Get the translation dictionary for a given locale.
 * Falls back to Spanish if the locale is not available.
 */
export function getTranslations(locale: string): TranslationKeys {
  const l = locale as Locale;
  return dictionaries[l] ?? es;
}

/**
 * Get the current locale from Astro context.
 * Astro i18n makes `Astro.currentLocale` available automatically.
 */
export function getLocale(context: APIContext): string {
  return context.currentLocale ?? 'es';
}

/**
 * URL helpers for internal links that respect locale prefix.
 */
export function localizePath(path: string, locale: string): string {
  if (locale === 'es') return path;
  return `/${locale}${path}`;
}
