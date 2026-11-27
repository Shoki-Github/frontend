<script setup>
import { onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import PageBanner from '../components/PageBanner.vue'
import { aiOpportunities } from '../data/aiOpportunities'
import { aiPrinciples } from '../data/aiServices'

const route = useRoute()

onMounted(() => {
  if (route.hash) {
    document.getElementById(route.hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
})

function contactLink(topic) {
  return { path: '/contact', query: { service: 'AI for MEL', topic } }
}
</script>

<template>
  <div>
    <PageBanner
      title="AI for MEL"
      breadcrumb="AI for MEL"
      subtitle="Using AI to do better what we already do best: collect, check, analyse and use data in your MEL system, responsibly and in English or Kiswahili."
      large
    />

    <section id="ai-for-mel" class="scroll-mt-24 bg-white px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <p class="text-sm font-bold uppercase tracking-[0.12em] text-brand">Our specialism</p>
        <h2 class="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">AI for monitoring, evaluation and learning.</h2>
        <p class="mt-3 max-w-3xl leading-7 text-muted">
          CLM Consultants Limited combines artificial intelligence, monitoring, evaluation and learning to help organisations use their data, improve performance and make informed decisions.
        </p>

        <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <article v-for="opportunity in aiOpportunities" :key="opportunity.title" :id="opportunity.id" class="content-card scroll-mt-24 p-5 md:p-6">
            <h3 class="text-lg font-bold leading-snug text-ink">{{ opportunity.title }}</h3>
            <p class="mt-2 text-sm leading-6 text-muted">{{ opportunity.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="bg-paper px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <h2 class="text-3xl font-bold tracking-tight text-ink md:text-4xl">How we use AI responsibly</h2>
        <div class="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <article v-for="principle in aiPrinciples" :key="principle.title" class="border-l-4 border-[#c9a227] bg-white p-5">
            <h3 class="text-lg font-bold text-ink">{{ principle.title }}</h3>
            <p class="mt-2 text-base leading-7 text-muted">{{ principle.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="bg-[#e6f3f1] px-5 py-12 text-navy md:py-14 lg:px-8">
      <div class="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <div>
          <h2 class="text-2xl font-bold md:text-3xl">Not sure where AI fits in your MEL?</h2>
          <p class="mt-3 max-w-2xl text-base leading-7 text-muted">Book a free 30-minute conversation. We will tell you honestly where AI can help your monitoring, evaluation and reporting, and where it can’t.</p>
        </div>
        <RouterLink class="inline-flex min-h-12 shrink-0 items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-dark" :to="contactLink('A first conversation about AI')">Talk to us about AI</RouterLink>
      </div>
    </section>
  </div>
</template>
