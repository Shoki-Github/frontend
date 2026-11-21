<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import NewsletterSignup from '../components/NewsletterSignup.vue'
import SocialProof from '../components/SocialProof.vue'
import { publishedCaseStudies } from '../data/caseStudies'
import { homeContent } from '../data/siteContent'
import { toolkitGuides } from '../data/toolkitGuides'
import { apiRequest } from '../services/api'

const latestInsights = ref([])

onMounted(async () => {
  try {
    const response = await apiRequest('/news?per_page=3')
    const articles = response.data?.data
    if (!Array.isArray(articles)) throw new TypeError('Expected a paginated insights response.')
    const datedInsights = articles.filter((article) => article.published_at)
    if (datedInsights.length >= 3) latestInsights.value = datedInsights.slice(0, 3)
  } catch (error) {
    console.error('Unable to load latest insights.', error)
  }
})
</script>

<template>
  <div>
    <section class="bg-paper">
      <div class="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
        <div>
          <p class="text-sm font-bold uppercase tracking-[0.12em] text-brand">CLM Consultants Limited · Dar es Salaam, Tanzania</p>
          <h1 class="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-navy sm:text-5xl md:text-6xl">{{ homeContent.title }}</h1>
          <p class="mt-6 max-w-2xl text-base leading-7 text-muted md:text-lg md:leading-8">{{ homeContent.intro }}</p>
          <div class="mt-8 flex flex-wrap gap-3">
            <RouterLink class="inline-flex min-h-12 items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-dark" to="/services">Explore Our Services</RouterLink>
            <RouterLink class="inline-flex min-h-12 items-center justify-center rounded-md border border-navy px-6 py-3 text-sm font-bold text-navy transition hover:bg-navy hover:text-white" to="/contact">Discuss Your Needs</RouterLink>
          </div>
          <div class="mt-4 flex flex-wrap gap-3" aria-label="Explore CLM work and learning">
            <RouterLink class="inline-flex min-h-11 items-center justify-center rounded-md border border-brand px-5 py-2.5 text-sm font-bold text-brand transition hover:bg-brand hover:text-white" to="/case-studies">
              CLM Projects
            </RouterLink>
            <RouterLink class="inline-flex min-h-11 items-center justify-center rounded-md border border-brand px-5 py-2.5 text-sm font-bold text-brand transition hover:bg-brand hover:text-white" to="/digital-products">
              Digital Products
            </RouterLink>
            <RouterLink class="inline-flex min-h-11 items-center justify-center rounded-md border border-brand px-5 py-2.5 text-sm font-bold text-brand transition hover:bg-brand hover:text-white" to="/learn">
              Online Courses
            </RouterLink>
          </div>
        </div>

        <div class="relative mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-[#e5dfcd] bg-navy shadow-[0_18px_48px_rgba(27,42,74,0.12)]">
          <img class="h-[22rem] w-full object-cover" src="/evaluation.jpg" alt="Professionals reviewing evidence and performance data together" />
          <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/95 via-navy/70 to-transparent px-6 pb-6 pt-16">
            <p class="text-xs font-bold uppercase tracking-[0.12em] text-[#9fe0d5]">Evidence in action</p>
            <p class="mt-2 max-w-sm text-xl font-bold leading-snug text-white">Helping teams move from findings to decisions, learning and follow-up.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-navy px-5 py-8 text-white lg:px-8">
      <div class="mx-auto grid max-w-7xl grid-cols-2 gap-6 md:grid-cols-4">
        <div>
          <p class="text-3xl font-bold md:text-4xl">30+</p>
          <p class="mt-2 text-sm leading-5 text-slate-200">years of MEL experience</p>
        </div>
        <div>
          <p class="text-3xl font-bold md:text-4xl">660</p>
          <p class="mt-2 text-sm leading-5 text-slate-200">households in a livelihoods study</p>
        </div>
        <div>
          <p class="text-3xl font-bold md:text-4xl">2020</p>
          <p class="mt-2 text-sm leading-5 text-slate-200">CLM established in Tanzania</p>
        </div>
        <div>
          <p class="text-3xl font-bold md:text-4xl">EN / SW</p>
          <p class="mt-2 text-sm leading-5 text-slate-200">English and Kiswahili delivery</p>
        </div>
      </div>
    </section>

    <section class="bg-paper px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div class="max-w-3xl">
          <p class="text-sm font-bold uppercase tracking-[0.12em] text-brand">Services</p>
          <h2 class="mt-3 text-3xl font-bold tracking-tight text-navy md:text-4xl">What we do</h2>
        </div>
        <div class="mt-7 grid gap-4 md:grid-cols-2">
          <RouterLink
            v-for="service in homeContent.serviceCategories"
            :key="service.title"
            class="group rounded-xl border border-[#e5dfcd] bg-white p-6 transition hover:border-brand hover:shadow-[0_10px_28px_rgba(27,42,74,0.08)]"
            :to="service.href"
          >
            <h3 class="text-xl font-bold text-navy group-hover:text-brand">{{ service.title }}</h3>
            <p class="mt-3 text-base leading-7 text-muted">{{ service.summary }}</p>
            <span class="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand">Explore service <span aria-hidden="true">→</span></span>
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="bg-[#e6f3f1] px-5 py-12 text-navy md:py-14 lg:px-8">
      <div class="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div class="max-w-3xl">
          <p class="text-sm font-bold uppercase tracking-[0.12em] text-brand">Featured offer</p>
          <h2 class="mt-3 text-2xl font-bold leading-tight md:text-3xl">{{ homeContent.featuredOffer.title }}</h2>
          <p class="mt-3 text-base leading-7 text-muted">{{ homeContent.featuredOffer.description }}</p>
        </div>
        <RouterLink class="inline-flex min-h-12 shrink-0 items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-dark" :to="homeContent.featuredOffer.href">
          Explore the Pilot
        </RouterLink>
      </div>
    </section>

    <section class="bg-white px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <h2 class="text-3xl font-bold tracking-tight text-navy md:text-4xl">Who we work with</h2>
        <div class="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <article v-for="audience in homeContent.audiences" :key="audience.title" class="rounded-xl border border-[#e5dfcd] bg-white p-5">
            <h3 class="text-lg font-bold leading-snug text-navy">{{ audience.title }}</h3>
            <p class="mt-3 text-base leading-7 text-muted">{{ audience.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="bg-paper px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-[1fr_auto] md:gap-14">
        <div class="max-w-3xl">
          <p class="text-sm font-bold uppercase tracking-[0.12em] text-brand">Pantaleon Shoki’s individual consultancy · {{ homeContent.experienceHighlight.client }} · {{ homeContent.experienceHighlight.period }}</p>
          <h2 class="mt-3 text-2xl font-bold tracking-tight text-navy md:text-3xl">{{ homeContent.experienceHighlight.title }}</h2>
          <p class="mt-4 text-base leading-7 text-muted">{{ homeContent.experienceHighlight.description }}</p>
        </div>
        <div class="rounded-xl border border-[#e5dfcd] bg-white px-8 py-6 text-center shadow-[0_10px_28px_rgba(27,42,74,0.06)]">
          <p class="text-4xl font-bold tracking-tight text-brand">{{ homeContent.experienceHighlight.households }}</p>
          <p class="mt-1 text-sm font-semibold text-muted">households in the survey</p>
        </div>
      </div>
    </section>

    <section class="bg-white px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <h2 class="text-3xl font-bold tracking-tight text-navy md:text-4xl">Why CLM</h2>
        <div class="mt-7 grid gap-4 md:grid-cols-3">
          <article v-for="reason in homeContent.reasons" :key="reason.title" class="border-l-4 border-[#c9a227] bg-paper p-5">
            <h3 class="text-lg font-bold leading-snug text-navy">{{ reason.title }}</h3>
            <p class="mt-3 text-base leading-7 text-muted">{{ reason.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <SocialProof />

    <section v-if="publishedCaseStudies.length >= 2" class="bg-paper px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <h2 class="text-3xl font-bold tracking-tight text-navy md:text-4xl">Selected work</h2>
        <div class="mt-7 grid gap-4 md:grid-cols-3">
          <article v-for="study in publishedCaseStudies.slice(0, 3)" :key="study.slug" class="rounded-xl border border-[#e5dfcd] bg-white p-5">
            <p class="text-sm font-semibold text-muted">{{ study.clientType }}</p>
            <h3 class="mt-2 text-lg font-bold text-navy">{{ study.title }}</h3>
            <p class="mt-3 text-base leading-7 text-muted">{{ study.result }}</p>
            <RouterLink class="mt-4 inline-flex text-sm font-bold text-brand" :to="{ name: 'case-study-detail', params: { slug: study.slug } }">Read case study <span class="ml-2" aria-hidden="true">→</span></RouterLink>
          </article>
        </div>
      </div>
    </section>

    <section v-if="latestInsights.length >= 3" class="bg-paper px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <h2 class="text-3xl font-bold tracking-tight text-navy md:text-4xl">Latest insights</h2>
          <RouterLink class="text-sm font-bold text-brand underline underline-offset-2" to="/insights">All insights</RouterLink>
        </div>
        <div class="mt-7 grid gap-4 md:grid-cols-3">
          <article v-for="article in latestInsights" :key="article.slug" class="rounded-xl border border-[#e5dfcd] bg-white p-5">
            <time class="text-sm font-semibold text-muted" :datetime="article.published_at">{{ new Date(article.published_at).toLocaleDateString('en-GB') }}</time>
            <h3 class="mt-3 text-lg font-bold leading-snug text-navy">
              <RouterLink :to="{ name: 'insight-detail', params: { slug: article.slug } }">{{ article.title }}</RouterLink>
            </h3>
            <p class="mt-3 text-base leading-7 text-muted">{{ article.excerpt }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="bg-white px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div class="max-w-3xl">
            <p class="text-sm font-bold uppercase tracking-wide text-brand">Free resources</p>
            <h2 class="mt-3 text-3xl font-bold tracking-tight text-navy md:text-4xl">From the MEL Toolkit</h2>
            <p class="mt-3 text-base leading-7 text-muted">Short, practical guides your team can use today.</p>
          </div>
          <RouterLink class="text-sm font-bold text-brand underline underline-offset-2" to="/toolkit">All guides</RouterLink>
        </div>
        <div class="mt-7 grid gap-4 md:grid-cols-3">
          <RouterLink v-for="guide in toolkitGuides.slice(0, 3)" :key="guide.slug" class="rounded-xl border border-[#e5dfcd] bg-paper p-5 transition hover:border-brand" :to="{ name: 'toolkit-guide', params: { slug: guide.slug } }">
            <p class="text-xs font-bold uppercase tracking-wide text-brand">{{ guide.category }} · {{ guide.readingTime }}</p>
            <h3 class="mt-2 text-lg font-bold leading-snug text-navy">{{ guide.title }}</h3>
            <p class="mt-3 text-base leading-7 text-muted">{{ guide.summary }}</p>
          </RouterLink>
        </div>
      </div>
    </section>

    <NewsletterSignup source="home" />

    <section class="bg-[#e6f3f1] px-5 py-12 text-navy md:py-16 lg:px-8">
      <div class="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div class="max-w-3xl">
          <h2 class="text-2xl font-bold leading-tight md:text-3xl">{{ homeContent.callToAction.title }}</h2>
          <p class="mt-3 text-base leading-7 text-muted">{{ homeContent.callToAction.description }}</p>
        </div>
        <RouterLink class="inline-flex min-h-12 shrink-0 items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-dark" to="/contact">Contact CLM Consultants Limited</RouterLink>
      </div>
    </section>
  </div>
</template>
