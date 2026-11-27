<script setup>
import { ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import BrandLogo from '../components/BrandLogo.vue'
import { publishedCaseStudies } from '../data/caseStudies'
import { ENABLE_ACCOUNTS } from '../data/features'
import { publishedLearnProducts } from '../data/learnProducts'
import { brand } from '../data/siteContent'
import { serviceLines } from '../data/serviceLines'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const menuOpen = ref(false)

watch(() => route.fullPath, () => {
  menuOpen.value = false
})

async function logout() {
  try {
    await auth.logout()
    await router.push('/')
  } catch (error) {
    console.error('Unable to sign out.', error)
  }
}
</script>

<template>
  <div class="min-h-screen pt-20 sm:pt-[5.5rem] xl:pt-0 print:pt-0">
    <header class="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy text-white shadow-sm xl:sticky xl:inset-x-auto">
      <div class="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:px-5 lg:px-8">
        <BrandLogo />

        <nav class="ml-auto hidden items-center gap-1 xl:flex" aria-label="Main navigation">
          <RouterLink class="nav-link" to="/">Home</RouterLink>
          <RouterLink class="nav-link" to="/about">About</RouterLink>
          <RouterLink class="nav-link" to="/services">Services</RouterLink>
          <RouterLink class="nav-link" to="/ai-opportunities">AI for MEL</RouterLink>
          <RouterLink v-if="publishedCaseStudies.length >= 2" class="nav-link" to="/case-studies">Case Studies</RouterLink>
          <RouterLink class="nav-link" to="/learn">Training</RouterLink>
          <RouterLink class="nav-link" to="/toolkit">Toolkit</RouterLink>
          <RouterLink class="nav-link" to="/contact">Contact</RouterLink>
          <RouterLink v-if="auth.user?.can_manage_consultations || auth.user?.can_manage_content" class="nav-link" to="/admin">Admin</RouterLink>
          <RouterLink v-if="ENABLE_ACCOUNTS && !auth.isAuthenticated" class="nav-link" to="/login">Sign in</RouterLink>
          <button v-else-if="auth.isAuthenticated" class="nav-link text-left" type="button" @click="logout">Sign out</button>
        </nav>

        <button
          class="menu-toggle inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/30 text-white transition hover:bg-white/10 xl:hidden"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          :aria-label="menuOpen ? 'Close navigation menu' : 'Open navigation menu'"
          @click="menuOpen = !menuOpen"
          @keydown.esc="menuOpen = false"
        >
          <svg v-if="!menuOpen" class="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
          </svg>
          <svg v-else class="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
          </svg>
        </button>
      </div>

      <nav v-if="menuOpen" id="mobile-menu" class="absolute inset-x-0 top-full border-t border-white/10 bg-navy px-4 pb-4 pt-2 shadow-lg xl:hidden" aria-label="Mobile navigation">
        <div class="mx-auto grid max-w-7xl gap-1 sm:px-1">
          <RouterLink class="mobile-menu-link" to="/">Home</RouterLink>
          <RouterLink class="mobile-menu-link" to="/about">About</RouterLink>
          <RouterLink class="mobile-menu-link" to="/services">Services</RouterLink>
          <RouterLink class="mobile-menu-link" to="/ai-opportunities">AI for MEL</RouterLink>
          <RouterLink v-if="publishedCaseStudies.length >= 2" class="mobile-menu-link" to="/case-studies">Case Studies</RouterLink>
          <RouterLink class="mobile-menu-link" to="/learn">Training</RouterLink>
          <RouterLink class="mobile-menu-link" to="/toolkit">MEL Toolkit</RouterLink>
          <RouterLink class="mobile-menu-link" to="/contact">Contact</RouterLink>
          <RouterLink v-if="auth.user?.can_manage_consultations || auth.user?.can_manage_content" class="mobile-menu-link" to="/admin">Admin</RouterLink>
        </div>
      </nav>
    </header>

    <main>
      <slot />
    </main>

    <footer class="bg-navy text-white">
      <div class="mx-auto grid max-w-7xl gap-9 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:px-8">
        <section>
          <BrandLogo />
          <p class="mt-4 text-sm font-semibold text-white">{{ brand.tagline }}</p>
          <p class="mt-3 max-w-xs text-sm leading-6 text-slate-200">Monitoring, evaluation, data and ESG consulting from Dar es Salaam.</p>
        </section>

        <nav aria-label="Services">
          <h2 class="text-sm font-bold tracking-wide text-white">Services</h2>
          <ul class="mt-4 space-y-3 text-sm text-slate-200">
            <li><RouterLink class="transition-colors hover:text-white" to="/ai-opportunities">AI for MEL</RouterLink></li>
            <li v-for="service in serviceLines" :key="service.slug">
              <RouterLink class="transition-colors hover:text-white" :to="{ name: 'service-detail', params: { slug: service.slug } }">{{ service.title }}</RouterLink>
            </li>
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 class="text-sm font-bold tracking-wide text-white">Company</h2>
          <ul class="mt-4 space-y-3 text-sm text-slate-200">
            <li><RouterLink class="transition-colors hover:text-white" to="/about">About</RouterLink></li>
            <li v-if="publishedCaseStudies.length >= 2"><RouterLink class="transition-colors hover:text-white" to="/case-studies">Case Studies</RouterLink></li>
            <li v-if="publishedLearnProducts.length"><RouterLink class="transition-colors hover:text-white" to="/learn">Training &amp; Courses</RouterLink></li>
            <li><RouterLink class="transition-colors hover:text-white" to="/toolkit">MEL Toolkit</RouterLink></li>
            <li><RouterLink class="transition-colors hover:text-white" to="/capability">Capability Statement</RouterLink></li>
            <li><RouterLink class="transition-colors hover:text-white" to="/contact">Contact</RouterLink></li>
            <li><RouterLink class="transition-colors hover:text-white" to="/privacy">Privacy</RouterLink></li>
          </ul>
        </nav>

        <section>
          <h2 class="text-sm font-bold tracking-wide text-white">Contact</h2>
          <address class="mt-4 space-y-3 text-sm not-italic leading-6 text-slate-200">
            <p>{{ brand.address }}</p>
            <p v-for="phone in brand.phoneNumbers" :key="phone"><a class="hover:text-white" :href="`tel:${phone.replaceAll(' ', '')}`">{{ phone }}</a></p>
            <p><a class="break-all hover:text-white" :href="`mailto:${brand.email}`">{{ brand.email }}</a></p>
          </address>
        </section>

        <div class="border-t border-white/15 pt-4 sm:col-span-2 lg:col-span-4">
          <p class="text-xs text-slate-300">© {{ new Date().getFullYear() }} {{ brand.legalName }}. All rights reserved.</p>
        </div>
      </div>
    </footer>

    <a
      class="fixed bottom-4 right-4 z-[70] grid h-12 w-12 place-items-center rounded-full bg-brand text-white shadow-lg transition hover:bg-brand-dark focus-visible:outline-offset-4"
      href="https://wa.me/255765785383?text=Hello%20CLM%20Consultants%2C%20I%20would%20like%20to%20discuss%E2%80%A6"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with CLM Consultants Limited on WhatsApp"
    >
      <svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2a9.9 9.9 0 0 0-8.52 14.94L2.2 22l5.2-1.36A9.93 9.93 0 1 0 12.04 2Zm0 18.1a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.08.8.82-3-.2-.31A8.14 8.14 0 1 1 12.04 20.1Zm4.47-6.1c-.25-.13-1.49-.74-1.72-.82-.23-.08-.4-.13-.57.13-.17.25-.65.82-.8.99-.14.17-.29.19-.54.06-.25-.13-1.07-.39-2.03-1.23-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.38.11-.5.11-.11.25-.29.38-.44.12-.14.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.12-.57-1.37-.78-1.88-.2-.49-.41-.42-.57-.43h-.49c-.17 0-.45.06-.68.32-.23.25-.89.87-.89 2.12s.91 2.46 1.03 2.63c.13.17 1.79 2.73 4.33 3.83.61.27 1.08.43 1.45.55.61.19 1.16.16 1.6.1.49-.07 1.49-.61 1.7-1.2.21-.59.21-1.1.15-1.21-.06-.1-.23-.17-.49-.29Z" />
      </svg>
    </a>
  </div>
</template>

<style scoped>
.nav-link {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 2.75rem;
  padding: 0.65rem 0.7rem;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  color: rgb(255 255 255 / 90%);
  font-size: 0.83rem;
  font-weight: 600;
  white-space: nowrap;
  transition: background-color 150ms ease, color 150ms ease;
}

.nav-link:hover,
.nav-link.router-link-exact-active {
  background-color: rgb(255 255 255 / 12%);
  color: #fff;
}

.mobile-menu-link {
  display: block;
  border-radius: 0.5rem;
  padding: 0.7rem 0.8rem;
  color: rgb(255 255 255 / 92%);
  font-size: 0.95rem;
  font-weight: 600;
}

.mobile-menu-link:hover,
.mobile-menu-link.router-link-exact-active {
  background: rgb(255 255 255 / 12%);
  color: #fff;
}

.consultation-link {
  white-space: nowrap;
}

@media (prefers-reduced-motion: reduce) {
  .nav-link {
    transition: none;
  }
}
</style>
