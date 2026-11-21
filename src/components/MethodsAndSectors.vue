<script setup>
import { evaluationMethods, sectors } from '../data/siteContent'

defineProps({
  showMethods: { type: Boolean, default: true },
  showSectors: { type: Boolean, default: true },
  tone: { type: String, default: 'white' },
})
</script>

<template>
  <section class="px-5 py-14 md:py-16 lg:px-8" :class="tone === 'paper' ? 'bg-paper' : 'bg-white'">
    <div class="mx-auto grid max-w-7xl gap-12" :class="showMethods && showSectors ? 'lg:grid-cols-[1.2fr_0.8fr] lg:gap-14' : ''">
      <div v-if="showMethods">
        <h2 class="text-3xl font-bold tracking-tight text-navy md:text-4xl">Methods we use</h2>
        <p class="mt-4 max-w-2xl text-base leading-7 text-muted">We choose methods to fit the evaluation questions, the budget and the context, not the other way round.</p>
        <ul class="mt-7 grid gap-3 sm:grid-cols-2">
          <li v-for="method in evaluationMethods" :key="method.title" class="rounded-lg border border-[#e5dfcd] bg-white p-4">
            <p class="font-bold text-navy">{{ method.title }}</p>
            <p class="mt-1 text-sm leading-6 text-muted">{{ method.description }}</p>
          </li>
        </ul>
      </div>
      <div v-if="showSectors">
        <h2 class="text-3xl font-bold tracking-tight text-navy md:text-4xl">Sectors we work in</h2>
        <ul class="mt-7 space-y-3">
          <li v-for="sector in sectors" :key="sector.title" class="border-l-4 border-[#c9a227] bg-paper p-4">
            <p class="font-bold text-navy">{{ sector.title }}</p>
            <p class="mt-1 text-sm leading-6 text-muted">{{ sector.description }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
