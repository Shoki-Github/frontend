<script setup>
import { RouterLink } from 'vue-router'
import PageBanner from '../components/PageBanner.vue'
import { publishedCaseStudies } from '../data/caseStudies'
</script>

<template>
  <div>
    <PageBanner title="Case Studies" breadcrumb="Case Studies" subtitle="Selected assignments and what changed as a result." large />
    <section v-if="publishedCaseStudies.length" class="bg-white px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
        <article v-for="study in publishedCaseStudies" :key="study.slug" class="rounded-xl border border-[#e5dfcd] bg-white p-6">
          <p class="text-sm font-semibold text-muted">{{ study.sector }} · {{ study.year }}</p>
          <h2 class="mt-3 text-xl font-bold text-navy">{{ study.title }}</h2>
          <p class="mt-3 text-base leading-7 text-muted">{{ study.summary }}</p>
          <RouterLink class="mt-5 inline-flex text-sm font-bold text-brand" :to="{ name: 'case-study-detail', params: { slug: study.slug } }">Read case study <span class="ml-2" aria-hidden="true">→</span></RouterLink>
        </article>
      </div>
    </section>
    <section v-else class="bg-white px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto max-w-3xl rounded-xl border border-[#e5dfcd] bg-paper p-6 md:p-8">
        <h2 class="text-2xl font-bold text-navy">No case studies are currently published.</h2>
        <p class="mt-3 text-base leading-7 text-muted">Contact our team to discuss our experience and the work most relevant to your organisation.</p>
        <RouterLink class="mt-6 inline-flex min-h-12 items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-bold text-white" to="/contact">Contact CLM</RouterLink>
      </div>
    </section>
  </div>
</template>
