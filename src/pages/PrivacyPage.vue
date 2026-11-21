<script setup>
import PageBanner from '../components/PageBanner.vue'
import { brand } from '../data/siteContent'
</script>

<template>
  <div>
    <PageBanner title="Privacy notice" breadcrumb="Privacy" subtitle="How CLM Consultants Limited uses information submitted through this website." />
    <article class="bg-white px-5 py-12 md:py-16 lg:px-8">
      <div class="mx-auto max-w-3xl space-y-7 text-base leading-7 text-muted">
        <section>
          <h2 class="text-xl font-bold text-navy">Information you provide</h2>
          <p class="mt-3">When you send a consultation request, we collect the details you enter, including your name, organisation, organisation type, email address, optional phone number, service of interest, preferred language and message.</p>
        </section>
        <section>
          <h2 class="text-xl font-bold text-navy">How we use it</h2>
          <p class="mt-3">We use the information you submit to review and respond to your enquiry. Please do not include passwords or sensitive personal information in the form.</p>
        </section>
        <section>
          <h2 class="text-xl font-bold text-navy">Email updates</h2>
          <p class="mt-3">If you subscribe to our email updates, we keep your email address and, if you give them, your first name and organisation, together with the date you agreed to receive updates. We use these only to send our newsletter and related announcements, and we do not sell or share them. You can unsubscribe at any time by emailing <a class="font-semibold text-brand underline underline-offset-2" :href="`mailto:${brand.email}`">{{ brand.email }}</a>.</p>
        </section>
        <section>
          <h2 class="text-xl font-bold text-navy">Contact us about privacy</h2>
          <p class="mt-3">For questions about information submitted through this website, contact <a class="font-semibold text-brand underline underline-offset-2" :href="`mailto:${brand.email}`">{{ brand.email }}</a>.</p>
        </section>
      </div>
    </article>
  </div>
</template>
