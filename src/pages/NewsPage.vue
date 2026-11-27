<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import NewsletterSignup from '../components/NewsletterSignup.vue'
import PageBanner from '../components/PageBanner.vue'
import { apiRequest } from '../services/api'

const articles = ref([])
const loading = ref(true)
const failure = ref(false)

onMounted(async () => {
  try {
    const response = await apiRequest('/news')
    const results = response.data?.data
    if (!Array.isArray(results)) throw new TypeError('Expected a paginated insights response.')
    articles.value = results
  } catch (error) {
    // No insights server is connected yet; show the empty state, not an error.
    console.error('Unable to load insights.', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <PageBanner title="Insights" breadcrumb="Insights" subtitle="Practical thinking on evidence, MEL and Tanzania’s development." large />
    <section class="bg-white px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <p v-if="loading" class="text-base text-muted" role="status">Loading insights…</p>
        <p v-else-if="failure" class="text-base text-muted" role="alert">We couldn’t load insights right now. Please try again later.</p>
        <div v-else-if="articles.length" class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <article v-for="article in articles" :key="article.slug" class="rounded-xl border border-[#e5dfcd] bg-white p-6">
            <p class="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-muted">
              <span class="rounded-full bg-[#e6f3f1] px-3 py-1 font-semibold text-navy">{{ article.category }}</span>
              <time v-if="article.published_at" :datetime="article.published_at">{{ new Date(article.published_at).toLocaleDateString('en-GB') }}</time>
            </p>
            <h2 class="mt-4 text-xl font-bold leading-snug text-navy">
              <RouterLink class="hover:text-brand" :to="{ name: 'insight-detail', params: { slug: article.slug } }">{{ article.title }}</RouterLink>
            </h2>
            <p v-if="article.excerpt" class="mt-3 text-base leading-7 text-muted">{{ article.excerpt }}</p>
            <p class="mt-5 text-sm text-muted">{{ article.author }} · {{ article.reading_time }} min read</p>
            <RouterLink class="mt-4 inline-flex text-sm font-bold text-brand hover:text-brand-dark" :to="{ name: 'insight-detail', params: { slug: article.slug } }">Read insight <span class="ml-2" aria-hidden="true">→</span></RouterLink>
          </article>
        </div>
        <p v-else class="max-w-3xl text-base leading-7 text-muted">No insights have been published yet. In the meantime, our free <RouterLink class="font-semibold text-brand underline underline-offset-2" to="/toolkit">MEL Toolkit</RouterLink> has practical guides you can use today.</p>
      </div>
    </section>
    <NewsletterSignup source="insights" />
  </div>
</template>
