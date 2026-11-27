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
// free licence), re-encoded to small WebM files:
//   hero-dar-aerial.webm         1280x720, ~3.7 MB (laptops/desktops)
//   hero-dar-aerial-mobile.webm   854x480, ~1.9 MB (phones)
//   hero-dar-aerial.mp4          original 16 MB, only for desktop browsers without WebM
// Phones without WebM, data-saver and reduced-motion keep the still image.
const heroVideoSrc = ref('')

// Seamless loop: two copies of the clip take turns. Shortly before the
// playing copy ends, the other starts from the beginning and cross-fades
// in over it, so the restart never shows a hard cut.
const CROSSFADE_SECONDS = 1.5
const CLIP_SECONDS = 24.1 // fallback when the file does not report its length
const heroVideos = ref([])
const activeHeroVideo = ref(0)
let crossfading = false

function heroTimeUpdate(index) {
  if (index !== activeHeroVideo.value || crossfading) return
  const current = heroVideos.value[index]
  const next = heroVideos.value[1 - index]
  if (!current || !next) return
  const length = Number.isFinite(current.duration) ? current.duration : CLIP_SECONDS
  if (current.currentTime < length - CROSSFADE_SECONDS && !current.ended) return
  crossfading = true
  next.currentTime = 0
  next.play().catch(() => {})
  activeHeroVideo.value = 1 - index
  setTimeout(() => {
    current.pause()
    current.currentTime = 0
    crossfading = false
  }, CROSSFADE_SECONDS * 1000 + 200)
}

onMounted(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const saveData = navigator.connection?.saveData === true
  if (reducedMotion || saveData) return
  const wide = window.matchMedia('(min-width: 768px)').matches
  const webm = document.createElement('video').canPlayType('video/webm; codecs="vp9"') !== ''
  if (wide) heroVideoSrc.value = webm ? '/hero-dar-aerial.webm' : '/hero-dar-aerial.mp4'
  else if (webm) heroVideoSrc.value = '/hero-dar-aerial-mobile.webm'
})
</script>

