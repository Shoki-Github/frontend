<script setup>
import { onMounted, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import PageLoader from './components/PageLoader.vue'
import MainLayout from './layouts/MainLayout.vue'

const isStarting = ref(true)
const router = useRouter()

onMounted(async () => {
  try {
    await router.isReady()
  } finally {
    isStarting.value = false
  }
})
</script>

<template>
  <PageLoader v-if="isStarting" />
  <MainLayout v-else>
    <RouterView v-slot="{ Component, route }">
      <Transition :name="route.meta.transition || ''" mode="out-in">
        <component :is="Component" :key="route.name" />
      </Transition>
    </RouterView>
  </MainLayout>
</template>

<style>
.auth-page-enter-active,
.auth-page-leave-active {
  transition: opacity 220ms ease, transform 220ms ease;
}

.auth-page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.auth-page-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (prefers-reduced-motion: reduce) {
  .auth-page-enter-active,
  .auth-page-leave-active {
    transition: none;
  }
}
</style>
