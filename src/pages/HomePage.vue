<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import NewsletterSignup from '../components/NewsletterSignup.vue'
import SocialProof from '../components/SocialProof.vue'
import { publishedCaseStudies } from '../data/caseStudies'
import { insights } from '../data/insights'
import { homeContent } from '../data/siteContent'
import { toolkitGuides } from '../data/toolkitGuides'

const latestInsights = [...insights]
  .sort((a, b) => b.published_at.localeCompare(a.published_at))
  .slice(0, 3)

// Hero video: real drone footage of Dar es Salaam (Pexels video 32555370,
// free licence). Loaded only on wider screens without data-saver or
// reduced-motion; phones keep the still image so the page stays light.
const showHeroVideo = ref(false)

onMounted(() => {
  const wide = window.matchMedia('(min-width: 768px)').matches
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const saveData = navigator.connection?.saveData === true
  showHeroVideo.value = wide && !reducedMotion && !saveData
})
</script>

<template>
  <div>
    <!-- Hero: still from the Dar es Salaam clip, then the same clip in motion on wider screens. -->
    <section class="relative isolate min-h-[78.3vh] overflow-hidden bg-navy" aria-hidden="true">
      <img
        class="absolute inset-0 -z-20 h-full w-full object-cover"
        src="/hero-dar-aerial-poster.jpg"
        alt=""
        fetchpriority="high"
      />
      <video
        v-if="showHeroVideo"
        class="absolute inset-0 -z-10 h-full w-full object-cover"
        src="/hero-dar-aerial.mp4"
        poster="/hero-dar-aerial-poster.jpg"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
      ></video>
    </section>

    <section class="bg-paper px-5 py-8 md:py-10 lg:px-8">
      <div class="mx-auto max-w-7xl text-center">
        <!-- One line from tablet width up; wraps only on phones, where one line would be too small to read. -->
        <h1 class="text-[clamp(1.6rem,5vw,2.5rem)] font-bold leading-tight tracking-tight text-navy md:whitespace-nowrap md:text-[clamp(1.25rem,2.9vw,2.5rem)]">{{ homeContent.title }}</h1>
      </div>
      <div class="mx-auto mt-4 max-w-4xl text-center">
        <p class="mx-auto max-w-3xl text-base leading-7 text-black md:text-lg md:leading-8">{{ homeContent.intro }}</p>
        <div class="mt-3 flex flex-wrap justify-center gap-3">
          <RouterLink class="inline-flex min-h-12 items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-dark" to="/services">Explore Our Services</RouterLink>
          <RouterLink class="inline-flex min-h-12 items-center justify-center rounded-md border border-black px-6 py-3 text-sm font-bold text-black transition hover:bg-black hover:text-white" to="/contact">Discuss Your Needs</RouterLink>
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

    <section class="bg-paper px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p class="text-sm font-bold uppercase tracking-wide text-brand">Insights &amp; Toolkit</p>
            <h2 class="mt-3 text-3xl font-bold tracking-tight text-navy md:text-4xl">Ideas and practical resources</h2>
            <p class="mt-3 text-base leading-7 text-muted">Insights from our work alongside practical guides for your team.</p>
          </div>
          <div class="flex gap-5">
            <RouterLink v-if="latestInsights.length" class="text-sm font-bold text-brand underline underline-offset-2" to="/insights">All insights</RouterLink>
            <RouterLink class="text-sm font-bold text-brand underline underline-offset-2" to="/toolkit">All guides</RouterLink>
          </div>
        </div>
        <div class="mt-7 grid gap-4 md:grid-cols-3">
          <article v-for="article in latestInsights" :key="article.slug" class="rounded-xl border border-[#e5dfcd] bg-white p-5">
            <p class="text-xs font-bold uppercase tracking-wide text-brand">Insight · <time :datetime="article.published_at">{{ new Date(article.published_at).toLocaleDateString('en-GB') }}</time></p>
            <h3 class="mt-3 text-lg font-bold leading-snug text-navy">
              <RouterLink :to="{ name: 'insight-detail', params: { slug: article.slug } }">{{ article.title }}</RouterLink>
            </h3>
            <p class="mt-3 text-base leading-7 text-muted">{{ article.excerpt }}</p>
          </article>
          <RouterLink v-for="guide in toolkitGuides.slice(0, 3)" :key="guide.slug" class="rounded-xl border border-[#e5dfcd] bg-paper p-5 transition hover:border-brand" :to="{ name: 'toolkit-guide', params: { slug: guide.slug } }">
            <p class="text-xs font-bold uppercase tracking-wide text-brand">Toolkit · {{ guide.category }} · {{ guide.readingTime }}</p>
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

