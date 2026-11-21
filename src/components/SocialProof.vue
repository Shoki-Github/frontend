<script setup>
import { clients, testimonials } from '../data/proof'
</script>

<template>
  <section v-if="clients.length" class="bg-white px-5 py-12 lg:px-8" aria-labelledby="clients-heading">
    <div class="mx-auto max-w-7xl">
      <h2 id="clients-heading" class="text-center text-sm font-bold uppercase tracking-wide text-muted">Organisations we have worked with</h2>
      <ul class="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
        <li v-for="client in clients" :key="client.name" class="text-center">
          <img v-if="client.logo" :src="client.logo" :alt="client.name" class="h-10 w-auto max-w-[9rem] object-contain grayscale transition hover:grayscale-0" loading="lazy" />
          <span v-else class="text-base font-bold text-navy">{{ client.name }}</span>
        </li>
      </ul>
    </div>
  </section>

  <section v-if="testimonials.length" class="bg-paper px-5 py-14 md:py-16 lg:px-8" aria-labelledby="testimonials-heading">
    <div class="mx-auto max-w-7xl">
      <h2 id="testimonials-heading" class="text-3xl font-bold tracking-tight text-navy md:text-4xl">What our clients say</h2>
      <div class="mt-8 grid gap-5 md:grid-cols-2">
        <figure v-for="item in testimonials" :key="item.name + item.quote.slice(0, 20)" class="rounded-xl border border-[#e5dfcd] bg-white p-6 md:p-7">
          <blockquote class="text-base leading-8 text-navy md:text-lg">“{{ item.quote }}”</blockquote>
          <figcaption class="mt-5 text-sm leading-6 text-muted">
            <span class="font-bold text-navy">{{ item.name }}</span><template v-if="item.role">, {{ item.role }}</template><template v-if="item.organisation">, {{ item.organisation }}</template>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
