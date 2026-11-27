import { createRouter, createWebHistory } from 'vue-router'
import { ENABLE_ACCOUNTS } from '../data/features'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: (to, from, saved) => {
    if (saved) return saved
    if (to.hash) {
      // Wait until the target section is on the page (the new page may still
      // be loading or animating in), then scroll to it. Give up after 3 s.
      return new Promise((resolve) => {
        const started = Date.now()
        const check = () => {
          if (document.querySelector(to.hash)) setTimeout(() => resolve({ el: to.hash, top: 96, behavior: 'smooth' }), 150)
          else if (Date.now() - started > 3000) resolve({ top: 0 })
          else setTimeout(check, 50)
        }
        check()
      })
    }
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: () => import('../pages/HomePage.vue'), meta: { title: 'CLM Consultants Limited | Evidence, MEL & AI-enabled services in Tanzania', description: 'CLM Consultants Limited helps organisations in Tanzania strengthen MEL, use data and AI, and improve performance through evaluation, dashboards and practical training.' } },
    { path: '/about', name: 'about', component: () => import('../pages/AboutPage.vue'), meta: { title: 'About | CLM Consultants Limited', description: 'Learn about CLM Consultants Limited, a Tanzanian consulting firm specialising in MEL, data systems and sustainability reporting.' } },
    { path: '/about-us/:pathMatch(.*)*', redirect: '/about' },
    { path: '/about-us', redirect: '/about' },
    { path: '/services', name: 'services', component: () => import('../pages/ServicesPage.vue'), meta: { title: 'Services | CLM Consultants Limited', description: 'Explore CLM Consultants Limited services in MEL and evaluation, data and dashboards, ESG reporting, and training.' } },
    { path: '/services/:slug', name: 'service-detail', component: () => import('../pages/ServiceDetailPage.vue'), props: true, meta: { title: 'Service | CLM Consultants Limited' } },
    { path: '/ai-opportunities', name: 'ai-opportunities', component: () => import('../pages/AiOpportunitiesPage.vue'), meta: { title: 'AI for MEL | CLM Consultants Limited', description: 'How CLM uses AI inside monitoring, evaluation and learning: data quality, reporting, evaluation follow-up, Dira 2050 contribution tracking and AI skills for MEL teams.' } },
    { path: '/ai-services', redirect: '/ai-opportunities' },
    { path: '/sectors/:slug', name: 'sector', component: () => import('../pages/SectorPage.vue'), meta: { title: 'Sector | CLM Consultants Limited' } },
    { path: '/dira-2050', name: 'dira-2050', component: () => import('../pages/DiraPage.vue'), meta: { title: 'MEL for Dira 2050 | CLM Consultants Limited', description: 'The MEL skills Dira 2050 and FYDP IV call for: results alignment, high-end indicators, contribution analysis, data quality, delivery labs, scorecards and independent evaluation.' } },
    { path: '/case-studies/:slug', name: 'case-study-detail', component: () => import('../pages/CaseStudyDetailPage.vue'), meta: { title: 'Case Study | CLM Consultants Limited' } },
    { path: '/case-studies', name: 'case-studies', component: () => import('../pages/CaseStudiesPage.vue'), meta: { title: 'Case Studies | CLM Consultants Limited' } },
    // Digital Products page parked until a product is ready (src/pages/DigitalProductsPage.vue).
    { path: '/digital-products', redirect: '/services' },
    { path: '/insights/:slug', name: 'insight-detail', component: () => import('../pages/NewsDetailPage.vue'), meta: { title: 'Insight | CLM Consultants Limited' } },
    { path: '/insights', name: 'insights', component: () => import('../pages/NewsPage.vue'), meta: { title: 'Insights | CLM Consultants Limited', description: 'Practical thinking on evidence, MEL and Tanzania’s development.' } },
    { path: '/news/:pathMatch(.*)*', redirect: '/insights' },
    { path: '/news', redirect: '/insights' },
    { path: '/learn', name: 'learn', component: () => import('../pages/LearnPage.vue'), meta: { title: 'Training & Courses | CLM Consultants Limited', description: 'Practical MEL, data and AI training from CLM Consultants Limited: foundation and advanced MEL courses, AI in MEL, and bespoke in-house training in English or Kiswahili.' } },
    { path: '/toolkit/:slug', name: 'toolkit-guide', component: () => import('../pages/ToolkitGuidePage.vue'), meta: { title: 'MEL Toolkit | CLM Consultants Limited' } },
    { path: '/toolkit', name: 'toolkit', component: () => import('../pages/ToolkitPage.vue'), meta: { title: 'MEL Toolkit | CLM Consultants Limited', description: 'Free, practical guides on theory of change, indicators, evaluation criteria, data quality and learning reviews from CLM Consultants Limited.' } },
    { path: '/contact', name: 'contact', component: () => import('../pages/ContactPage.vue'), meta: { title: 'Request a Consultation | CLM Consultants Limited', description: 'Tell CLM Consultants Limited what you need to measure. We reply within two working days.' } },
    { path: '/contact-us/:pathMatch(.*)*', redirect: '/contact' },
    { path: '/contact-us', redirect: '/contact' },
    { path: '/capability', name: 'capability', component: () => import('../pages/CapabilityPage.vue'), meta: { title: 'Capability Statement | CLM Consultants Limited', description: 'CLM Consultants Limited capability statement: MEL, evaluation, data, ESG and training services, methods, sectors, leadership and company details.' } },
    { path: '/privacy', name: 'privacy', component: () => import('../pages/PrivacyPage.vue'), meta: { title: 'Privacy | CLM Consultants Limited' } },
    { path: '/consultation', redirect: '/contact' },
    { path: '/faq', redirect: '/services#service-faq' },
    { path: '/forum/:pathMatch(.*)*', redirect: '/contact' },
    { path: '/forum', redirect: '/contact' },
    { path: '/admin', name: 'admin', component: () => import('../pages/AdminPage.vue') },
    { path: '/admin/content', name: 'admin-content', component: () => import('../pages/AdminContentPage.vue') },
    { path: '/login', name: 'login', component: () => import('../pages/LoginPage.vue'), meta: { transition: 'auth-page', title: 'Staff sign in | CLM Consultants Limited' } },
    { path: '/forgot-password', redirect: '/contact' },
    ...(ENABLE_ACCOUNTS
      ? [{ path: '/register', name: 'register', component: () => import('../pages/RegisterPage.vue'), meta: { transition: 'auth-page', title: 'Create account | CLM Consultants Limited' } }]
      : [{ path: '/register', redirect: '/contact' }]),
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../pages/NotFoundPage.vue'), meta: { title: 'Page not found | CLM Consultants Limited' } },
  ],
})

export default router
