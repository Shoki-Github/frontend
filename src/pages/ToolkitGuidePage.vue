<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import PageBanner from '../components/PageBanner.vue'
import NotFoundPage from './NotFoundPage.vue'
import { serviceLines } from '../data/serviceLines'
import { toolkitGuides } from '../data/toolkitGuides'

const route = useRoute()
const guide = computed(() => toolkitGuides.find((item) => item.slug === route.params.slug))
const relatedService = computed(() => serviceLines.find((item) => item.slug === guide.value?.serviceSlug))
const otherGuides = computed(() => toolkitGuides.filter((item) => item.slug !== guide.value?.slug).slice(0, 3))
</script>

<template>
  <div v-if="guide">
    <PageBanner :title="guide.title" :subtitle="guide.summary" breadcrumb="MEL Toolkit" />

    <article class="bg-white px-5 py-12 md:py-16 lg:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-bold uppercase tracking-wide text-brand">{{ guide.category }} · {{ guide.readingTime }}</p>
        <section v-for="section in guide.sections" :key="section.heading" class="mt-8 first:mt-5">
          <h2 class="text-2xl font-bold tracking-tight text-navy">{{ section.heading }}</h2>
          <p v-for="paragraph in section.paragraphs || []" :key="paragraph" class="mt-4 text-base leading-8 text-muted md:text-lg">{{ paragraph }}</p>
          <ul v-if="section.list" class="mt-4 space-y-3">
            <li v-for="item in section.list" :key="item" class="flex gap-3 text-base leading-7 text-muted md:text-lg md:leading-8">
              <span class="mt-3 h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden="true"></span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </section>

        <aside v-if="relatedService" class="mt-12 rounded-xl border border-[#e5dfcd] bg-[#e6f3f1] p-6">
          <h2 class="text-xl font-bold text-navy">Want help applying this?</h2>
          <p class="mt-2 text-base leading-7 text-muted">This guide relates to our {{ relatedService.title }} service.</p>
          <div class="mt-5 flex flex-wrap gap-3">
            <RouterLink class="inline-flex min-h-11 items-center justify-center rounded-md bg-brand px-5 text-sm font-bold text-white transition hover:bg-brand-dark" :to="{ name: 'service-detail', params: { slug: relatedService.slug } }">See the service</RouterLink>
            <RouterLink class="inline-flex min-h-11 items-center justify-center rounded-md border border-navy px-5 text-sm font-bold text-navy" to="/contact">Talk to our team</RouterLink>
          </div>
        </aside>
      </div>
    </article>

    <section class="bg-paper px-5 py-14 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <h2 class="text-2xl font-bold tracking-tight text-navy md:text-3xl">More from the toolkit</h2>
          <RouterLink class="text-sm font-bold text-brand" to="/toolkit">All guides <span aria-hidden="true">→</span></RouterLink>
        </div>
        <div class="mt-6 grid gap-5 md:grid-cols-3">
          <RouterLink v-for="item in otherGuides" :key="item.slug" class="rounded-xl border border-[#e5dfcd] bg-white p-5 transition hover:border-brand" :to="{ name: 'toolkit-guide', params: { slug: item.slug } }">
            <p class="text-xs font-bold uppercase tracking-wide text-brand">{{ item.category }}</p>
            <h3 class="mt-2 text-lg font-bold leading-snug text-navy">{{ item.title }}</h3>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
  <NotFoundPage v-else />
</template>
