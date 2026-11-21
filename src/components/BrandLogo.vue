<template>
  <RouterLink class="inline-flex min-w-0 items-center gap-2 text-white" to="/" aria-label="CLM Consultants Limited home">
    <span class="brand-mark" aria-hidden="true">
      <img src="/clm-logo%20(2).png" alt="">
    </span>
    <span class="brand-wordmark whitespace-nowrap font-bold tracking-tight">CLM Consultants Limited</span>
  </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.brand-mark {
  position: relative;
  width: 2.25rem;
  height: 2.25rem;
  flex: 0 0 auto;
  overflow: hidden;
}

.brand-mark img {
  position: absolute;
  top: -0.92rem;
  left: -0.29rem;
  width: 12.78rem;
  max-width: none;
  filter: brightness(0) invert(1);
}

.brand-wordmark {
  font-size: 0.68rem;
}

@media (min-width: 640px) {
  .brand-mark {
    width: 2.75rem;
    height: 2.75rem;
  }

  .brand-mark img {
    top: -1.125rem;
    left: -0.35rem;
    width: 15.625rem;
  }

  .brand-wordmark {
    font-size: 1rem;
  }
}
</style>
