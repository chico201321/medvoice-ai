import { createI18n } from 'vue-i18n'

// Translation files
import en from './locales/en.json'
import uz from './locales/uz.json'
import ru from './locales/ru.json'

export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    uz,
    ru
  }
})