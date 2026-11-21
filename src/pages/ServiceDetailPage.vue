<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import MethodsAndSectors from '../components/MethodsAndSectors.vue'
import PageBanner from '../components/PageBanner.vue'
import ServiceFaq from '../components/ServiceFaq.vue'
import { publishedCaseStudies } from '../data/caseStudies'
import { serviceFaqs } from '../data/siteContent'
import { serviceLines } from '../data/serviceLines'

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
})
const service = computed(() => serviceLines.find((item) => item.slug === props.slug))
const relatedCaseStudy = computed(() => publishedCaseStudies.find((item) => item.serviceSlug === props.slug))
</script>

<template>
  <div v-if="service">
    <PageBanner :title="service.title" :subtitle="service.summary" :breadcrumb="service.title" large />

    <section class="bg-white px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto max-w-3xl">
        <h2 class="text-3xl font-bold tracking-tight text-navy md:text-4xl">The challenge we solve</h2>
        <p class="mt-4 text-base leading-7 text-muted md:text-lg">{{ service.challenge }}</p>
      </div>
    </section>

    <section class="bg-paper px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div class="max-w-3xl">
          <h2 class="text-3xl font-bold tracking-tight text-navy md:text-4xl">What we deliver</h2>
          <p class="mt-4 text-base leading-7 text-muted">{{ service.summary }}</p>
        </div>
        <div v-if="service.deliverableGroups" class="mt-7 grid gap-5 lg:grid-cols-3">
          <article v-for="group in service.deliverableGroups" :key="group.title" class="rounded-xl border border-[#e5dfcd] bg-white p-6">
            <h3 class="text-xl font-bold text-navy">{{ group.title }}</h3>
            <p class="mt-2 text-base leading-7 text-muted">{{ group.description }}</p>
            <ul class="mt-4 space-y-2">
              <li v-for="item in group.items" :key="item" class="flex gap-3 text-base leading-7 text-muted">
                <span class="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden="true"></span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </article>
        </div>
        <ul v-else class="mt-7 grid gap-3 md:grid-cols-2">
          <li v-for="item in service.deliverables" :key="item" class="flex gap-3 rounded-lg border border-[#e5dfcd] bg-paper p-4 text-base leading-7 text-muted">
            <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden="true"></span>
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </section>

    <MethodsAndSectors v-if="service.showMethodsAndSectors" />

    <section class="px-5 py-14 md:py-16 lg:px-8" :class="service.showMethodsAndSectors ? 'bg-paper' : 'bg-white'">
      <div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 class="text-3xl font-bold tracking-tight text-navy md:text-4xl">How an engagement typically runs</h2>
          <ol class="mt-7 space-y-4">
            <li v-for="(step, index) in service.steps" :key="step" class="flex gap-4 rounded-lg border border-[#e5dfcd] bg-white p-4">
              <span class="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-white">{{ index + 1 }}</span>
              <span class="pt-1 text-base leading-6 text-muted">{{ step }}</span>
            </li>
          </ol>
        </div>
        <ServiceFaq :items="serviceFaqs.slice(0, 4)" title="Questions about our services" />
      </div>
    </section>

    <section v-if="relatedCaseStudy" class="bg-paper px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <h2 class="text-2xl font-bold tracking-tight text-navy md:text-3xl">Related case study</h2>
        <article class="mt-5 max-w-2xl rounded-xl border border-[#e5dfcd] bg-white p-6">
          <p class="text-sm font-semibold text-muted">{{ relatedCaseStudy.clientType }}</p>
          <h3 class="mt-2 text-xl font-bold text-navy">{{ relatedCaseStudy.title }}</h3>
          <p class="mt-3 text-base leading-7 text-muted">{{ relatedCaseStudy.result }}</p>
          <RouterLink class="mt-5 inline-flex text-sm font-bold text-brand" :to="{ name: 'case-study-detail', params: { slug: relatedCaseStudy.slug } }">
            Read case study <span class="ml-2" aria-hidden="true">→</span>
          </RouterLink>
        </article>
      </div>
    </section>

    <section class="bg-[#e6f3f1] px-5 py-12 text-navy md:py-14 lg:px-8">
      <div class="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <div>
          <h2 class="text-2xl font-bold md:text-3xl">Discuss your requirements with our team.</h2>
          <p class="mt-3 max-w-2xl text-base leading-7 text-muted">Tell us what you need to measure, improve or report.</p>
        </div>
        <RouterLink class="inline-flex min-h-12 shrink-0 items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-dark" to="/contact">Request Consultation</RouterLink>
      </div>
    </section>
  </div>
</template>
