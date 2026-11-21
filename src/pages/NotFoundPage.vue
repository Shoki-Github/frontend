<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="bg-white px-5 py-24 text-center">
    <p class="text-xs font-bold uppercase tracking-[0.2em] text-brand">404 · Page not found</p>
    <h1 class="mt-5 text-4xl font-semibold tracking-tight text-ink">Page not found</h1>
    <p class="mt-4 text-muted">The address may have changed, or the page may no longer be available.</p>
    <nav class="mt-8 flex flex-wrap justify-center gap-3" aria-label="Helpful pages">
      <RouterLink class="inline-flex min-h-11 items-center justify-center rounded-md bg-brand px-5 py-3 text-sm font-bold text-white hover:bg-brand-dark" to="/">Home</RouterLink>
      <RouterLink class="inline-flex min-h-11 items-center justify-center rounded-md border border-navy px-5 py-3 text-sm font-bold text-navy hover:bg-navy hover:text-white" to="/services">Services</RouterLink>
      <RouterLink class="inline-flex min-h-11 items-center justify-center rounded-md border border-navy px-5 py-3 text-sm font-bold text-navy hover:bg-navy hover:text-white" to="/contact">Contact</RouterLink>
    </nav>
  </section>
</template>
