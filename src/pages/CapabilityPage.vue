<script setup>
import { RouterLink } from 'vue-router'
import { aboutContent, brand, evaluationMethods, homeContent, sectors, specialistOffers } from '../data/siteContent'
import { aiServiceGroups } from '../data/aiServices'
import { serviceLines } from '../data/serviceLines'

function printStatement() {
  window.print()
}
</script>

<template>
  <div class="bg-paper px-5 py-10 md:py-14 lg:px-8 print:bg-white print:p-0">
    <div class="mx-auto max-w-5xl">
      <div class="no-print mb-6 flex flex-wrap items-center justify-between gap-4">
        <nav class="flex items-center gap-2 text-sm font-medium text-muted" aria-label="Breadcrumb">
          <RouterLink class="hover:text-brand hover:underline" to="/">Home</RouterLink>
          <span aria-hidden="true">/</span>
          <span aria-current="page" class="text-navy">Capability Statement</span>
        </nav>
        <button class="inline-flex min-h-11 items-center justify-center rounded-md bg-brand px-5 text-sm font-bold text-white transition hover:bg-brand-dark" type="button" @click="printStatement">
          Save as PDF / Print
        </button>
      </div>

      <article class="capability rounded-xl border border-[#e5dfcd] bg-white p-6 md:p-10 print:rounded-none print:border-0 print:p-0">
        <header class="border-b-4 border-brand pb-6">
          <p class="text-sm font-bold uppercase tracking-[0.12em] text-brand">Capability Statement</p>
          <h1 class="mt-2 text-3xl font-bold tracking-tight text-navy md:text-4xl">{{ brand.legalName }}</h1>
          <p class="mt-2 text-base font-semibold text-muted">{{ brand.tagline }}</p>
        </header>

        <section class="mt-7">
          <h2 class="cap-heading">Company overview</h2>
          <p class="mt-3 text-base leading-7 text-muted">{{ aboutContent.intro }}</p>
        </section>

        <section class="mt-7">
          <h2 class="cap-heading">Core services</h2>
          <ul class="mt-3 grid gap-3 md:grid-cols-2">
            <li v-for="service in serviceLines" :key="service.slug" class="cap-item">
              <p class="font-bold text-navy">{{ service.title }}</p>
              <p class="mt-1 text-sm leading-6 text-muted">{{ service.summary }}</p>
            </li>
          </ul>
        </section>

        <section class="mt-7">
          <h2 class="cap-heading">Specialist offers</h2>
          <ul class="mt-3 grid gap-3 md:grid-cols-2">
            <li v-for="offer in specialistOffers" :key="offer.title" class="cap-item">
              <p class="font-bold text-navy">{{ offer.title }}</p>
              <p class="mt-1 text-sm leading-6 text-muted">{{ offer.description }}</p>
            </li>
          </ul>
        </section>

        <section class="mt-7">
          <h2 class="cap-heading">AI solutions</h2>
          <ul class="mt-3 grid gap-3 md:grid-cols-2">
            <li v-for="group in aiServiceGroups" :key="group.id" class="cap-item">
              <p class="font-bold text-navy">{{ group.title }}</p>
              <p class="mt-1 text-sm leading-6 text-muted">{{ group.services.map((service) => service.title).join(' · ') }}</p>
            </li>
          </ul>
        </section>

        <div class="mt-7 grid gap-7 md:grid-cols-2">
          <section>
            <h2 class="cap-heading">Methods</h2>
            <ul class="mt-3 space-y-1.5 text-sm leading-6 text-muted">
              <li v-for="method in evaluationMethods" :key="method.title"><span class="font-bold text-navy">{{ method.title }}:</span> {{ method.description }}</li>
            </ul>
          </section>
          <section>
            <h2 class="cap-heading">Sectors</h2>
            <ul class="mt-3 space-y-1.5 text-sm leading-6 text-muted">
              <li v-for="sector in sectors" :key="sector.title"><span class="font-bold text-navy">{{ sector.title }}:</span> {{ sector.description }}</li>
            </ul>
            <h2 class="cap-heading mt-6">Clients we serve</h2>
            <ul class="mt-3 space-y-1.5 text-sm leading-6 text-muted">
              <li v-for="audience in homeContent.audiences" :key="audience.title">{{ audience.title }}</li>
            </ul>
          </section>
        </div>

        <section class="mt-7">
          <h2 class="cap-heading">Leadership</h2>
          <p class="mt-3 text-base font-bold text-navy">{{ aboutContent.founder.name }}, {{ aboutContent.founder.role }}</p>
          <p class="mt-2 text-sm leading-6 text-muted">{{ aboutContent.founder.biography }}</p>
          <p class="mt-3 text-sm leading-6 text-muted">{{ aboutContent.team }}</p>
        </section>

        <section class="mt-7">
          <h2 class="cap-heading">Why CLM</h2>
          <ul class="mt-3 space-y-1.5 text-sm leading-6 text-muted">
            <li v-for="reason in homeContent.reasons" :key="reason.title"><span class="font-bold text-navy">{{ reason.title }}</span> {{ reason.description }}</li>
          </ul>
        </section>

        <section class="mt-7 rounded-lg bg-paper p-5 print:border print:border-[#e5dfcd]">
          <h2 class="cap-heading">Company details &amp; contacts</h2>
          <dl class="mt-3 grid gap-x-8 gap-y-2 text-sm leading-6 text-muted sm:grid-cols-2">
            <div><dt class="inline font-bold text-navy">Legal name: </dt><dd class="inline">{{ brand.legalName }}</dd></div>
            <div><dt class="inline font-bold text-navy">Registered: </dt><dd class="inline">Tanzania</dd></div>
            <div v-if="brand.registrationNumber"><dt class="inline font-bold text-navy">Registration no.: </dt><dd class="inline">{{ brand.registrationNumber }}</dd></div>
            <div v-if="brand.tin"><dt class="inline font-bold text-navy">TIN: </dt><dd class="inline">{{ brand.tin }}</dd></div>
            <div><dt class="inline font-bold text-navy">Address: </dt><dd class="inline">{{ brand.address }}</dd></div>
            <div><dt class="inline font-bold text-navy">Email: </dt><dd class="inline"><a class="text-brand underline-offset-2 hover:underline" :href="`mailto:${brand.email}`">{{ brand.email }}</a></dd></div>
            <div><dt class="inline font-bold text-navy">Phone: </dt><dd class="inline">{{ brand.phoneNumbers.join(' · ') }}</dd></div>
            <div><dt class="inline font-bold text-navy">Website: </dt><dd class="inline">{{ brand.website.replace('https://', '') }}</dd></div>
            <div><dt class="inline font-bold text-navy">Languages: </dt><dd class="inline">English and Kiswahili</dd></div>
          </dl>
        </section>
      </article>
    </div>
  </div>
</template>

<style scoped>
.cap-heading {
  color: var(--color-navy, #172554);
  font-size: 1.15rem;
  font-weight: 700;
}

.cap-item {
  border: 1px solid #e5dfcd;
  border-radius: 0.5rem;
  padding: 0.85rem 1rem;
}

@media print {
  .capability section,
  .cap-item {
    break-inside: avoid;
  }
}
</style>
