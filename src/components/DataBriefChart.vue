<script setup>
// One-series line chart for data briefs: thin line, ring-edged markers,
// labels on the first and last values, hover tooltip and a table view.
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  chart: { type: Object, required: true },
})

// A narrower drawing on phones keeps the text readable once the SVG scales down.
const narrow = ref(false)
let media
const onMedia = () => { narrow.value = media.matches }
onMounted(() => { media = window.matchMedia('(max-width: 640px)'); onMedia(); media.addEventListener('change', onMedia) })
onBeforeUnmount(() => media?.removeEventListener('change', onMedia))

const W = computed(() => (narrow.value ? 380 : 640))
const H = computed(() => (narrow.value ? 280 : 300))
const pad = { top: 28, right: 20, bottom: 40, left: 40 }
const plotW = computed(() => W.value - pad.left - pad.right)
const plotH = computed(() => H.value - pad.top - pad.bottom)

const xs = computed(() => props.chart.points.map((p) => p.x))
const minX = computed(() => Math.min(...xs.value))
const maxX = computed(() => Math.max(...xs.value))
const yMax = computed(() => props.chart.max ?? Math.max(...props.chart.points.map((p) => p.value)))

// Inset so the first and last points (and their labels) clear the axis labels.
const inset = 28
const sx = (x) => pad.left + inset + ((x - minX.value) / (maxX.value - minX.value || 1)) * (plotW.value - 2 * inset)
const sy = (v) => pad.top + plotH.value - (v / yMax.value) * plotH.value

const ticks = computed(() => {
  const step = yMax.value <= 50 ? 10 : 20
  const out = []
  for (let v = 0; v <= yMax.value; v += step) out.push(v)
  return out
})

const points = computed(() => props.chart.points.map((p) => ({ ...p, cx: sx(p.x), cy: sy(p.value) })))
const linePath = computed(() => points.value.map((p, i) => `${i ? 'L' : 'M'}${p.cx.toFixed(1)},${p.cy.toFixed(1)}`).join(' '))

const active = ref(null)
const fmt = (v) => `${v}${props.chart.unit || ''}`
</script>

<template>
  <figure class="my-8">
    <figcaption class="text-base font-bold text-navy">{{ chart.title }}</figcaption>
    <div class="relative mt-3">
      <svg
        :viewBox="`0 0 ${W} ${H}`"
        class="h-auto w-full"
        role="img"
        :aria-label="`${chart.title}: ${chart.points.map((p) => `${p.label} ${fmt(p.value)}`).join(', ')}`"
        @mouseleave="active = null"
      >
        <!-- Recessive grid and y-axis labels -->
        <g v-for="t in ticks" :key="t">
          <line :x1="pad.left" :x2="W - pad.right" :y1="sy(t)" :y2="sy(t)" :stroke="t === 0 ? '#9a9486' : '#e5dfcd'" stroke-width="1" />
          <text :x="pad.left - 8" :y="sy(t) + 4" text-anchor="end" class="fill-[#6b6658] text-[12px]">{{ fmt(t) }}</text>
        </g>
        <!-- x-axis labels at each survey -->
        <text v-for="p in points" :key="`x-${p.label}`" :x="p.cx" :y="H - pad.bottom + 22" text-anchor="middle" class="fill-[#6b6658] text-[12px]">{{ p.label }}</text>

        <!-- The series -->
        <path :d="linePath" fill="none" stroke="#0f7c7a" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" />
        <circle
          v-for="(p, i) in points"
          :key="`m-${p.label}`"
          :cx="p.cx"
          :cy="p.cy"
          :r="active === i ? 6 : 5"
          fill="#0f7c7a"
          stroke="#ffffff"
          stroke-width="2"
        />

        <!-- Selective direct labels: first and last values -->
        <text :x="points[0].cx" :y="points[0].cy - 12" text-anchor="middle" class="fill-[#1b2a4a] text-[13px] font-bold">{{ fmt(points[0].value) }}</text>
        <text :x="points[points.length - 1].cx" :y="points[points.length - 1].cy - 12" text-anchor="middle" class="fill-[#1b2a4a] text-[13px] font-bold">{{ fmt(points[points.length - 1].value) }}</text>

        <!-- Hit targets larger than the marks -->
        <circle
          v-for="(p, i) in points"
          :key="`hit-${p.label}`"
          :cx="p.cx"
          :cy="p.cy"
          r="18"
          fill="transparent"
          class="cursor-pointer"
          tabindex="0"
          @mouseenter="active = i"
          @focus="active = i"
          @blur="active = null"
        />
      </svg>

      <!-- Tooltip -->
      <div
        v-if="active !== null"
        class="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-md bg-navy px-3 py-1.5 text-sm font-semibold text-white shadow-lg"
        :style="{ left: `${(points[active].cx / W) * 100}%`, top: `calc(${(points[active].cy / H) * 100}% - 12px)` }"
        role="status"
      >
        {{ points[active].label }}: {{ fmt(points[active].value) }}
      </div>
    </div>

    <details class="mt-3 text-sm text-muted">
      <summary class="cursor-pointer font-semibold text-brand">View the data as a table</summary>
      <table class="mt-2 w-full max-w-sm border-collapse text-left">
        <thead>
          <tr class="border-b border-[#e5dfcd]"><th class="py-1.5 pr-4 font-semibold text-navy">Survey</th><th class="py-1.5 font-semibold text-navy">Value</th></tr>
        </thead>
        <tbody>
          <tr v-for="p in chart.points" :key="`t-${p.label}`" class="border-b border-[#f0ebdc]">
            <td class="py-1.5 pr-4">{{ p.label }}</td>
            <td class="py-1.5">{{ fmt(p.value) }}</td>
          </tr>
        </tbody>
      </table>
    </details>

    <p class="mt-3 text-sm leading-6 text-muted">
      <a v-if="chart.sourceUrl" :href="chart.sourceUrl" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 hover:text-brand">{{ chart.source }}</a>
      <span v-else>{{ chart.source }}</span>
    </p>
  </figure>
</template>
