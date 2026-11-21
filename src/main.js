import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './style.css'
import App from './App.vue'
import { applyRouteMetadata } from './services/seo'
import { useAuthStore } from './stores/auth'

const app = createApp(App)
const pinia = createPinia()
const auth = useAuthStore(pinia)

app.use(pinia)
router.beforeEach(async (to) => {
  if (!to.path.startsWith('/admin') || auth.isAuthenticated) return true

  try {
    await auth.refresh()
  } catch (error) {
    console.error('Unable to verify the staff session.', error)
    return { name: 'login' }
  }

  return auth.isAuthenticated ? true : { name: 'login', query: { redirect: to.fullPath } }
})
app.use(router)
router.afterEach((route) => applyRouteMetadata(route))
router.isReady().then(() => applyRouteMetadata(router.currentRoute.value))
app.mount('#app')
