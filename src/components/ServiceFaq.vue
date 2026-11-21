<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    default: 'Services FAQ',
  },
})
</script>

<template>
  <section id="service-faq" class="mx-auto max-w-4xl scroll-mt-24">
    <h2 class="text-3xl font-bold tracking-tight text-navy md:text-4xl">{{ title }}</h2>
    <div class="mt-7 space-y-3">
      <details v-for="item in items" :key="item.question" class="rounded-xl border border-[#e5dfcd] bg-white p-5">
        <summary class="cursor-pointer text-base font-semibold leading-6 text-navy">{{ item.question }}</summary>
        <p class="mt-3 text-base leading-7 text-muted">{{ item.answer }}</p>
      </details>
    </div>
  </section>
</template>
