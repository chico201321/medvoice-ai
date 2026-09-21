<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg"
  >
    <div class="container mx-auto px-5">
      <div class="flex justify-between items-center py-4">
        <div class="flex items-center">
          <router-link to="/" class="text-2xl font-bold text-blue-600">
            {{ $t("brand") }}
          </router-link>
        </div>

        <div class="hidden md:flex items-center space-x-8">
          <ul class="flex space-x-8">
            <li>
              <a
                href="/#problem"
                class="text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                {{ $t("nav-problem") }}
              </a>
            </li>
            <li>
              <a
                href="/#benefits"
                class="text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                {{ $t("nav-benefits") }}
              </a>
            </li>
            <li>
              <a
                href="/#team"
                class="text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                {{ $t("nav-team") }}
              </a>
            </li>
            <li>
              <a
                href="/#strengths"
                class="text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                {{ $t("nav-strengths") }}
              </a>
            </li>
            <li>
              <a
                href="/#roadmap"
                class="text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                {{ $t("nav-roadmap") }}
              </a>
            </li>
            <li>
              <a
                href="/#solution"
                class="text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                {{ $t("nav-solution") }}
              </a>
            </li>
            <li>
              <router-link
                to="/demo"
                class="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Demo
              </router-link>
            </li>
          </ul>

          <div class="flex bg-slate-100 border border-slate-200 rounded-xl p-1">
            <button
              v-for="lang in languages"
              :key="lang.code"
              @click="switchLanguage(lang.code)"
              :class="[
                'px-3 py-2 rounded-lg transition-all text-xl min-w-10 flex items-center justify-center',
                currentLanguage === lang.code
                  ? 'bg-blue-600 shadow-md transform scale-105'
                  : 'hover:bg-slate-200 transform hover:scale-105',
              ]"
              :title="lang.name"
            >
              {{ lang.flag }}
            </button>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="isMenuOpen = !isMenuOpen"
            class="p-2 rounded-lg hover:bg-slate-100"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="
                  isMenuOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                "
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-show="isMenuOpen" class="md:hidden py-4 border-t border-slate-200">
        <div class="flex flex-col space-y-4">
          <a
            href="/#problem"
            @click="closeMenu"
            class="text-slate-600 hover:text-blue-600 font-medium"
          >
            {{ $t("nav-problem") }}
          </a>
          <a
            href="/#benefits"
            @click="closeMenu"
            class="text-slate-600 hover:text-blue-600 font-medium"
          >
            {{ $t("nav-benefits") }}
          </a>
          <a
            href="/#team"
            @click="closeMenu"
            class="text-slate-600 hover:text-blue-600 font-medium"
          >
            {{ $t("nav-team") }}
          </a>
          <a
            href="/#strengths"
            @click="closeMenu"
            class="text-slate-600 hover:text-blue-600 font-medium"
          >
            {{ $t("nav-strengths") }}
          </a>
          <a
            href="/#roadmap"
            @click="closeMenu"
            class="text-slate-600 hover:text-blue-600 font-medium"
          >
            {{ $t("nav-roadmap") }}
          </a>
          <a
            href="/#solution"
            @click="closeMenu"
            class="text-slate-600 hover:text-blue-600 font-medium"
          >
            {{ $t("nav-solution") }}
          </a>
          <router-link
            to="/demo"
            @click="closeMenu"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-center"
          >
            Demo
          </router-link>

          <div
            class="flex justify-center space-x-2 pt-4 border-t border-slate-200"
          >
            <button
              v-for="lang in languages"
              :key="lang.code"
              @click="switchLanguage(lang.code)"
              :class="[
                'px-3 py-2 rounded-lg transition-all text-xl',
                currentLanguage === lang.code
                  ? 'bg-blue-600'
                  : 'bg-slate-200 hover:bg-slate-300',
              ]"
              :title="lang.name"
            >
              {{ lang.flag }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const currentLanguage = ref("en");
const isMenuOpen = ref(false);

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "uz", name: "O'zbekcha", flag: "🇺🇿" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
];

const switchLanguage = (lang: string) => {
  currentLanguage.value = lang;
  locale.value = lang;
  localStorage.setItem("preferredLanguage", lang);
  closeMenu();
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

// Load saved language preference
const savedLang = localStorage.getItem("preferredLanguage") || "en";
if (savedLang) {
  switchLanguage(savedLang);
}
</script>