<template>
  <div>
    <!-- Hero: still from the Dar es Salaam clip, then the same clip in motion. -->
    <section class="relative isolate min-h-[78.3vh] overflow-hidden bg-navy" aria-hidden="true">
      <img
        class="absolute inset-0 -z-20 h-full w-full object-cover"
        src="/hero-dar-aerial-poster.jpg"
        alt=""
        fetchpriority="high"
      />
      <template v-if="heroVideoSrc">
        <video
          v-for="index in [0, 1]"
          :key="index"
          :ref="(el) => { heroVideos[index] = el }"
          class="absolute inset-0 -z-10 h-full w-full object-cover transition-opacity ease-in-out"
          :class="activeHeroVideo === index ? 'opacity-100' : 'opacity-0'"
          :style="{ transitionDuration: `${CROSSFADE_SECONDS}s` }"
          :src="heroVideoSrc"
          :poster="index === 0 ? '/hero-dar-aerial-poster.jpg' : undefined"
          :autoplay="index === 0"
          muted
          playsinline
          preload="auto"
          @timeupdate="heroTimeUpdate(index)"
          @ended="heroTimeUpdate(index)"
        ></video>
      </template>
    </section>

    <section class="bg-paper px-5 py-8 md:py-10 lg:px-8">
      <div class="mx-auto max-w-7xl text-center">
        <!-- One line from tablet width up; wraps only on phones, where one line would be too small to read. -->
        <h1 class="text-[clamp(1.6rem,5vw,2.5rem)] font-bold leading-tight tracking-tight text-navy md:whitespace-nowrap md:text-[clamp(1.25rem,2.9vw,2.5rem)]">{{ homeContent.title }}</h1>
      </div>
      <div class="mx-auto mt-4 max-w-4xl text-center">
        <p class="mx-auto max-w-3xl text-base leading-7 text-black md:text-lg md:leading-8">{{ homeContent.intro }}</p>
        <div class="mt-3 flex flex-wrap justify-center gap-3">
          <a class="inline-flex min-h-12 items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-dark" href="#signature-offers">See Our Signature Offers</a>
          <RouterLink class="inline-flex min-h-12 items-center justify-center rounded-md border border-black px-6 py-3 text-sm font-bold text-black transition hover:bg-black hover:text-white" to="/contact">Discuss Your Needs</RouterLink>
        </div>
        <div class="mt-8">
          <p class="text-sm font-bold uppercase tracking-[0.12em] text-brand">Where are you right now?</p>
          <div class="mt-3 grid gap-3 text-left sm:grid-cols-3">
            <a
              v-for="moment in homeContent.buyerMoments"
              :key="moment.question"
              class="group flex items-start justify-between gap-3 rounded-lg border border-[#e5dfcd] bg-white p-4 text-base font-semibold leading-6 text-navy transition hover:border-brand hover:text-brand"
              :href="`#${moment.offerId}`"
            >
              {{ moment.question }}
              <span class="text-brand" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section id="signature-offers" class="scroll-mt-20 bg-white px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div class="max-w-3xl">
          <p class="text-sm font-bold uppercase tracking-[0.12em] text-brand">Signature offers</p>
          <h2 class="mt-3 text-3xl font-bold tracking-tight text-navy md:text-4xl">Two things we do best</h2>
          <p class="mt-3 text-base leading-7 text-muted">Each offer is built around a clear result for your organisation, a tested way of getting there, and measures that show it worked.</p>
        </div>

        <div class="mt-8 grid gap-6 lg:grid-cols-2">
          <article
            v-for="offer in homeContent.signatureOffers"
            :id="offer.id"
            :key="offer.id"
            class="flex scroll-mt-24 flex-col rounded-2xl border border-[#e5dfcd] bg-paper p-6 shadow-[0_12px_36px_rgba(27,42,74,0.06)] md:p-8"
          >
            <p class="text-xs font-bold uppercase tracking-[0.12em] text-[#9a7a12]">{{ offer.label }}</p>
            <h3 class="mt-2 text-2xl font-bold tracking-tight text-navy md:text-3xl">{{ offer.title }}</h3>
            <p class="mt-4 text-lg font-semibold leading-8 text-navy">{{ offer.outcome }}</p>
            <p class="mt-3 text-base leading-7 text-muted"><span class="font-bold text-navy">For: </span>{{ offer.forWhom }}</p>

            <h4 class="mt-6 text-sm font-bold uppercase tracking-wide text-brand">How it works</h4>
            <ol class="mt-3 space-y-3">
              <li v-for="(step, i) in offer.steps" :key="step.name" class="flex gap-3">
                <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">{{ i + 1 }}</span>
                <p class="text-base leading-7 text-muted">
                  <span class="font-bold text-navy">{{ step.name }}</span>
                  <span class="text-sm text-muted"> · {{ step.timing }}</span><br />
                  {{ step.detail }}
                </p>
              </li>
            </ol>

            <h4 class="mt-6 text-sm font-bold uppercase tracking-wide text-brand">What we measure with you</h4>
            <ul class="mt-3 space-y-2">
              <li v-for="result in offer.results" :key="result" class="flex gap-2 text-base leading-7 text-muted">
                <span class="mt-0.5 font-bold text-brand" aria-hidden="true">✓</span>{{ result }}
              </li>
            </ul>

            <div class="mt-auto flex flex-wrap gap-3 pt-8">
              <RouterLink class="inline-flex min-h-12 items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-dark" :to="{ path: '/contact', query: { topic: offer.topic } }">
                Discuss this offer
              </RouterLink>
              <RouterLink class="inline-flex min-h-12 items-center justify-center rounded-md border border-brand px-6 py-3 text-sm font-bold text-brand transition hover:bg-brand hover:text-white" :to="offer.learnMore">
                Learn more
              </RouterLink>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="bg-navy px-5 py-12 text-white md:py-14 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <p class="text-sm font-bold uppercase tracking-[0.12em] text-[#c9a227]">How we work</p>
        <h2 class="mt-3 text-2xl font-bold tracking-tight md:text-3xl">Our promises on every assignment</h2>
        <div class="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article v-for="promise in homeContent.promises" :key="promise.title" class="rounded-xl bg-white/10 p-5">
            <h3 class="text-lg font-bold leading-snug">{{ promise.title }}</h3>
            <p class="mt-2 text-base leading-7 text-slate-200">{{ promise.detail }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="bg-paper px-5 py-10 md:py-12 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <h2 class="text-xl font-bold tracking-tight text-navy md:text-2xl">Other ways we help</h2>
        <div class="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <RouterLink
            v-for="service in homeContent.serviceCategories"
            :key="service.title"
            class="group rounded-lg border border-[#e5dfcd] bg-white p-4 transition hover:border-brand"
            :to="service.href"
          >
            <h3 class="text-base font-bold text-navy group-hover:text-brand">{{ service.title }} <span aria-hidden="true">→</span></h3>
            <p class="mt-1 text-sm leading-6 text-muted">{{ service.summary }}</p>
          </RouterLink>
        </div>
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

