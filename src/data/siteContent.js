export const brand = {
  name: 'CLM Consultants Limited',
  legalName: 'CLM Consultants Limited',
  tagline: 'Building Better Solutions for a Sustainable Future.',
  address: 'Dar es Salaam, Tanzania',
  email: 'info@clmconsultants.co.tz',
  directorEmail: 'pshoki@clmconsultants.co.tz',
  phoneNumbers: ['+255 765 785 383', '+255 685 993 590'],
  website: 'https://clmconsultants.co.tz',
  // Shown on the capability statement.
  registrationNumber: 'BRELA 152652259 (incorporated 13 July 2021)',
  tin: '152-652-259',
}

export const homeContent = {
  title: 'Shaping Better Decisions For A Sustainable Future',
  intro: 'CLM Consultants Limited combines monitoring and evaluation, data systems, artificial intelligence and local expertise to help organisations turn evidence into practical action.',
  audiences: [
    {
      title: 'Government ministries, departments and agencies',
      description: 'MEL, evaluation and data support for public programmes and institutions.',
    },
    {
      title: 'NGOs and civil society organisations',
      description: 'Practical support for research, evaluation and organisational learning.',
    },
    {
      title: 'Development partners and foundations',
      description: 'Evidence and learning support for programmes and partnerships.',
    },
    {
      title: 'Private companies and business associations',
      description: 'Data, dashboards and measures that support business decisions.',
    },
    {
      title: 'Universities and research institutions',
      description: 'Research, evaluation and learning support for academic institutions.',
    },
  ],
  serviceCategories: [
    {
      title: 'Monitoring, Evaluation and Learning',
      summary: 'Strengthen MEL systems, evaluate programmes and use findings to improve performance.',
      href: '/services/mel-systems-evaluation',
    },
    {
      title: 'AI for MEL',
      summary: 'Use AI to speed up data collection, analysis and reporting in your MEL system, responsibly and in Kiswahili or English.',
      href: '/ai-opportunities',
    },
    {
      title: 'Business Intelligence and Dashboards',
      summary: 'Turn your data into accessible dashboards and useful management information.',
      href: '/services/data-dashboards-bi',
    },
    {
      title: 'Training and Capacity Building',
      summary: 'Equip your team with practical MEL, data and AI skills.',
      href: '/services/training-capacity',
    },
  ],
  // "Where are you right now?" entry points: a buyer at a moment with a
  // problem, each leading to the offer that fits.
  buyerMoments: [
    { question: 'Donor report due and your data is still in spreadsheets?', offerId: 'digital-mel-90-days' },
    { question: 'A mid-term or final evaluation coming up?', offerId: 'evaluations-that-get-used' },
    { question: 'Lenders or investors asking for results reporting?', offerId: 'digital-mel-90-days' },
  ],
  // Delivery commitments shown under "How we work" (from the strategy's
  // "what we refuse" choices).
  promises: [
    { title: 'No report without a findings workshop', detail: 'You test and shape the findings with us before anything is final.' },
    { title: 'No dashboard before definitions', detail: 'We agree what each indicator means and how it is checked before we build.' },
    { title: 'We do not walk away', detail: 'Every assignment ends with a 30-day check or a follow-up review.' },
    { title: 'English or Kiswahili', detail: 'Workshops, tools and reports in the language your team works in.' },
  ],
  // The two offers the homepage leads with. Each: what changes for the
  // client (outcome), who it is for, the repeatable steps (mechanism) and
  // the results we track. No result figures are claimed here; add real ones
  // from completed assignments as case studies.
  signatureOffers: [
    {
      id: 'digital-mel-90-days',
      label: 'Signature offer 1',
      title: 'Digital MEL in 90 Days',
      outcome: 'Move your programme from paper forms and scattered spreadsheets to live, reliable reporting that your managers actually use, in about 90 days.',
      forWhom: 'NGOs, projects, public agencies and private-sector companies whose reporting is late, manual or hard to trust.',
      steps: [
        { name: 'Diagnose', timing: 'Weeks 1–2', detail: 'Review your results framework, data flows and the reports you owe.' },
        { name: 'Design', timing: 'Weeks 3–4', detail: 'Agree indicators, clear definitions and simple data-quality checks.' },
        { name: 'Build', timing: 'Weeks 5–9', detail: 'Set up digital data collection (KoBoToolbox or ODK) and a Power BI dashboard.' },
        { name: 'Train and launch', timing: 'Weeks 10–12', detail: 'Train your team and run the first live reporting cycle together.' },
        { name: '30-day check', timing: 'After launch', detail: 'Review how the system is used, fix gaps and hand over fully.' },
      ],
      results: [
        'Share of indicators reported on time',
        'Days needed to produce a routine report, before and after',
        'Dashboard used in management meetings',
        'Data-quality issues found and fixed',
      ],
      topic: 'Digital MEL in 90 Days',
      learnMore: '/services/data-dashboards-bi',
    },
    {
      id: 'evaluations-that-get-used',
      label: 'Signature offer 2',
      title: 'Evaluations That Get Used',
      outcome: 'An independent evaluation whose recommendations become management decisions and tracked actions, not a report that sits on a shelf.',
      forWhom: 'Programmes, development partners, public institutions and private-sector companies commissioning baseline, mid-term or final evaluations.',
      steps: [
        { name: 'Questions that matter', timing: 'Inception', detail: 'Link evaluation questions to decisions you need to make, using the OECD-DAC criteria.' },
        { name: 'Credible evidence', timing: 'Fieldwork', detail: 'Mixed methods, household surveys and comparison groups where the design needs them.' },
        { name: 'Findings workshop', timing: 'Analysis', detail: 'Test and refine findings with your staff and partners before the final report.' },
        { name: 'Management response', timing: 'Reporting', detail: 'Each recommendation accepted, adapted or declined, with an owner and a date.' },
        { name: 'Follow-up tracking', timing: '3–6 months', detail: 'Track actions with our Evidence-to-Action tool and review progress together.' },
      ],
      results: [
        'Recommendations with an agreed management response',
        'Actions completed at the follow-up review',
        'Decisions recorded from the evaluation',
      ],
      topic: 'Evaluations That Get Used',
      learnMore: '/ai-opportunities#evidence-to-action-pilot',
    },
  ],
  featuredOffer: {
    title: 'Turn evaluation findings into action.',
    description: 'Our AI-enabled Evidence-to-Action Pilot helps your organisation organise recommendations, record management decisions and track follow-up actions.',
    href: '/ai-opportunities#evidence-to-action-pilot',
  },
  experienceHighlight: {
    client: 'Oxfam GB',
    period: '2016',
    title: 'Smallholder livelihoods evaluation',
    description: 'As an individual consultant to Oxfam GB, Pantaleon Shoki managed field survey work across nine wards in Dodoma and Morogoro. The study covered 660 households in total, including project participants and a comparison group.',
    households: 660,
  },
  reasons: [
    {
      title: 'Local depth, international standards.',
      description: 'Led by a director with more than 30 years of monitoring, evaluation and learning experience across Tanzania and East Africa, grounded in local context and aligned with international standards.',
    },
    {
      title: 'From data to decisions.',
      description: 'We build the dashboards and routines that keep evidence in use.',
    },
    {
      title: 'Bilingual by default.',
      description: 'We work and deliver in English and Kiswahili.',
    },
  ],
  callToAction: {
    title: 'What would you like to improve?',
    description: 'Tell us about your evaluation, data, reporting or organisational performance challenge. We will discuss the support that best fits your needs.',
  },
}

