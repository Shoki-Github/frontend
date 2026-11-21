<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import PageBanner from '../components/PageBanner.vue'
import NewsletterSignup from '../components/NewsletterSignup.vue'
import { toolkitGuides } from '../data/toolkitGuides'

const categories = ['All', ...new Set(toolkitGuides.map((guide) => guide.category))]
const activeCategory = ref('All')
const visibleGuides = computed(() => (
  activeCategory.value === 'All'
    ? toolkitGuides
    : toolkitGuides.filter((guide) => guide.category === activeCategory.value)
))
</script>

<template>
  <div>
    <PageBanner title="MEL Toolkit" breadcrumb="MEL Toolkit" subtitle="Short, practical guides on monitoring, evaluation, data and learning, drawn from our work in Tanzania and East Africa. Free to use." large />

    <section class="bg-white px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div class="flex flex-wrap gap-2" role="group" aria-label="Filter guides by topic">
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            class="min-h-11 rounded-full border px-4 text-sm font-bold transition"
            :class="activeCategory === category ? 'border-brand bg-brand text-white' : 'border-[#e5dfcd] bg-white text-navy hover:border-brand'"
            :aria-pressed="activeCategory === category"
            @click="activeCategory = category"
          >
            {{ category }}
          </button>
        </div>

        <div class="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <article v-for="guide in visibleGuides" :key="guide.slug" class="flex flex-col rounded-xl border border-[#e5dfcd] bg-white p-6">
            <p class="text-xs font-bold uppercase tracking-wide text-brand">{{ guide.category }} · {{ guide.readingTime }}</p>
            <h2 class="mt-3 text-xl font-bold leading-snug text-navy">{{ guide.title }}</h2>
            <p class="mt-3 flex-1 text-base leading-7 text-muted">{{ guide.summary }}</p>
            <RouterLink class="mt-5 inline-flex min-h-11 items-center text-sm font-bold text-brand" :to="{ name: 'toolkit-guide', params: { slug: guide.slug } }">
              Read the guide <span class="ml-2" aria-hidden="true">→</span>
            </RouterLink>
          </article>
        </div>
      </div>
    </section>

    <NewsletterSignup source="toolkit" />
  </div>
</template>
