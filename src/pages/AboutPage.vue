<script setup>
import { RouterLink } from 'vue-router'
import PageBanner from '../components/PageBanner.vue'
import { aboutContent, brand, sectors } from '../data/siteContent'
</script>

<template>
  <div>
    <PageBanner title="About CLM Consultants Limited" breadcrumb="About" large />

    <section class="bg-white px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto max-w-4xl">
        <p class="text-sm font-bold uppercase tracking-[0.12em] text-brand">Who we are</p>
        <h2 class="mt-3 text-3xl font-bold tracking-tight text-navy md:text-4xl">Evidence, learning and practical change.</h2>
        <p class="mt-5 text-base leading-7 text-muted md:text-lg md:leading-8">{{ aboutContent.intro }}</p>
        <p class="mt-5 text-lg font-bold text-navy">{{ aboutContent.purpose }}</p>
      </div>
    </section>

    <section class="bg-paper px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <h2 class="text-3xl font-bold tracking-tight text-navy md:text-4xl">How we work</h2>
        <div class="mt-7 grid gap-4 md:grid-cols-3">
          <article v-for="(principle, index) in aboutContent.principles" :key="principle.title" class="rounded-xl border border-[#e5dfcd] bg-white p-6">
            <p class="text-sm font-bold text-brand">{{ String(index + 1).padStart(2, '0') }}</p>
            <h3 class="mt-3 text-lg font-bold text-navy">{{ principle.title }}</h3>
            <p class="mt-3 text-base leading-7 text-muted">{{ principle.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="bg-white px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <div>
          <p class="text-sm font-bold uppercase tracking-[0.12em] text-brand">Founder &amp; Director</p>
          <h2 class="mt-3 text-3xl font-bold tracking-tight text-navy md:text-4xl">{{ aboutContent.founder.name }}</h2>
          <p class="mt-2 text-base font-semibold text-muted">{{ aboutContent.founder.role }}, {{ brand.legalName }}</p>
        </div>
        <p class="text-base leading-7 text-muted md:text-lg md:leading-8">{{ aboutContent.founder.biography }}</p>
      </div>
    </section>

    <section id="how-we-are-organised" class="scroll-mt-24 bg-paper px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div class="max-w-3xl">
          <p class="text-sm font-bold uppercase tracking-[0.12em] text-brand">Our team</p>
          <h2 class="mt-3 text-3xl font-bold tracking-tight text-navy md:text-4xl">How we’re organised</h2>
          <p class="mt-4 text-base leading-7 text-muted md:text-lg md:leading-8">{{ aboutContent.organisation.intro }}</p>
        </div>

        <h3 class="mt-9 text-sm font-bold uppercase tracking-wide text-brand">Who does what</h3>
        <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <article v-for="role in aboutContent.organisation.roles" :key="role.title" class="rounded-xl border border-[#e5dfcd] bg-white p-5">
            <h4 class="text-base font-bold leading-snug text-navy">{{ role.title }}</h4>
            <p class="mt-2 text-sm leading-6 text-muted">{{ role.description }}</p>
          </article>
        </div>

        <h3 class="mt-9 text-sm font-bold uppercase tracking-wide text-brand">Our working standards</h3>
        <div class="mt-4 grid gap-4 md:grid-cols-3">
          <article v-for="standard in aboutContent.organisation.standards" :key="standard.title" class="border-l-4 border-[#c9a227] bg-white p-5">
            <h4 class="text-lg font-bold text-navy">{{ standard.title }}</h4>
            <p class="mt-2 text-base leading-7 text-muted">{{ standard.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="bg-paper px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <h2 class="text-3xl font-bold tracking-tight text-navy md:text-4xl">Sectors we work in</h2>
        <div class="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <RouterLink v-for="sector in sectors" :key="sector.title" class="group rounded-xl border border-[#e5dfcd] bg-white p-5 transition hover:border-brand" :to="{ name: 'sector', params: { slug: sector.slug } }">
            <h3 class="text-lg font-bold text-navy group-hover:text-brand">{{ sector.title }} <span aria-hidden="true">→</span></h3>
            <p class="mt-2 text-base leading-7 text-muted">{{ sector.description }}</p>
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="bg-white px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 md:gap-14">
        <div>
          <h2 class="text-2xl font-bold tracking-tight text-navy md:text-3xl">Our associates</h2>
          <p class="mt-4 text-base leading-7 text-muted">{{ aboutContent.team }}</p>
          <div id="join-our-network" class="mt-6 rounded-xl border border-[#e5dfcd] bg-[#e6f3f1] p-5">
            <h3 class="text-lg font-bold text-navy">Join our associate network</h3>
            <p class="mt-2 text-base leading-7 text-muted">Are you a statistician, evaluator, data engineer, gender or ESG specialist, or sector expert? Send us your CV and areas of expertise and we will contact you when a suitable assignment comes up.</p>
            <a class="mt-4 inline-flex min-h-11 items-center justify-center rounded-md bg-brand px-5 text-sm font-bold text-white transition hover:bg-brand-dark" :href="`mailto:${brand.email}?subject=${encodeURIComponent('Associate network application')}`">Email your CV</a>
          </div>
        </div>
        <div class="rounded-xl border border-[#e5dfcd] bg-white p-6">
          <h2 class="text-xl font-bold text-navy">Company details</h2>
          <dl class="mt-4 space-y-3 text-base leading-7 text-muted">
            <div class="flex flex-wrap gap-x-2">
              <dt class="font-semibold text-navy">Legal name:</dt>
              <dd>{{ brand.legalName }}</dd>
            </div>
            <div class="flex flex-wrap gap-x-2">
              <dt class="font-semibold text-navy">Registration:</dt>
              <dd>{{ brand.registrationNumber || 'Registered in Tanzania' }}</dd>
            </div>
            <div v-if="brand.tin" class="flex flex-wrap gap-x-2">
              <dt class="font-semibold text-navy">TIN:</dt>
              <dd>{{ brand.tin }}</dd>
            </div>
            <div class="flex flex-wrap gap-x-2">
              <dt class="font-semibold text-navy">Location:</dt>
              <dd>{{ brand.address }}</dd>
            </div>
          </dl>
          <RouterLink class="mt-5 inline-flex min-h-11 items-center text-sm font-bold text-brand" to="/capability">View our capability statement <span class="ml-2" aria-hidden="true">→</span></RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