export const aboutContent = {
  intro: 'CLM Consultants Limited is a Tanzanian consulting firm, incorporated in Dar es Salaam in 2021, specialising in monitoring, evaluation and learning, data systems and sustainability reporting. We help public institutions, development partners and businesses measure what matters, learn from it and show results with confidence.',
  purpose: 'Building Better Solutions for a Sustainable Future.',
  principles: [
    {
      title: 'Start with the decision.',
      description: 'Every indicator and dashboard we design answers a question someone actually has to decide.',
    },
    {
      title: 'Build capability, not dependency.',
      description: 'We train client teams so systems keep running after we leave.',
    },
    {
      title: 'Evidence with integrity.',
      description: 'Independent, transparent methods aligned to recognised evaluation standards.',
    },
  ],
  founder: {
    name: 'Pantaleon Shoki',
    role: 'Founder & Director',
    biography: 'Pantaleon is a monitoring, evaluation and learning practitioner with more than 30 years of experience across Tanzania and East Africa. He holds a BA in Economics from the University of Dar es Salaam and an MA in Monitoring and Evaluation from the Open University of Tanzania, and is a PhD candidate in Monitoring, Measurement and Evaluation at EUCLID University. He is a member of the Tanzania Evaluation Association (TanEA), where he serves as Executive Secretary. His work includes leading evaluations, designing national and institutional MEL systems, and building public- and private-sector teams’ capacity to use evidence.',
  },
  team: 'CLM draws on a network of specialists in statistics, data engineering, gender, ESG and sector expertise, assembled for each assignment.',
}

