<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import PageBanner from '../components/PageBanner.vue'
import { insights } from '../data/insights'
import { homeContent, sectors } from '../data/siteContent'
import { toolkitGuides } from '../data/toolkitGuides'

// A sector hub gathers everything CLM has on one sector: the MEL questions
// clients face, the link to Dira 2050, proof of past work, the matching
// signature offer, and related Insights and Toolkit guides.
const route = useRoute()
const sector = computed(() => sectors.find((s) => s.slug === route.params.slug) || null)
const offer = computed(() => homeContent.signatureOffers.find((o) => o.id === sector.value?.offerId) || null)
const relatedInsights = computed(() => insights.filter((i) => sector.value?.insights.includes(i.slug)))
const relatedGuides = computed(() => toolkitGuides.filter((g) => sector.value?.guides.includes(g.slug)))
const otherSectors = computed(() => sectors.filter((s) => s.slug !== sector.value?.slug))
</script>

<template>
  <div>
    <template v-if="sector">
      <PageBanner :title="sector.title" breadcrumb="Sectors" :subtitle="sector.description" large />

      <section class="bg-white px-5 py-14 md:py-16 lg:px-8">
        <div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          <div>
            <p class="text-sm font-bold uppercase tracking-[0.12em] text-brand">Questions we help answer</p>
            <h2 class="mt-3 text-3xl font-bold tracking-tight text-navy md:text-4xl">What {{ sector.title.toLowerCase() }} programmes need to know</h2>
            <ul class="mt-6 space-y-3">
              <li v-for="question in sector.questions" :key="question" class="flex gap-3 rounded-lg border border-[#e5dfcd] bg-paper p-4 text-base leading-7 text-navy">
                <span class="font-bold text-brand" aria-hidden="true">?</span>{{ question }}
              </li>
            </ul>
          </div>
          <aside class="space-y-5">
            <div class="border-l-4 border-[#c9a227] bg-paper p-5">
              <p class="text-sm font-bold uppercase tracking-wide text-brand">Link to Dira 2050</p>
              <p class="mt-2 text-base leading-7 text-navy">{{ sector.dira }}</p>
              <RouterLink v-if="sector.extraLink" class="mt-3 inline-flex text-sm font-bold text-brand hover:text-brand-dark" :to="sector.extraLink.to">{{ sector.extraLink.label }} <span class="ml-1" aria-hidden="true">→</span></RouterLink>
            </div>
            <div v-if="sector.proof" class="rounded-xl border border-[#e5dfcd] bg-white p-5">
              <p class="text-sm font-bold uppercase tracking-wide text-brand">Experience</p>
              <p class="mt-2 text-base leading-7 text-muted">{{ sector.proof }}</p>
            </div>
          </aside>
        </div>
      </section>

      <section v-if="offer" class="bg-navy px-5 py-12 text-white md:py-14 lg:px-8">
        <div class="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div class="max-w-3xl">
            <p class="text-sm font-bold uppercase tracking-[0.12em] text-[#c9a227]">The offer that fits</p>
            <h2 class="mt-2 text-2xl font-bold md:text-3xl">{{ offer.title }}</h2>
            <p class="mt-3 text-base leading-7 text-slate-200">{{ offer.outcome }}</p>
          </div>
          <div class="flex flex-wrap gap-3">
            <RouterLink class="inline-flex min-h-12 items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-dark" :to="{ path: '/contact', query: { topic: `${offer.title} (${sector.title})` } }">Discuss this offer</RouterLink>
            <RouterLink class="inline-flex min-h-12 items-center justify-center rounded-md border border-white px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-navy" :to="{ path: '/', hash: `#${offer.id}` }">See how it works</RouterLink>
          </div>
        </div>
      </section>

      <section class="bg-paper px-5 py-14 md:py-16 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <h2 class="text-3xl font-bold tracking-tight text-navy md:text-4xl">Read and use</h2>
          <div class="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <RouterLink v-for="article in relatedInsights" :key="article.slug" class="rounded-xl border border-[#e5dfcd] bg-white p-5 transition hover:border-brand" :to="{ name: 'insight-detail', params: { slug: article.slug } }">
              <p class="text-xs font-bold uppercase tracking-wide text-brand">{{ article.type === 'data-brief' ? 'Data brief' : 'Insight' }} · {{ article.reading_time }} min read</p>
              <h3 class="mt-2 text-lg font-bold leading-snug text-navy">{{ article.title }}</h3>
              <p class="mt-2 text-sm leading-6 text-muted">{{ article.excerpt }}</p>
            </RouterLink>
            <RouterLink v-for="guide in relatedGuides" :key="guide.slug" class="rounded-xl border border-[#e5dfcd] bg-white p-5 transition hover:border-brand" :to="{ name: 'toolkit-guide', params: { slug: guide.slug } }">
              <p class="text-xs font-bold uppercase tracking-wide text-brand">Toolkit · {{ guide.readingTime }}</p>
              <h3 class="mt-2 text-lg font-bold leading-snug text-navy">{{ guide.title }}</h3>
              <p class="mt-2 text-sm leading-6 text-muted">{{ guide.summary }}</p>
            </RouterLink>
          </div>
        </div>
      </section>

      <section class="bg-white px-5 py-10 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <h2 class="text-base font-bold text-navy">Other sectors</h2>
          <div class="mt-3 flex flex-wrap gap-2">
            <RouterLink v-for="other in otherSectors" :key="other.slug" class="rounded-full border border-[#e5dfcd] px-4 py-2 text-sm font-semibold text-navy transition hover:border-brand hover:text-brand" :to="{ name: 'sector', params: { slug: other.slug } }">{{ other.title }}</RouterLink>
          </div>
        </div>
      </section>
    </template>

    <section v-else class="bg-white px-5 py-16 lg:px-8">
      <div class="mx-auto max-w-3xl">
        <h1 class="text-3xl font-bold text-navy">Sector not found</h1>
        <RouterLink class="mt-4 inline-flex text-sm font-bold text-brand" to="/about">See all sectors on the About page →</RouterLink>
      </div>
    </section>
  </div>
</template>
