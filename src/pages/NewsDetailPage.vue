<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import DataBriefChart from '../components/DataBriefChart.vue'
import PageBanner from '../components/PageBanner.vue'
import { insights } from '../data/insights'

const route = useRoute()
const article = computed(() => insights.find((item) => item.slug === route.params.slug) || null)
</script>

<template>
  <div>
    <PageBanner title="Insights" breadcrumb="Insights" />
    <article class="bg-white px-5 py-12 md:py-16 lg:px-8">
      <div class="mx-auto max-w-3xl">
        <RouterLink class="text-sm font-bold text-brand hover:text-brand-dark" to="/insights">← All insights</RouterLink>
        <div v-if="article">
          <p class="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-muted">
            <span class="rounded-full bg-[#e6f3f1] px-3 py-1 font-semibold text-navy">{{ article.category }}</span>
            <time :datetime="article.published_at">{{ new Date(article.published_at).toLocaleDateString('en-GB') }}</time>
            <span>{{ article.author }} · {{ article.reading_time }} min read</span>
          </p>
          <h2 class="mt-5 text-3xl font-bold leading-tight tracking-tight text-navy md:text-4xl">{{ article.title }}</h2>
          <p class="mt-5 border-b border-[#e5dfcd] pb-7 text-lg leading-8 text-muted">{{ article.excerpt }}</p>
          <DataBriefChart v-if="article.chart" :chart="article.chart" />
          <div class="mt-8 whitespace-pre-line text-base leading-7 text-muted">{{ article.body }}</div>
          <div class="mt-10 rounded-xl bg-[#e6f3f1] p-6">
            <p class="text-base font-semibold text-navy">Want to discuss how this applies to your organisation?</p>
            <RouterLink class="mt-4 inline-flex min-h-11 items-center justify-center rounded-md bg-brand px-5 text-sm font-bold text-white transition hover:bg-brand-dark" to="/contact">Talk to CLM</RouterLink>
          </div>
        </div>
        <div v-else class="mt-8">
          <h2 class="text-2xl font-bold text-navy">This insight is not available.</h2>
          <p class="mt-3 text-base leading-7 text-muted">It may have been unpublished or moved.</p>
        </div>
      </div>
    </article>
  </div>
</template>