export const sectors = [
  {
    title: 'Health',
    description: 'M&E for health programmes and facilities, including indicators, routine data and programme evaluations.',
  },
  {
    title: 'Agriculture & livelihoods',
    description: 'Household surveys and evaluations of smallholder, market and livelihoods programmes.',
  },
  {
    title: 'Education & skills',
    description: 'Results frameworks, learning reviews and evaluations for education, youth and skills programmes.',
  },
  {
    title: 'Governance & public sector',
    description: 'MEL systems for ministries, departments and agencies, aligned to Dira 2050 and the Five-Year Development Plan.',
  },
]

export const evaluationMethods = [
  { title: 'OECD-DAC criteria', description: 'Relevance, coherence, effectiveness, efficiency, impact and sustainability.' },
  { title: 'Theory-based evaluation', description: 'Testing the causal pathway and assumptions in the theory of change.' },
  { title: 'Counterfactual designs', description: 'Comparison-group and quasi-experimental designs where they fit the question and budget.' },
  { title: 'Contribution analysis', description: 'Building a credible case for how the programme contributed to observed change.' },
  { title: 'Outcome harvesting', description: 'Collecting evidence of outcomes, then working back to how the programme contributed.' },
  { title: 'Most Significant Change', description: 'Participatory collection and selection of stories of change.' },
  { title: 'Value for money', description: 'Assessing economy, efficiency, effectiveness and equity (the 4Es).' },
  { title: 'Mixed-methods data collection', description: 'Surveys, key informant interviews, focus groups and document review.' },
]

export const specialistOffers = [
  {
    title: 'MEL system review & data quality assessment',
    description: 'An independent check of your indicators, data flows, tools and reporting, with a practical improvement plan.',
    href: '/services/mel-systems-evaluation',
  },
  {
    title: 'Baseline, midline & endline surveys',
    description: 'Household and institutional surveys with digital field data collection (KoboToolbox, ODK) and quality checks.',
    href: '/services/mel-systems-evaluation',
  },
  {
    title: 'Learning partnerships',
    description: 'A critical friend alongside your programme, running learning agendas and reflection sessions.',
    href: '/services/mel-systems-evaluation',
  },
  {
    title: 'Value for money assessments',
    description: 'Evidence on economy, efficiency, effectiveness and equity for funders and boards.',
    href: '/services/mel-systems-evaluation',
  },
]

export const workshopFormats = [
  { title: 'Half-day briefing', description: 'For leaders and boards: what good MEL looks like and how to use evidence in decisions.' },
  { title: 'One-day workshop', description: 'A hands-on day on one skill, such as indicators, theory of change or data quality.' },
  { title: 'Week-long course', description: 'A full course with practical exercises using your own programme and data.' },
  { title: 'Mentoring follow-up', description: 'On-the-job support after training so new skills are applied at work.' },
]

export const serviceFaqs = [
  {
    question: 'How do you price assignments?',
    answer: 'Fees depend on scope, duration and team. After a short scoping call we send a written proposal with a fixed fee or day-rate breakdown.',
  },
  {
    question: 'Is the first consultation free?',
    answer: 'Yes. The first 30-minute scoping conversation is free and without obligation.',
  },
  {
    question: 'Do you work outside Tanzania?',
    answer: 'Yes, across East Africa and remotely elsewhere.',
  },
  {
    question: 'Can you work in Kiswahili?',
    answer: 'Yes. Tools, training and reports can be delivered in English, Kiswahili or both.',
  },
  {
    question: 'Do you work with procurement processes (tenders, EOIs)?',
    answer: 'Yes. We regularly respond to RFPs and expressions of interest. Our capability statement is available on the Capability Statement page and can be saved as a PDF.',
  },
]
