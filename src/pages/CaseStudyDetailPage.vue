<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import PageBanner from '../components/PageBanner.vue'
import NotFoundPage from './NotFoundPage.vue'
import { publishedCaseStudies } from '../data/caseStudies'

const route = useRoute()
const study = computed(() => publishedCaseStudies.find((item) => item.slug === route.params.slug))
</script>

<template>
  <div v-if="study">
    <PageBanner :title="study.title" :breadcrumb="study.title" large />
    <article class="bg-white px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-sm font-semibold text-muted">{{ study.sector }} · {{ study.year }}</p>
        <p class="mt-6 text-lg leading-8 text-muted">{{ study.challenge }}</p>
        <h2 class="mt-9 text-2xl font-bold text-navy">What we did</h2>
        <ul class="mt-4 list-disc space-y-2 pl-6 text-base leading-7 text-muted">
          <li v-for="item in study.activities" :key="item">{{ item }}</li>
        </ul>
        <h2 class="mt-9 text-2xl font-bold text-navy">Result</h2>
        <p class="mt-4 text-base leading-7 text-muted">{{ study.result }}</p>
        <blockquote v-if="study.quote" class="mt-8 border-l-4 border-[#c9a227] pl-5 text-lg italic leading-8 text-navy">{{ study.quote }}</blockquote>
        <RouterLink class="mt-9 inline-flex text-sm font-bold text-brand" to="/case-studies">← All case studies</RouterLink>
      </div>
    </article>
  </div>
  <NotFoundPage v-else />
</template>
