<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router'
import MethodsAndSectors from '../components/MethodsAndSectors.vue'
import PageBanner from '../components/PageBanner.vue'
import ServiceFaq from '../components/ServiceFaq.vue'
import { serviceFaqs, specialistOffers } from '../data/siteContent'
import { serviceLines } from '../data/serviceLines'

const route = useRoute()

onMounted(() => {
  if (route.hash === '#service-faq') {
    document.getElementById('service-faq')?.scrollIntoView()
  }
})
</script>

<template>
  <div>
    <PageBanner title="Services" breadcrumb="Services" large />

    <section class="bg-white px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <h2 class="max-w-3xl text-3xl font-bold tracking-tight text-navy md:text-4xl">Practical expertise, built around your decisions.</h2>
        <div class="mt-8 grid gap-5 md:grid-cols-2">
          <article v-for="(service, index) in serviceLines" :key="service.slug" class="rounded-xl border border-[#e5dfcd] bg-white p-6">
            <p class="text-sm font-bold text-brand">{{ String(index + 1).padStart(2, '0') }}</p>
            <h3 class="mt-3 text-xl font-bold text-navy">{{ service.title }}</h3>
            <p class="mt-3 text-base leading-7 text-muted">{{ service.summary }}</p>
            <RouterLink class="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand hover:text-brand-dark" :to="{ name: 'service-detail', params: { slug: service.slug } }">
              Explore this service <span aria-hidden="true">→</span>
            </RouterLink>
          </article>
        </div>
      </div>
    </section>

    <section class="bg-paper px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <h2 class="max-w-3xl text-3xl font-bold tracking-tight text-navy md:text-4xl">Specialist offers</h2>
        <p class="mt-4 max-w-3xl text-base leading-7 text-muted">Focused assignments you can commission on their own or as part of a wider engagement.</p>
        <div class="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <RouterLink v-for="offer in specialistOffers" :key="offer.title" class="flex flex-col rounded-xl border border-[#e5dfcd] bg-white p-5 transition hover:border-brand" :to="offer.href">
            <h3 class="text-lg font-bold leading-snug text-navy">{{ offer.title }}</h3>
            <p class="mt-3 flex-1 text-base leading-7 text-muted">{{ offer.description }}</p>
            <span class="mt-4 text-sm font-bold text-brand">Learn more <span aria-hidden="true">→</span></span>
          </RouterLink>
        </div>
      </div>
    </section>

    <MethodsAndSectors />

    <section class="bg-paper px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto max-w-4xl">
        <ServiceFaq :items="serviceFaqs" />
        <RouterLink class="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-dark" to="/contact">Request Consultation</RouterLink>
      </div>
    </section>
  </div>
</template>
