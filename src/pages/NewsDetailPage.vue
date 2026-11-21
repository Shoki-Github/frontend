<script setup>
import { onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import PageBanner from '../components/PageBanner.vue'
import { apiRequest } from '../services/api'
import { setPageMetadata } from '../services/seo'

const route = useRoute()
const article = ref(null)
const loading = ref(true)

async function loadArticle() {
  loading.value = true
  article.value = null

  try {
    const response = await apiRequest(`/news/${encodeURIComponent(route.params.slug)}`)
    article.value = response.data
    setPageMetadata({
      title: `${article.value.title} | CLM Consultants Limited`,
      description: article.value.excerpt || `Read ${article.value.title} from CLM Consultants Limited.`,
      path: route.path,
    })
  } catch (error) {
    console.error('Unable to load the requested insight.', error)
  } finally {
    loading.value = false
  }
}

onMounted(loadArticle)
watch(() => route.params.slug, loadArticle)
</script>

<template>
  <div>
    <PageBanner title="Insights" breadcrumb="Insights" />
    <article class="bg-white px-5 py-12 md:py-16 lg:px-8">
      <div class="mx-auto max-w-3xl">
        <RouterLink class="text-sm font-bold text-brand hover:text-brand-dark" to="/insights">← All insights</RouterLink>
        <p v-if="loading" class="mt-8 text-base text-muted" role="status">Loading insight…</p>
        <div v-else-if="article">
          <p class="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-muted">
            <span class="rounded-full bg-[#e6f3f1] px-3 py-1 font-semibold text-navy">{{ article.category }}</span>
            <time v-if="article.published_at" :datetime="article.published_at">{{ new Date(article.published_at).toLocaleDateString('en-GB') }}</time>
            <span>{{ article.author }} · {{ article.reading_time }} min read</span>
          </p>
          <h2 class="mt-5 text-3xl font-bold leading-tight tracking-tight text-navy md:text-4xl">{{ article.title }}</h2>
          <p v-if="article.excerpt" class="mt-5 border-b border-[#e5dfcd] pb-7 text-lg leading-8 text-muted">{{ article.excerpt }}</p>
          <div class="mt-8 whitespace-pre-line text-base leading-7 text-muted">{{ article.body }}</div>
        </div>
        <div v-else class="mt-8">
          <h2 class="text-2xl font-bold text-navy">This insight is not available.</h2>
          <p class="mt-3 text-base leading-7 text-muted">It may have been unpublished or moved.</p>
        </div>
      </div>
    </article>
  </div>
</template>
