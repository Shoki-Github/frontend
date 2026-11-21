<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  title: { type: String, required: true },
  breadcrumb: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  large: { type: Boolean, default: false },
  showBreadcrumb: { type: Boolean, default: true },
})
</script>

<template>
  <section class="bg-paper">
    <div class="mx-auto max-w-7xl px-5 lg:px-8" :class="large ? 'py-14 md:py-18' : 'py-10 md:py-12'">
      <h1 class="max-w-4xl text-3xl font-bold leading-tight tracking-tight text-navy sm:text-4xl md:text-5xl">{{ title }}</h1>
      <p v-if="subtitle" class="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg md:leading-8">{{ subtitle }}</p>
      <nav v-if="showBreadcrumb" class="mt-5 flex items-center gap-2 text-sm font-medium text-muted" aria-label="Breadcrumb">
        <RouterLink class="underline-offset-2 hover:text-brand hover:underline" to="/">Home</RouterLink>
        <span aria-hidden="true">/</span>
        <span aria-current="page" class="text-navy">{{ breadcrumb || title }}</span>
      </nav>
    </div>
  </section>
</template>
