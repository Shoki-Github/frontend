<script setup>
import { RouterLink } from 'vue-router'
import PageBanner from '../components/PageBanner.vue'
import { publishedLearnProducts } from '../data/learnProducts'
import { workshopFormats } from '../data/siteContent'
</script>

<template>
  <div>
    <PageBanner title="Training & Courses" breadcrumb="Training" subtitle="Practical MEL, data and AI skills, from foundations to advanced systems, in English or Kiswahili." large />

    <!-- Online course link parked until the course lives on this site (src/data/onlineCourse.js). -->
    <section v-if="publishedLearnProducts.length" class="bg-white px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div class="max-w-3xl">
          <h2 class="text-3xl font-bold tracking-tight text-navy md:text-4xl">Choose the level that fits your team.</h2>
          <p class="mt-4 text-base leading-7 text-muted">Each course can run as an open session or be delivered in-house for one organisation.</p>
        </div>

        <div class="mt-9 grid gap-5 md:grid-cols-2">
          <article v-for="product in publishedLearnProducts" :id="product.slug" :key="product.slug" class="flex flex-col rounded-xl border border-[#e5dfcd] bg-white p-6 md:p-7">
            <p class="w-fit rounded-full bg-[#e6f3f1] px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-dark">{{ product.level }}</p>
            <h3 class="mt-4 text-xl font-bold text-navy md:text-2xl">{{ product.title }}</h3>
            <p class="mt-3 text-base leading-7 text-muted">{{ product.description }}</p>
            <p class="mt-4 text-sm leading-6 text-muted"><span class="font-bold text-navy">For:</span> {{ product.audience }}</p>
            <h4 class="mt-5 text-sm font-bold text-navy">You will be able to</h4>
            <ul class="mt-2 space-y-2">
              <li v-for="outcome in product.outcomes" :key="outcome" class="flex gap-3 text-base leading-7 text-muted">
                <span class="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden="true"></span>
                <span>{{ outcome }}</span>
              </li>
            </ul>
            <dl class="mt-6 grid grid-cols-3 gap-3 border-t border-[#e5dfcd] pt-5 text-sm">
              <div>
                <dt class="font-bold text-navy">Format</dt>
                <dd class="mt-1 text-muted">{{ product.format }}</dd>
              </div>
              <div>
                <dt class="font-bold text-navy">Duration</dt>
                <dd class="mt-1 text-muted">{{ product.duration }}</dd>
              </div>
              <div>
                <dt class="font-bold text-navy">Language</dt>
                <dd class="mt-1 text-muted">{{ product.language }}</dd>
              </div>
            </dl>
            <RouterLink
              class="mt-6 inline-flex min-h-11 w-fit items-center justify-center rounded-md bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-dark"
              :to="{ path: '/contact', query: { service: 'Training & Capacity Building', course: product.title } }"
            >
              Ask about this course
            </RouterLink>
          </article>
        </div>
      </div>
    </section>

    <section v-else class="bg-white px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto max-w-3xl rounded-xl border border-[#e5dfcd] bg-paper p-6 md:p-8">
        <h2 class="text-2xl font-bold text-navy">Courses are not currently open for enrolment.</h2>
        <p class="mt-3 text-base leading-7 text-muted">For practical MEL, data and evaluation training, contact our team.</p>
        <RouterLink class="mt-6 inline-flex min-h-12 items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-bold text-white" to="/contact">Contact CLM Consultants Limited</RouterLink>
      </div>
    </section>

    <section class="bg-paper px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <h2 class="text-3xl font-bold tracking-tight text-navy md:text-4xl">Workshop formats</h2>
        <p class="mt-4 max-w-3xl text-base leading-7 text-muted">Any topic can be delivered in the format that suits your team’s time and goals.</p>
        <ol class="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <li v-for="(format, index) in workshopFormats" :key="format.title" class="rounded-xl border border-[#e5dfcd] bg-white p-5">
            <p class="text-sm font-bold text-brand">{{ String(index + 1).padStart(2, '0') }}</p>
            <h3 class="mt-2 text-lg font-bold text-navy">{{ format.title }}</h3>
            <p class="mt-2 text-base leading-7 text-muted">{{ format.description }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="bg-[#e6f3f1] px-5 py-12 text-navy md:py-14 lg:px-8">
      <div class="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <div>
          <h2 class="text-2xl font-bold md:text-3xl">Want something built around your institution?</h2>
          <p class="mt-3 max-w-2xl text-base leading-7 text-muted">We start with a short training needs assessment and design the programme around your systems and data.</p>
        </div>
        <RouterLink class="inline-flex min-h-12 shrink-0 items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-dark" :to="{ path: '/contact', query: { service: 'Training & Capacity Building' } }">Request training</RouterLink>
      </div>
    </section>
  </div>
</template>
