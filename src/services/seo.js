import { brand } from '../data/siteContent'
import { serviceLines } from '../data/serviceLines'
import { toolkitGuides } from '../data/toolkitGuides'
import { insights } from '../data/insights'
import { sectors } from '../data/siteContent'

const defaultTitle = 'CLM Consultants Limited | Evidence, MEL & AI-enabled services in Tanzania'
const defaultDescription = 'CLM Consultants Limited helps organisations in Tanzania strengthen MEL, use data and AI, and improve performance through evaluation, dashboards and practical training.'

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.append(element)
  }
  element.setAttribute('content', content)
}

function setCanonical(path) {
  let element = document.head.querySelector('link[rel="canonical"]')
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.append(element)
  }
  element.setAttribute('href', new URL(path, brand.website).toString())
}

function setStructuredData() {
  let element = document.head.querySelector('#clm-structured-data')
  if (!element) {
    element = document.createElement('script')
    element.id = 'clm-structured-data'
    element.type = 'application/ld+json'
    document.head.append(element)
  }

  element.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: brand.legalName,
    url: brand.website,
    logo: new URL('/favicon.svg', brand.website).toString(),
    description: defaultDescription,
    email: brand.email,
    telephone: brand.phoneNumbers,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dar es Salaam',
      addressCountry: 'TZ',
    },
  })
}

export function setPageMetadata({ title, description, path }) {
  const resolvedTitle = title || defaultTitle
  const rawDescription = description || defaultDescription
  const resolvedDescription = rawDescription.length > 155
    ? `${rawDescription.slice(0, 152).trimEnd()}...`
    : rawDescription
  document.title = resolvedTitle
  setMeta('name', 'description', resolvedDescription)
  setMeta('property', 'og:title', resolvedTitle)
  setMeta('property', 'og:description', resolvedDescription)
  setMeta('property', 'og:url', new URL(path || '/', brand.website).toString())
  setMeta('property', 'og:image', new URL('/og-clm.png', brand.website).toString())
  setMeta('name', 'twitter:title', resolvedTitle)
  setMeta('name', 'twitter:description', resolvedDescription)
  setMeta('name', 'twitter:image', new URL('/og-clm.png', brand.website).toString())
  setCanonical(path || '/')
  setStructuredData()
}

export function applyRouteMetadata(route) {
  const service = route.name === 'service-detail'
    ? serviceLines.find((item) => item.slug === route.params.slug)
    : null
  const guide = route.name === 'toolkit-guide'
    ? toolkitGuides.find((item) => item.slug === route.params.slug)
    : null
  const insight = route.name === 'insight-detail'
    ? insights.find((item) => item.slug === route.params.slug)
    : null
  const sector = route.name === 'sector'
    ? sectors.find((item) => item.slug === route.params.slug)
    : null
  const detail = service || guide || insight || (sector && { title: `${sector.title}: MEL and evaluation`, summary: sector.description })
  const title = detail ? `${detail.title} | CLM Consultants Limited` : route.meta.title
  const description = detail ? (detail.summary || detail.excerpt) : route.meta.description

  setPageMetadata({
    title,
    description,
    path: route.path,
  })
}
