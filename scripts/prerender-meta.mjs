// Writes a copy of dist/index.html for every public page, with that page's
// title, description, canonical URL and social tags already in the HTML.
// Search engines and link previews (WhatsApp, LinkedIn) read these tags
// without running JavaScript. The page content itself still renders in the
// browser as before.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { brand } from '../src/data/siteContent.js'
import { serviceLines } from '../src/data/serviceLines.js'
import { toolkitGuides } from '../src/data/toolkitGuides.js'
import { insights } from '../src/data/insights.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const template = readFileSync(join(dist, 'index.html'), 'utf8')
const routerSource = readFileSync(join(root, 'src/router/index.js'), 'utf8')

const quoted = "'((?:[^'\\\\]|\\\\.)*)'"
const routePattern = new RegExp(
  `path: '(/[^':*]*)', name: '[^']+', component: [^\\n]*?meta: \\{[^\\n]*?title: ${quoted}(?:, description: ${quoted})?`,
  'g',
)
const unescape = (value) => value?.replace(/\\'/g, "'")
const skip = new Set(['/admin', '/admin/content', '/login', '/register'])

const pages = new Map()
for (const match of routerSource.matchAll(routePattern)) {
  const [, path, title, description] = match
  if (!skip.has(path)) pages.set(path, { title: unescape(title), description: unescape(description) })
}
for (const service of serviceLines) {
  pages.set(`/services/${service.slug}`, { title: `${service.title} | CLM Consultants Limited`, description: service.summary })
}
for (const guide of toolkitGuides) {
  pages.set(`/toolkit/${guide.slug}`, { title: `${guide.title} | CLM Consultants Limited`, description: guide.summary })
}

for (const insight of insights) {
  pages.set(`/insights/${insight.slug}`, { title: `${insight.title} | CLM Consultants Limited`, description: insight.excerpt })
}

const defaultDescription = pages.get('/')?.description || ''
const escapeHtml = (value) => value
  .replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function render(path, { title, description }) {
  const raw = description || defaultDescription
  const desc = raw.length > 155 ? `${raw.slice(0, 152).trimEnd()}...` : raw
  const url = new URL(path, brand.website).toString()
  const t = escapeHtml(title)
  const d = escapeHtml(desc)
  return template
    .replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${d}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${t}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${d}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${t}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${d}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
}

for (const [path, meta] of pages) {
  const file = path === '/' ? join(dist, 'index.html') : join(dist, path, 'index.html')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, render(path, meta))
}
console.log(`prerender-meta: wrote ${pages.size} pages`)
