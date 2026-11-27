<script setup>
import { onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import PageBanner from '../components/PageBanner.vue'
import { aiOpportunities } from '../data/aiOpportunities'
import { aiPackages, aiPrinciples, aiServiceGroups } from '../data/aiServices'

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
      subtitle="From your first AI conversation to working AI inside your systems, built responsibly, in English and Kiswahili."
      large
    />

    <section class="bg-white px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <h2 class="max-w-3xl text-3xl font-bold tracking-tight text-ink md:text-4xl">A clear path from AI curiosity to AI that works.</h2>
        <p class="mt-4 max-w-3xl text-base leading-7 text-muted">Most organisations move through four steps. Start wherever you are.</p>
        <ol class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="(group, index) in aiServiceGroups" :key="group.id">
            <a :href="`#${group.id}`" class="block h-full rounded-xl border border-[#e5dfcd] bg-paper p-5 transition hover:border-brand">
              <p class="text-sm font-bold text-brand">{{ String(index + 1).padStart(2, '0') }} · {{ group.step }}</p>
              <h3 class="mt-2 text-lg font-bold leading-snug text-ink">{{ group.title }}</h3>
              <p class="mt-2 text-sm leading-6 text-muted">{{ group.summary }}</p>
            </a>
          </li>
        </ol>
      </div>
    </section>

    <section
      v-for="(group, index) in aiServiceGroups"
      :id="group.id"
      :key="group.id"
      class="scroll-mt-24 px-5 py-14 md:py-16 lg:px-8"
      :class="index % 2 === 0 ? 'bg-paper' : 'bg-white'"
    >
      <div class="mx-auto max-w-7xl">
        <p class="text-sm font-bold uppercase tracking-[0.12em] text-brand">Step {{ index + 1 }} · {{ group.step }}</p>
        <h2 class="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">{{ group.title }}</h2>
        <p class="mt-3 max-w-3xl text-base leading-7 text-muted">{{ group.summary }}</p>
        <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <article v-for="service in group.services" :key="service.title" class="flex flex-col rounded-xl border border-[#e5dfcd] bg-white p-5 md:p-6">
            <h3 class="text-lg font-bold leading-snug text-ink">{{ service.title }}</h3>
            <p class="mt-2 flex-1 text-sm leading-6 text-muted">{{ service.description }}</p>
            <ul class="mt-4 space-y-1.5 border-t border-[#e5dfcd] pt-4">
              <li v-for="item in service.deliverables" :key="item" class="flex gap-2 text-sm leading-6 text-muted">
                <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true"></span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section id="ai-packages" class="scroll-mt-24 bg-navy px-5 py-14 text-white md:py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <p class="text-sm font-bold uppercase tracking-[0.12em] text-[#c9a227]">Starter packages</p>
        <h2 class="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Three easy ways to begin.</h2>
        <p class="mt-3 max-w-3xl text-base leading-7 text-slate-200">Fixed scope and clear deliverables. We confirm the fee after a free 30-minute scoping call.</p>
        <div class="mt-8 grid gap-5 md:grid-cols-3">
          <article v-for="pack in aiPackages" :key="pack.title" class="flex flex-col rounded-xl bg-white/10 p-6">
            <p class="text-sm font-semibold text-[#c9a227]">{{ pack.duration }}</p>
            <h3 class="mt-2 text-xl font-bold">{{ pack.title }}</h3>
            <p class="mt-3 text-base leading-7 text-slate-200">{{ pack.description }}</p>
            <ul class="mt-4 flex-1 space-y-2">
              <li v-for="item in pack.includes" :key="item" class="flex gap-2 text-sm leading-6 text-slate-100">
                <span aria-hidden="true">✓</span><span>{{ item }}</span>
              </li>
            </ul>
            <RouterLink class="mt-6 inline-flex min-h-11 w-fit items-center justify-center rounded-md bg-brand px-5 text-sm font-bold text-white transition hover:bg-brand-dark" :to="contactLink(pack.title)">
              Request this package
            </RouterLink>
          </article>
        </div>
      </div>
    </section>

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
          <h2 class="text-2xl font-bold md:text-3xl">Not sure where to start with AI?</h2>
          <p class="mt-3 max-w-2xl text-base leading-7 text-muted">Book a free 30-minute conversation. We will tell you honestly where AI can help, and where it can’t.</p>
        </div>
        <RouterLink class="inline-flex min-h-12 shrink-0 items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-dark" :to="contactLink('A first conversation about AI')">Talk to us about AI</RouterLink>
      </div>
    </section>
  </div>
</template>
