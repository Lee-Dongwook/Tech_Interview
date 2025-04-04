import { I18n } from 'i18n-js'
import { en } from './translations/en'
import { ko } from './translations/ko'

export const LANGUAGES = {
  en: 'English',
  ko: '한국어',
} as const

export type LanguageKey = keyof typeof LANGUAGES

export interface TranslationKeys {
  [key: string]: string | TranslationKeys
}

export function initializeI18n() {
  const i18n = new I18n()

  i18n.translations = {
    ko,
    en,
  }

  const locale = 'ko'

  i18n.enableFallback = true
  i18n.defaultLocale = 'ko'
  i18n.locale = locale

  if (__DEV__) {
    console.log('Current locale:', i18n.locale)
    console.log('Default locale:', i18n.defaultLocale)
  }

  return i18n
}

export interface TranslationOptions {
  userName?: string

  [key: string]: any
}

export type Namespace = 'common' | 'home' | 'profile' | 'settings'
