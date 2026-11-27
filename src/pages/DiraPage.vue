<script setup>
import { RouterLink } from 'vue-router'
import PageBanner from '../components/PageBanner.vue'
import { diraAudiences, diraIntro, diraSkills, diraSources, diraSystem } from '../data/dira2050'
</script>

<template>
  <div>
    <PageBanner :title="diraIntro.title" breadcrumb="MEL for Dira 2050" :subtitle="diraIntro.lead" large />

    <section class="bg-white px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <p class="text-sm font-bold uppercase tracking-[0.12em] text-brand">What is changing</p>
        <h2 class="mt-3 text-3xl font-bold tracking-tight text-navy md:text-4xl">A new results system for national development</h2>
        <div class="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <article v-for="item in diraSystem" :key="item.title" class="rounded-xl border border-[#e5dfcd] bg-paper p-5">
            <h3 class="text-lg font-bold leading-snug text-navy">{{ item.title }}</h3>
            <p class="mt-2 text-base leading-7 text-muted">{{ item.detail }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="skills" class="scroll-mt-24 bg-paper px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div class="max-w-3xl">
          <p class="text-sm font-bold uppercase tracking-[0.12em] text-brand">Skills</p>
          <h2 class="mt-3 text-3xl font-bold tracking-tight text-navy md:text-4xl">The MEL skills Dira 2050 calls for</h2>
          <p class="mt-3 text-base leading-7 text-muted">Eight capabilities that go beyond routine reporting, and how CLM helps with each.</p>
        </div>
        <ol class="mt-8 grid gap-4 md:grid-cols-2">
          <li v-for="(skill, i) in diraSkills" :key="skill.title" class="flex gap-4 rounded-xl border border-[#e5dfcd] bg-white p-5 md:p-6">
            <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-base font-bold text-white">{{ i + 1 }}</span>
            <div>
              <h3 class="text-lg font-bold leading-snug text-navy">{{ skill.title }}</h3>
              <p class="mt-2 text-base leading-7 text-muted"><span class="font-semibold text-navy">What it takes: </span>{{ skill.need }}</p>
              <p class="mt-2 text-base leading-7 text-muted"><span class="font-semibold text-brand">How we help: </span>{{ skill.help }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="bg-white px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <h2 class="text-3xl font-bold tracking-tight text-navy md:text-4xl">Who needs these skills</h2>
        <div class="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article v-for="audience in diraAudiences" :key="audience.title" class="border-l-4 border-[#c9a227] bg-paper p-5">
            <h3 class="text-lg font-bold leading-snug text-navy">{{ audience.title }}</h3>
            <p class="mt-2 text-base leading-7 text-muted">{{ audience.detail }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="bg-navy px-5 py-12 text-white md:py-14 lg:px-8">
      <div class="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div class="max-w-3xl">
          <h2 class="text-2xl font-bold md:text-3xl">Aligning your results with Dira 2050?</h2>
          <p class="mt-3 text-base leading-7 text-slate-200">Our two signature offers, Digital MEL in 90 Days and Evaluations That Get Used, are built for exactly this shift from activities to results.</p>
        </div>
        <div class="flex flex-wrap gap-3">
          <RouterLink class="inline-flex min-h-12 items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-dark" :to="{ path: '/contact', query: { topic: 'MEL for Dira 2050' } }">Talk to us</RouterLink>
          <RouterLink class="inline-flex min-h-12 items-center justify-center rounded-md border border-white px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-navy" :to="{ path: '/', hash: '#signature-offers' }">See the offers</RouterLink>
        </div>
      </div>
    </section>

    <section class="bg-paper px-5 py-10 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <h2 class="text-base font-bold text-navy">Sources</h2>
        <ul class="mt-3 space-y-1.5 text-sm leading-6 text-muted">
          <li v-for="source in diraSources" :key="source.url">
            <a class="text-brand underline underline-offset-2 hover:text-brand-dark" :href="source.url" target="_blank" rel="noopener noreferrer">{{ source.label }}</a>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
