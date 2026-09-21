<template>
  <div class="home">
    <!-- Hero Section -->
    <section
      class="relative min-h-screen bg-linear-to-br from-blue-600 via-purple-600 to-purple-800 text-white overflow-hidden"
    >
      <div class="absolute inset-0 bg-black/20"></div>
      <div
        class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32"
      >
        <div class="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div class="space-y-6 md:space-y-8 text-center lg:text-left">
            <h1
              class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight bg-linear-to-r from-white to-blue-100 bg-clip-text text-transparent"
            >
              {{ $t("brand") }}
            </h1>
            <p class="text-lg sm:text-xl lg:text-2xl font-medium text-blue-100">
              {{ $t("hero-subtitle") }}
            </p>
            <p
              class="text-base sm:text-lg lg:text-xl text-blue-50 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              {{ $t("hero-description") }}
            </p>
            <div
              class="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4 justify-center lg:justify-start"
            >
              <a
                href="#problem"
                @click="smoothScrollTo($event, 'problem')"
                class="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300"
              >
                {{ $t("hero-btn-learn") }}
              </a>
              <router-link
                to="/demo"
                class="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 hover:-translate-y-1 transition-all duration-300"
              >
                Try Demo
              </router-link>
            </div>
          </div>
          <div
            class="flex justify-center items-center order-first lg:order-last"
          >
            <div
              class="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center justify-items-center"
            >
              <i
                class="fas fa-stethoscope text-4xl sm:text-5xl md:text-6xl lg:text-7xl opacity-80 animate-pulse"
                style="animation-delay: 0s"
              ></i>
              <i
                class="fas fa-microphone text-4xl sm:text-5xl md:text-6xl lg:text-7xl opacity-80 animate-pulse"
                style="animation-delay: 0.5s"
              ></i>
              <i
                class="fas fa-brain text-5xl sm:text-6xl md:text-7xl lg:text-8xl opacity-80 animate-pulse col-span-2"
                style="animation-delay: 1s"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Problem & Solution Section -->
    <section id="problem" class="py-12 sm:py-16 md:py-20 bg-slate-50">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-12 sm:mb-16">
          <h2
            class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4"
          >
            {{ $t("section-problem-title") }}
          </h2>
          <p
            class="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto px-4"
          >
            {{ $t("section-problem-desc") }}
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div
            class="bg-white rounded-2xl p-8 shadow-xl border border-slate-200"
          >
            <div class="flex items-center gap-4 mb-6">
              <div
                class="flex items-center justify-center w-16 h-16 bg-red-50 text-red-600 rounded-xl"
              >
                <i class="fas fa-exclamation-triangle text-2xl"></i>
              </div>
              <h3 class="text-2xl font-bold text-slate-900">
                {{ $t("problem-title") }}
              </h3>
            </div>
            <div class="space-y-6">
              <div class="border-b border-slate-100 pb-6">
                <h4
                  class="flex items-center gap-2 text-lg font-semibold text-slate-900 mb-2"
                >
                  <i class="fas fa-clock text-red-600"></i>
                  {{ $t("problem-admin-title") }}
                </h4>
                <p class="text-slate-600">{{ $t("problem-admin-desc") }}</p>
              </div>
              <div class="border-b border-slate-100 pb-6">
                <h4
                  class="flex items-center gap-2 text-lg font-semibold text-slate-900 mb-2"
                >
                  <i class="fas fa-exclamation-circle text-red-600"></i>
                  {{ $t("problem-diagnostic-title") }}
                </h4>
                <p class="text-slate-600">
                  {{ $t("problem-diagnostic-desc") }}
                </p>
              </div>
              <div>
                <h4
                  class="flex items-center gap-2 text-lg font-semibold text-slate-900 mb-2"
                >
                  <i class="fas fa-pills text-red-600"></i>
                  {{ $t("problem-medicine-title") }}
                </h4>
                <p class="text-slate-600">{{ $t("problem-medicine-desc") }}</p>
              </div>
            </div>
          </div>

          <div
            class="bg-white rounded-2xl p-8 shadow-xl border border-slate-200"
          >
            <div class="mb-6">
              <span
                class="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4"
                >{{ $t("domain-tag") }}</span
              >
              <h3 class="text-2xl font-bold text-slate-900 mb-2">
                {{ $t("solution-title") }}
              </h3>
              <p class="text-lg text-slate-600">
                {{ $t("solution-subtitle") }}
              </p>
            </div>
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <i class="fas fa-microphone-alt text-green-600 w-5"></i>
                <span class="text-slate-700 font-medium">{{
                  $t("solution-feature-1")
                }}</span>
              </div>
              <div class="flex items-center gap-3">
                <i class="fas fa-brain text-green-600 w-5"></i>
                <span class="text-slate-700 font-medium">{{
                  $t("solution-feature-2")
                }}</span>
              </div>
              <div class="flex items-center gap-3">
                <i class="fas fa-user-md text-green-600 w-5"></i>
                <span class="text-slate-700 font-medium">{{
                  $t("solution-feature-3")
                }}</span>
              </div>
              <div class="flex items-center gap-3">
                <i class="fas fa-shield-alt text-green-600 w-5"></i>
                <span class="text-slate-700 font-medium">{{
                  $t("solution-feature-4")
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Impact Metrics Section -->
    <section class="py-12 sm:py-16 md:py-20 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          <div class="text-center">
            <div
              class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-green-600 mb-3 md:mb-4"
              ref="metric1"
            >
              {{ animatedMetric1 }}%
            </div>
            <h3 class="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
              {{ $t("metric-doc-reduction") }}
            </h3>
            <p class="text-sm sm:text-base text-slate-600">
              Сокращение времени документооборота
            </p>
          </div>

          <div class="text-center">
            <div
              class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-green-600 mb-3 md:mb-4"
              ref="metric2"
            >
              {{ animatedMetric2 }}%
            </div>
            <h3 class="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
              {{ $t("metric-diagnostic-improvement") }}
            </h3>
            <p class="text-sm sm:text-base text-slate-600">
              Повышение точности диагностики
            </p>
          </div>

          <div class="text-center">
            <div
              class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-green-600 mb-3 md:mb-4"
              ref="metric3"
            >
              {{ animatedMetric3 }}%
            </div>
            <h3 class="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
              {{ $t("metric-prescription-transparency") }}
            </h3>
            <p class="text-sm sm:text-base text-slate-600">
              Прозрачность лекарственных назначений
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section
      id="benefits"
      class="py-12 sm:py-16 md:py-20 bg-linear-to-br from-slate-50 to-blue-50"
    >
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {{ $t("benefits-title") }}
          </h2>
          <p class="text-xl text-slate-600 max-w-3xl mx-auto">
            {{ $t("benefits-desc") }}
          </p>
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          <div
            class="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:-translate-y-2 transition-transform duration-300"
          >
            <div
              class="flex items-center gap-3 mb-4 pb-4 border-b-2 border-blue-100"
            >
              <div
                class="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-xl"
              >
                <i class="fas fa-user-md text-xl"></i>
              </div>
              <h3 class="text-lg font-bold text-slate-900">
                {{ $t("benefits-doctors-title") }}
              </h3>
            </div>
            <ul class="space-y-2">
              <li class="flex items-start gap-2 text-sm text-slate-700">
                <span class="text-green-600 font-bold">✔️</span>
                <span>{{ $t("benefits-doctors-workload") }}</span>
              </li>
              <li class="flex items-start gap-2 text-sm text-slate-700">
                <span class="text-green-600 font-bold">✔️</span>
                <span>{{ $t("benefits-doctors-mistakes") }}</span>
              </li>
              <li class="flex items-start gap-2 text-sm text-slate-700">
                <span class="text-green-600 font-bold">✔️</span>
                <span>{{ $t("benefits-doctors-processing") }}</span>
              </li>
              <li class="flex items-start gap-2 text-sm text-slate-700">
                <span class="text-green-600 font-bold">✔️</span>
                <span>{{ $t("benefits-doctors-notes") }}</span>
              </li>
              <li class="flex items-start gap-2 text-sm text-slate-700">
                <span class="text-green-600 font-bold">✔️</span>
                <span>{{ $t("benefits-doctors-selection") }}</span>
              </li>
            </ul>
          </div>

          <div
            class="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:-translate-y-2 transition-transform duration-300"
          >
            <div
              class="flex items-center gap-3 mb-4 pb-4 border-b-2 border-green-100"
            >
              <div
                class="flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-xl"
              >
                <i class="fas fa-hospital text-xl"></i>
              </div>
              <h3 class="text-lg font-bold text-slate-900">
                {{ $t("benefits-hospitals-title") }}
              </h3>
            </div>
            <ul class="space-y-2">
              <li class="flex items-start gap-2 text-sm text-slate-700">
                <span class="text-green-600 font-bold">✔️</span>
                <span>{{ $t("benefits-hospitals-transparency") }}</span>
              </li>
              <li class="flex items-start gap-2 text-sm text-slate-700">
                <span class="text-green-600 font-bold">✔️</span>
                <span>{{ $t("benefits-hospitals-control") }}</span>
              </li>
              <li class="flex items-start gap-2 text-sm text-slate-700">
                <span class="text-green-600 font-bold">✔️</span>
                <span>{{ $t("benefits-hospitals-costs") }}</span>
              </li>
              <li class="flex items-start gap-2 text-sm text-slate-700">
                <span class="text-green-600 font-bold">✔️</span>
                <span>{{ $t("benefits-hospitals-efficiency") }}</span>
              </li>
              <li class="flex items-start gap-2 text-sm text-slate-700">
                <span class="text-green-600 font-bold">✔️</span>
                <span>{{ $t("benefits-hospitals-outcomes") }}</span>
              </li>
            </ul>
          </div>

          <div
            class="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:-translate-y-2 transition-transform duration-300"
          >
            <div
              class="flex items-center gap-3 mb-4 pb-4 border-b-2 border-purple-100"
            >
              <div
                class="flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-xl"
              >
                <i class="fas fa-landmark text-xl"></i>
              </div>
              <h3 class="text-lg font-bold text-slate-900">
                {{ $t("benefits-government-title") }}
              </h3>
            </div>
            <ul class="space-y-2">
              <li class="flex items-start gap-2 text-sm text-slate-700">
                <span class="text-green-600 font-bold">✔️</span>
                <span>{{ $t("benefits-government-fraud") }}</span>
              </li>
              <li class="flex items-start gap-2 text-sm text-slate-700">
                <span class="text-green-600 font-bold">✔️</span>
                <span>{{ $t("benefits-government-statistics") }}</span>
              </li>
              <li class="flex items-start gap-2 text-sm text-slate-700">
                <span class="text-green-600 font-bold">✔️</span>
                <span>{{ $t("benefits-government-planning") }}</span>
              </li>
              <li class="flex items-start gap-2 text-sm text-slate-700">
                <span class="text-green-600 font-bold">✔️</span>
                <span>{{ $t("benefits-government-prevention") }}</span>
              </li>
            </ul>
          </div>

          <div
            class="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:-translate-y-2 transition-transform duration-300"
          >
            <div
              class="flex items-center gap-3 mb-4 pb-4 border-b-2 border-red-100"
            >
              <div
                class="flex items-center justify-center w-12 h-12 bg-red-100 text-red-600 rounded-xl"
              >
                <i class="fas fa-heartbeat text-xl"></i>
              </div>
              <h3 class="text-lg font-bold text-slate-900">
                {{ $t("benefits-patients-title") }}
              </h3>
            </div>
            <ul class="space-y-2">
              <li class="flex items-start gap-2 text-sm text-slate-700">
                <span class="text-green-600 font-bold">✔️</span>
                <span>{{ $t("benefits-patients-quality") }}</span>
              </li>
              <li class="flex items-start gap-2 text-sm text-slate-700">
                <span class="text-green-600 font-bold">✔️</span>
                <span>{{ $t("benefits-patients-service") }}</span>
              </li>
              <li class="flex items-start gap-2 text-sm text-slate-700">
                <span class="text-green-600 font-bold">✔️</span>
                <span>{{ $t("benefits-patients-consistency") }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section id="team" class="py-12 sm:py-16 md:py-20 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-12 sm:mb-16">
          <h2
            class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4"
          >
            {{ $t("team-title") }}
          </h2>
          <p
            class="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto px-4"
          >
            {{ $t("team-desc") }}
          </p>
        </div>
        <div class="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <div
            v-for="member in teamMembers"
            :key="member.name"
            class="bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-slate-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div
              class="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6"
            >
              <div class="shrink-0">
                <div
                  class="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] lg:w-[300px] lg:h-[300px] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  <img
                    :src="member.image"
                    :alt="member.fullName"
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div class="flex-1 min-w-0 text-center sm:text-left">
                <h3 class="text-lg sm:text-xl font-bold text-slate-900 mb-1">
                  {{ member.fullName }}
                </h3>
                <p class="text-blue-600 font-semibold mb-3">
                  {{ member.role }}
                </p>
              </div>
            </div>

            <div class="space-y-4 text-center sm:text-left">
              <div>
                <div
                  class="flex flex-wrap justify-center sm:justify-start gap-2 mb-3"
                >
                  <span
                    v-for="skill in member.skills"
                    :key="skill"
                    class="px-2 py-1 sm:px-3 sm:py-1 bg-blue-100 text-blue-700 text-xs sm:text-sm font-medium rounded-full"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>

              <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
                {{ member.description }}
              </p>

              <div class="flex justify-center sm:justify-start gap-2 pt-2">
                <a
                  v-for="link in member.links"
                  :key="link.type"
                  :href="link.url"
                  :title="link.type"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600 rounded-lg transition-all duration-200 hover:scale-110"
                >
                  <i :class="link.icon" class="text-sm sm:text-base"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Strengths Section -->
    <section
      id="strengths"
      class="py-12 sm:py-16 md:py-20 bg-slate-900 text-white"
    >
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold mb-4">
            {{ $t("strengths-title") }}
          </h2>
          <p class="text-xl text-slate-300 max-w-3xl mx-auto">
            {{ $t("strengths-desc") }}
          </p>
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <div
            class="bg-slate-800 rounded-2xl p-6 hover:bg-slate-700 transition-colors duration-300"
          >
            <div
              class="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4"
            >
              <i class="fas fa-hospital text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold mb-3">
              {{ $t("strength-healthcare-title") }}
            </h3>
            <p class="text-slate-300">{{ $t("strength-healthcare-desc") }}</p>
          </div>

          <div
            class="bg-slate-800 rounded-2xl p-6 hover:bg-slate-700 transition-colors duration-300"
          >
            <div
              class="flex items-center justify-center w-16 h-16 bg-green-600 rounded-xl mb-4"
            >
              <i class="fas fa-robot text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold mb-3">
              {{ $t("strength-ai-title") }}
            </h3>
            <p class="text-slate-300">{{ $t("strength-ai-desc") }}</p>
          </div>

          <div
            class="bg-slate-800 rounded-2xl p-6 hover:bg-slate-700 transition-colors duration-300"
          >
            <div
              class="flex items-center justify-center w-16 h-16 bg-red-600 rounded-xl mb-4"
            >
              <i class="fas fa-shield-alt text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold mb-3">
              {{ $t("strength-security-title") }}
            </h3>
            <p class="text-slate-300">{{ $t("strength-security-desc") }}</p>
          </div>

          <div
            class="bg-slate-800 rounded-2xl p-6 hover:bg-slate-700 transition-colors duration-300"
          >
            <div
              class="flex items-center justify-center w-16 h-16 bg-purple-600 rounded-xl mb-4"
            >
              <i class="fas fa-users text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold mb-3">
              {{ $t("strength-design-title") }}
            </h3>
            <p class="text-slate-300">{{ $t("strength-design-desc") }}</p>
          </div>

          <div
            class="bg-slate-800 rounded-2xl p-6 hover:bg-slate-700 transition-colors duration-300"
          >
            <div
              class="flex items-center justify-center w-16 h-16 bg-yellow-600 rounded-xl mb-4"
            >
              <i class="fas fa-chart-line text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold mb-3">
              {{ $t("strength-scalable-title") }}
            </h3>
            <p class="text-slate-300">{{ $t("strength-scalable-desc") }}</p>
          </div>

          <div
            class="bg-slate-800 rounded-2xl p-6 hover:bg-slate-700 transition-colors duration-300"
          >
            <div
              class="flex items-center justify-center w-16 h-16 bg-pink-600 rounded-xl mb-4"
            >
              <i class="fas fa-heart text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold mb-3">
              {{ $t("strength-mission-title") }}
            </h3>
            <p class="text-slate-300">{{ $t("strength-mission-desc") }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Roadmap Section -->
    <section id="roadmap" class="py-12 sm:py-16 md:py-20 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {{ $t("roadmap-title") }}
          </h2>
          <p class="text-xl text-slate-600 max-w-3xl mx-auto">
            {{ $t("roadmap-desc") }}
          </p>
        </div>

        <div class="mb-12">
          <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-6"
          >
            <div class="flex items-center">
              <div
                class="w-3 h-3 sm:w-4 sm:h-4 bg-green-600 rounded-full border-2 sm:border-4 border-white shadow-lg"
              ></div>
              <span
                class="ml-2 sm:ml-3 text-xs sm:text-sm font-medium text-green-600"
                >{{ $t("stage-idea") }}</span
              >
            </div>
            <div class="flex items-center">
              <div
                class="w-3 h-3 sm:w-4 sm:h-4 bg-blue-600 rounded-full border-2 sm:border-4 border-white shadow-lg"
              ></div>
              <span
                class="ml-2 sm:ml-3 text-xs sm:text-sm font-medium text-blue-600"
                >{{ $t("stage-prototype") }}</span
              >
            </div>
            <div class="flex items-center">
              <div
                class="w-3 h-3 sm:w-4 sm:h-4 bg-slate-300 rounded-full border-2 sm:border-4 border-white shadow-lg"
              ></div>
              <span
                class="ml-2 sm:ml-3 text-xs sm:text-sm font-medium text-slate-400"
                >{{ $t("stage-mvp") }}</span
              >
            </div>
            <div class="flex items-center">
              <div
                class="w-3 h-3 sm:w-4 sm:h-4 bg-slate-300 rounded-full border-2 sm:border-4 border-white shadow-lg"
              ></div>
              <span
                class="ml-2 sm:ml-3 text-xs sm:text-sm font-medium text-slate-400"
                >{{ $t("stage-launched") }}</span
              >
            </div>
          </div>
          <div class="bg-blue-50 rounded-xl p-6">
            <h3 class="text-xl font-bold text-slate-900 mb-2">
              {{ $t("current-stage-title") }}
            </h3>
            <p class="text-slate-600">{{ $t("current-stage-desc") }}</p>
          </div>
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          <div
            class="bg-green-50 border border-green-200 rounded-xl p-4 sm:p-6"
          >
            <div class="text-sm font-semibold text-green-700 mb-2">
              Week 1-2
            </div>
            <h4 class="text-lg font-bold text-slate-900 mb-3">
              {{ $t("timeline-research-title") }}
            </h4>
            <ul class="space-y-1 text-sm text-slate-600 mb-4">
              <li>{{ $t("timeline-research-item-1") }}</li>
              <li>{{ $t("timeline-research-item-2") }}</li>
              <li>{{ $t("timeline-research-item-3") }}</li>
              <li>{{ $t("timeline-research-item-4") }}</li>
            </ul>
            <div class="text-sm font-semibold text-green-600">
              {{ $t("timeline-status-completed") }}
            </div>
          </div>

          <div
            class="bg-green-50 border border-green-200 rounded-xl p-4 sm:p-6"
          >
            <div class="text-sm font-semibold text-green-600 mb-2">
              Week 3-4
            </div>
            <h4 class="text-lg font-bold text-slate-900 mb-3">
              {{ $t("timeline-prototype-title") }}
            </h4>
            <ul class="space-y-1 text-sm text-slate-600 mb-4">
              <li>{{ $t("timeline-prototype-item-1") }}</li>
              <li>{{ $t("timeline-prototype-item-2") }}</li>
              <li>{{ $t("timeline-prototype-item-3") }}</li>
              <li>{{ $t("timeline-prototype-item-4") }}</li>
            </ul>
            <div class="text-sm font-semibold green-blue-600">
              {{ $t("timeline-status-completed") }}
            </div>
          </div>

          <div class="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div class="text-xs sm:text-sm font-semibold text-slate-500 mb-2">
              Week 5-8
            </div>
            <h4 class="text-base sm:text-lg font-bold text-slate-900 mb-3">
              {{ $t("timeline-mvp-title") }}
            </h4>
            <ul class="space-y-1 text-xs sm:text-sm text-slate-600 mb-4">
              <li>{{ $t("timeline-mvp-item-1") }}</li>
              <li>{{ $t("timeline-mvp-item-2") }}</li>
              <li>{{ $t("timeline-mvp-item-3") }}</li>
              <li>{{ $t("timeline-mvp-item-4") }}</li>
            </ul>
            <div class="text-sm font-semibold text-slate-500">
              {{ $t("timeline-status-progress") }}
            </div>
          </div>

          <div class="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <div class="text-sm font-semibold text-slate-500 mb-2">
              Week 9-12
            </div>
            <h4 class="text-lg font-bold text-slate-900 mb-3">
              {{ $t("timeline-pilot-title") }}
            </h4>
            <ul class="space-y-1 text-sm text-slate-600 mb-4">
              <li>{{ $t("timeline-pilot-item-1") }}</li>
              <li>{{ $t("timeline-pilot-item-2") }}</li>
              <li>{{ $t("timeline-pilot-item-3") }}</li>
              <li>{{ $t("timeline-pilot-item-4") }}</li>
            </ul>
            <div class="text-sm font-semibold text-slate-500">
              {{ $t("timeline-status-planned") }}
            </div>
          </div>
        </div>

        <div class="mt-12">
          <h3 class="text-2xl font-bold text-slate-900 mb-8 text-center">
            {{ $t("next-steps-title") }}
          </h3>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            <div class="text-center p-4 sm:p-6">
              <div
                class="flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-xl mx-auto mb-4"
              >
                <i class="fas fa-microphone text-2xl"></i>
              </div>
              <h4 class="text-lg font-bold text-slate-900 mb-2">
                {{ $t("step-speech-title") }}
              </h4>
              <p class="text-sm text-slate-600">{{ $t("step-speech-desc") }}</p>
            </div>
            <div class="text-center p-6">
              <div
                class="flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-xl mx-auto mb-4"
              >
                <i class="fas fa-brain text-2xl"></i>
              </div>
              <h4 class="text-lg font-bold text-slate-900 mb-2">
                {{ $t("step-ai-title") }}
              </h4>
              <p class="text-sm text-slate-600">{{ $t("step-ai-desc") }}</p>
            </div>
            <div class="text-center p-6">
              <div
                class="flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-xl mx-auto mb-4"
              >
                <i class="fas fa-desktop text-2xl"></i>
              </div>
              <h4 class="text-lg font-bold text-slate-900 mb-2">
                {{ $t("step-dashboard-title") }}
              </h4>
              <p class="text-sm text-slate-600">
                {{ $t("step-dashboard-desc") }}
              </p>
            </div>
            <div class="text-center p-6">
              <div
                class="flex items-center justify-center w-16 h-16 bg-red-100 text-red-600 rounded-xl mx-auto mb-4"
              >
                <i class="fas fa-hospital-user text-2xl"></i>
              </div>
              <h4 class="text-lg font-bold text-slate-900 mb-2">
                {{ $t("step-clinic-title") }}
              </h4>
              <p class="text-sm text-slate-600">{{ $t("step-clinic-desc") }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Solution Approach Section -->
    <section
      id="solution"
      class="py-12 sm:py-16 md:py-20 bg-linear-to-br from-slate-800 to-slate-900 text-white"
    >
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold mb-4">
            {{ $t("solution-approach-title") }}
          </h2>
          <p class="text-xl text-slate-300 max-w-3xl mx-auto">
            {{ $t("solution-approach-desc") }}
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          <div class="space-y-8">
            <div>
              <h3 class="flex items-center text-2xl font-bold mb-6">
                <i class="fas fa-route text-blue-400 mr-3"></i>
                <span>{{ $t("key-steps-title") }}</span>
              </h3>
              <div class="space-y-6">
                <div class="flex items-start gap-4">
                  <div
                    class="flex items-center justify-center p-4 w-8 h-8 bg-blue-600 text-white rounded-full font-bold text-sm"
                  >
                    1
                  </div>
                  <div>
                    <h4 class="font-bold text-lg mb-1">
                      {{ $t("key-step-1-title") }}
                    </h4>
                    <p class="text-slate-300 text-sm">
                      {{ $t("key-step-1-desc") }}
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-4">
                  <div
                    class="flex items-center justify-center p-4 w-8 h-8 bg-blue-600 text-white rounded-full font-bold text-sm"
                  >
                    2
                  </div>
                  <div>
                    <h4 class="font-bold text-lg mb-1">
                      {{ $t("key-step-2-title") }}
                    </h4>
                    <p class="text-slate-300 text-sm">
                      {{ $t("key-step-2-desc") }}
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-4">
                  <div
                    class="flex items-center justify-center p-4 w-8 h-8 bg-blue-600 text-white rounded-full font-bold text-sm"
                  >
                    3
                  </div>
                  <div>
                    <h4 class="font-bold text-lg mb-1">
                      {{ $t("key-step-3-title") }}
                    </h4>
                    <p class="text-slate-300 text-sm">
                      {{ $t("key-step-3-desc") }}
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-4">
                  <div
                    class="flex items-center justify-center p-4 w-8 h-8 bg-blue-600 text-white rounded-full font-bold text-sm"
                  >
                    4
                  </div>
                  <div>
                    <h4 class="font-bold text-lg mb-1">
                      {{ $t("key-step-4-title") }}
                    </h4>
                    <p class="text-slate-300 text-sm">
                      {{ $t("key-step-4-desc") }}
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-4">
                  <div
                    class="flex items-center justify-center p-4 w-8 h-8 bg-blue-600 text-white rounded-full font-bold text-sm"
                  >
                    5
                  </div>
                  <div>
                    <h4 class="font-bold text-lg mb-1">
                      {{ $t("key-step-5-title") }}
                    </h4>
                    <p class="text-slate-300 text-sm">
                      {{ $t("key-step-5-desc") }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 class="flex items-center text-2xl font-bold mb-6">
              <i class="fas fa-tools text-green-400 mr-3"></i>
              <span>{{ $t("tech-stack-title") }}</span>
            </h3>
            <div class="space-y-6">
              <div>
                <h4 class="font-bold text-lg mb-2">
                  {{ $t("tech-frontend") }}
                </h4>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1 bg-blue-600 rounded-full text-sm"
                    >Vue</span
                  >
                  <span class="px-3 py-1 bg-blue-600 rounded-full text-sm"
                    >TypeScript</span
                  >
                  <span class="px-3 py-1 bg-blue-600 rounded-full text-sm"
                    >Tailwind CSS</span
                  >
                  <span class="px-3 py-1 bg-blue-600 rounded-full text-sm"
                    >WebRTC</span
                  >
                </div>
              </div>
              <div>
                <h4 class="font-bold text-lg mb-2">{{ $t("tech-backend") }}</h4>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1 bg-green-600 rounded-full text-sm"
                    >Node.js</span
                  >
                  <span class="px-3 py-1 bg-green-600 rounded-full text-sm"
                    >Java Spring</span
                  >
                  <span class="px-3 py-1 bg-green-600 rounded-full text-sm"
                    >PostgreSQL</span
                  >
                  <span class="px-3 py-1 bg-green-600 rounded-full text-sm"
                    >Redis</span
                  >
                </div>
              </div>
              <div>
                <h4 class="font-bold text-lg mb-2">{{ $t("tech-ai-ml") }}</h4>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1 bg-purple-600 rounded-full text-sm"
                    >OpenAI Whisper</span
                  >
                  <span class="px-3 py-1 bg-purple-600 rounded-full text-sm"
                    >spaCy</span
                  >
                  <span class="px-3 py-1 bg-purple-600 rounded-full text-sm"
                    >Transformers</span
                  >
                  <span class="px-3 py-1 bg-purple-600 rounded-full text-sm"
                    >PyTorch</span
                  >
                </div>
              </div>
              <div>
                <h4 class="font-bold text-lg mb-2">
                  {{ $t("tech-infrastructure") }}
                </h4>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1 bg-red-600 rounded-full text-sm"
                    >Docker</span
                  >
                  <span class="px-3 py-1 bg-red-600 rounded-full text-sm"
                    >Kubernetes</span
                  >
                  <span class="px-3 py-1 bg-red-600 rounded-full text-sm"
                    >AWS</span
                  >
                  <span class="px-3 py-1 bg-red-600 rounded-full text-sm"
                    >WebSocket</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-16">
          <h3 class="flex items-center justify-center text-2xl font-bold mb-8">
            <i class="fas fa-brain text-purple-400 mr-3"></i>
            <span>{{ $t("ai-implementation-title") }}</span>
          </h3>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            <div class="bg-slate-800 rounded-xl p-4 sm:p-6 text-center">
              <div
                class="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mx-auto mb-4"
              >
                <i class="fas fa-microphone-alt text-2xl"></i>
              </div>
              <h4 class="font-bold text-lg mb-2">
                {{ $t("ai-realtime-title") }}
              </h4>
              <p class="text-slate-300 text-sm mb-3">
                {{ $t("ai-realtime-desc") }}
              </p>
              <div class="text-xs text-slate-400">
                <strong>{{ $t("ai-realtime-tech") }}</strong>
              </div>
            </div>

            <div class="bg-slate-800 rounded-xl p-6 text-center">
              <div
                class="flex items-center justify-center w-16 h-16 bg-green-600 rounded-xl mx-auto mb-4"
              >
                <i class="fas fa-search text-2xl"></i>
              </div>
              <h4 class="font-bold text-lg mb-2">
                {{ $t("ai-entity-title") }}
              </h4>
              <p class="text-slate-300 text-sm mb-3">
                {{ $t("ai-entity-desc") }}
              </p>
              <div class="text-xs text-slate-400">
                <strong>{{ $t("ai-entity-tech") }}</strong>
              </div>
            </div>

            <div class="bg-slate-800 rounded-xl p-6 text-center">
              <div
                class="flex items-center justify-center w-16 h-16 bg-purple-600 rounded-xl mx-auto mb-4"
              >
                <i class="fas fa-stethoscope text-2xl"></i>
              </div>
              <h4 class="font-bold text-lg mb-2">
                {{ $t("ai-diagnostic-title") }}
              </h4>
              <p class="text-slate-300 text-sm mb-3">
                {{ $t("ai-diagnostic-desc") }}
              </p>
              <div class="text-xs text-slate-400">
                <strong>{{ $t("ai-diagnostic-tech") }}</strong>
              </div>
            </div>

            <div class="bg-slate-800 rounded-xl p-6 text-center">
              <div
                class="flex items-center justify-center w-16 h-16 bg-red-600 rounded-xl mx-auto mb-4"
              >
                <i class="fas fa-shield-virus text-2xl"></i>
              </div>
              <h4 class="font-bold text-lg mb-2">
                {{ $t("ai-anomaly-title") }}
              </h4>
              <p class="text-slate-300 text-sm mb-3">
                {{ $t("ai-anomaly-desc") }}
              </p>
              <div class="text-xs text-slate-400">
                <strong>{{ $t("ai-anomaly-tech") }}</strong>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 class="flex items-center justify-center text-2xl font-bold mb-8">
            <i class="fas fa-sitemap text-yellow-400 mr-3"></i>
            {{ $t("arch-overview-title") }}
          </h3>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            <div
              class="bg-slate-800 rounded-xl p-4 sm:p-6 hover:bg-slate-700 transition-colors"
            >
              <div
                class="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4"
              >
                <i class="fas fa-desktop text-2xl"></i>
              </div>
              <h4 class="text-xl font-bold mb-2">
                {{ $t("arch-presentation-title") }}
              </h4>
              <p class="text-slate-300 mb-4">
                {{ $t("arch-presentation-desc") }}
              </p>
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <i class="fas fa-user-md text-blue-400"></i>
                  <span class="text-sm">{{ $t("arch-doctor-dashboard") }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fas fa-cogs text-blue-400"></i>
                  <span class="text-sm">{{ $t("arch-admin-portal") }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fas fa-mobile-alt text-blue-400"></i>
                  <span class="text-sm">{{ $t("arch-mobile-app") }}</span>
                </div>
              </div>
            </div>

            <div
              class="bg-slate-800 rounded-xl p-6 hover:bg-slate-700 transition-colors"
            >
              <div
                class="flex items-center justify-center w-16 h-16 bg-green-600 rounded-xl mb-4"
              >
                <i class="fas fa-microchip text-2xl"></i>
              </div>
              <h4 class="text-xl font-bold mb-2">
                {{ $t("arch-application-title") }}
              </h4>
              <p class="text-slate-300 mb-4">
                {{ $t("arch-application-desc") }}
              </p>
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <i class="fas fa-microphone text-green-400"></i>
                  <span class="text-sm">{{
                    $t("arch-speech-processing")
                  }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fas fa-brain text-green-400"></i>
                  <span class="text-sm">{{ $t("arch-ai-diagnostics") }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fas fa-shield-alt text-green-400"></i>
                  <span class="text-sm">{{ $t("arch-control-module") }}</span>
                </div>
              </div>
            </div>

            <div
              class="bg-slate-800 rounded-xl p-6 hover:bg-slate-700 transition-colors"
            >
              <div
                class="flex items-center justify-center w-16 h-16 bg-purple-600 rounded-xl mb-4"
              >
                <i class="fas fa-database text-2xl"></i>
              </div>
              <h4 class="text-xl font-bold mb-2">
                {{ $t("arch-data-title") }}
              </h4>
              <p class="text-slate-300 mb-4">{{ $t("arch-data-desc") }}</p>
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <i class="fas fa-hospital text-purple-400"></i>
                  <span class="text-sm">{{ $t("arch-medical-database") }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fas fa-volume-up text-purple-400"></i>
                  <span class="text-sm">{{ $t("arch-audio-storage") }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fas fa-clipboard-list text-purple-400"></i>
                  <span class="text-sm">{{ $t("arch-audit-logs") }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-12 sm:py-16 md:py-20 bg-blue-600 text-white text-center">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
          {{ $t("footer-contact-desc") }}
        </h2>
        <router-link
          to="/demo"
          class="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-blue-50 hover:-translate-y-1 transition-all duration-300 shadow-lg"
        >
          <i class="fas fa-play"></i>
          Try Live Demo
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-slate-900 text-white py-8 sm:py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <div class="mb-4">
            <span class="text-2xl font-bold text-blue-400">{{
              $t("brand")
            }}</span>
          </div>
          <p class="text-slate-300 mb-4">{{ $t("footer-tagline") }}</p>
          <p class="text-slate-400 text-sm">© 2025 MedVoice</p>
          <p class="text-slate-400 text-xs">Ipak Coders</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

// Animated metrics
const animatedMetric1 = ref(0);
const animatedMetric2 = ref(0);
const animatedMetric3 = ref(0);
const metric1 = ref<HTMLElement>();
const metric2 = ref<HTMLElement>();
const metric3 = ref<HTMLElement>();

// Smooth scrolling function
const smoothScrollTo = (event: Event, targetId: string) => {
  event.preventDefault();
  const target = document.getElementById(targetId);
  if (target) {
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
};

// Team members data
const teamMembers = [
  {
    name: "Furqat",
    fullName: "Furqat Qobilov",
    role: "Art Director",
    roleKey: "member-role-art-director",
    image: "/img/furqat.jpeg",
    skills: ["UI/UX Design", "Figma", "Design Systems", "Accessibility"],
    description:
      "Creative art director specializing in healthcare interface design. Focus on user-centered design and accessibility standards for medical professionals.",
    links: [
      {
        type: "LinkedIn",
        url: "https://www.linkedin.com/in/furkat-kobilov-6277ba257/",
        icon: "fab fa-linkedin",
      },
    ],
  },
  {
    name: "Islombek",
    fullName: "Islombek Salimov",
    role: "Lead Developer",
    roleKey: "member-role-lead-developer",
    image: "/img/islombek.JPG",
    skills: ["JavaScript", "React", "Node.js", "AI/ML"],
    description:
      "Expert JavaScript engineer with 5+ years in full-stack development and AI integration. Specializes in real-time applications and healthcare technology.",
    links: [
      {
        type: "LinkedIn",
        url: "https://www.linkedin.com/in/islombek-salimov-ab5aa4154/",
        icon: "fab fa-linkedin",
      },
      {
        type: "GitHub",
        url: "https://github.com/mj11rock",
        icon: "fab fa-github",
      },
      {
        type: "Telegram",
        url: "https://t.me/islombe_dev",
        icon: "fas fa-globe",
      },
    ],
  },
  {
    name: "Muhammad",
    fullName: "Muhammad Farmonov",
    role: "Head of Product Strategy",
    roleKey: "member-role-product-strategy",
    image: "/img/muhammad.jpg",
    skills: ["Product Management", "Agile", "Healthcare", "Strategy"],
    description:
      "Experienced product manager with deep understanding of healthcare workflows and regulatory requirements. Drives strategic vision and stakeholder alignment.",
    links: [
      {
        type: "LinkedIn",
        url: "https://www.linkedin.com/in/muhammad-farmonov/",
        icon: "fab fa-linkedin",
      },
    ],
  },
  {
    name: "Akobir",
    fullName: "Akobir Abduganiev",
    role: "Senior Developer",
    roleKey: "member-role-senior-developer",
    image: "/img/akobir.jpg",
    skills: [
      "Java",
      "Spring Boot",
      "Microservices",
      "Cloud",
      "Yandex Cup 2025 Winner",
      "Yandex Cup 2024 Finallist",
    ],
    description:
      "Senior Java developer with expertise in enterprise applications and microservices architecture. Strong background in healthcare system integration.",
    links: [
      {
        type: "LinkedIn",
        url: "https://www.linkedin.com/in/akobir-abduganiev/",
        icon: "fab fa-linkedin",
      },
      {
        type: "GitHub",
        url: "https://github.com/akobirabduganiev",
        icon: "fab fa-github",
      },
      {
        type: "Telegram",
        url: "https://t.me/akobirabduganiev",
        icon: "fas fa-globe",
      },
    ],
  },
];

// Animation function for counting up numbers
const animateValue = (
  obj: { value: number },
  start: number,
  end: number,
  duration: number
) => {
  let startTimestamp: number | null = null;
  const step = (timestamp: number) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.value = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};

// Intersection Observer for triggering animations when elements come into view
const observeMetrics = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === metric1.value) {
            animateValue(animatedMetric1, 0, 60, 2000);
          } else if (entry.target === metric2.value) {
            animateValue(animatedMetric2, 0, 40, 2000);
          } else if (entry.target === metric3.value) {
            animateValue(animatedMetric3, 0, 100, 2000);
          }
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  if (metric1.value) observer.observe(metric1.value);
  if (metric2.value) observer.observe(metric2.value);
  if (metric3.value) observer.observe(metric3.value);
};

onMounted(() => {
  observeMetrics();
});
</script>
