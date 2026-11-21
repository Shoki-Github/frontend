<script setup>
import { RouterLink } from 'vue-router'
import PageBanner from '../components/PageBanner.vue'

const digitalProducts = [
  {
    title: 'Evidence-to-Action Platform',
    description: 'Organise evaluation recommendations, management decisions and follow-up actions.',
    href: '',
  },
  {
    title: 'MEL Data Dashboard',
    description: 'View programme indicators, progress and learning in one accessible dashboard.',
    href: '',
  },
  {
    title: 'Community Feedback Tool',
    description: 'Collect, review and respond to feedback from programme participants and stakeholders.',
    href: '',
  },
]
</script>

<template>
  <div>
    <PageBanner
      title="Digital Products"
      breadcrumb="Digital Products"
      subtitle="Practical digital tools that help organisations collect evidence, manage performance and improve learning."
      large
    />

    <section class="bg-white px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div class="max-w-3xl">
          <p class="text-sm font-bold uppercase tracking-[0.12em] text-brand">CLM platforms and tools</p>
          <h2 class="mt-3 text-3xl font-bold tracking-tight text-navy md:text-4xl">Explore our digital solutions</h2>
        </div>

        <div class="mt-8 grid gap-5 md:grid-cols-3">
          <article
            v-for="product in digitalProducts"
            :key="product.title"
            class="flex flex-col rounded-xl border border-[#e5dfcd] bg-paper p-6"
          >
            <h3 class="text-xl font-bold text-navy">{{ product.title }}</h3>
            <p class="mt-3 flex-1 text-base leading-7 text-muted">{{ product.description }}</p>
            <a
              v-if="product.href"
              class="mt-6 inline-flex min-h-11 w-fit items-center justify-center rounded-md bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-dark"
              :href="product.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open product <span class="ml-2" aria-hidden="true">↗</span>
            </a>
            <span
              v-else
              class="mt-6 inline-flex min-h-11 w-fit items-center justify-center rounded-md border border-[#d3ccb8] px-5 py-2.5 text-sm font-bold text-muted"
            >
              Landing page coming soon
            </span>
          </article>
        </div>

        <RouterLink
          class="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-dark"
          to="/contact"
        >
          Discuss a digital solution
        </RouterLink>
      </div>
    </section>
  </div>
</template>
