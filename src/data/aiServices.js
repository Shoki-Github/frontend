// AI service groups shown on /ai-opportunities, ordered the way most organisations progress.
export const aiServiceGroups = [
  {
    id: 'ai-advisory',
    step: 'Advise',
    title: 'AI advisory: start here',
    summary: 'Know where AI can help, whether you are ready, and the rules your team should follow, before spending on tools.',
    services: [
      {
        title: 'AI readiness assessment',
        description: 'A structured review of your data, systems, skills, policies and risks, with a readiness scorecard and a clear list of what to fix first.',
        deliverables: ['Readiness scorecard', 'Inventory of AI tools already in use', 'Priority gaps and quick wins'],
      },
      {
        title: 'AI strategy and use-case roadmap',
        description: 'We map your real workflows, score AI use cases on value, effort and risk, and turn the best ones into a phased, costed roadmap.',
        deliverables: ['Ranked use-case portfolio', '90-day and 12-month roadmap', 'Build, buy or configure advice'],
      },
      {
        title: 'Responsible AI policy and governance',
        description: 'A practical AI use policy, risk classification and approval process, aligned to Tanzania’s Personal Data Protection Act and the African Union Continental AI Strategy.',
        deliverables: ['AI acceptable-use policy', 'AI risk register', 'Roles and approval steps'],
      },
    ],
  },
  {
    id: 'generative-ai-adoption',
    step: 'Enable',
    title: 'Generative AI adoption',
    summary: 'Help your people use tools like ChatGPT, Claude, Gemini and Copilot safely and productively in their everyday work.',
    services: [
      {
        title: 'Approved tools and usage guidance',
        description: 'We help you choose approved generative AI tools, set data-handling rules and bring unofficial “shadow AI” use under control.',
        deliverables: ['Tool comparison and recommendation', 'Data-handling rules', 'Staff guidance note'],
      },
      {
        title: 'Prompt libraries for real tasks',
        description: 'Tested prompts and templates for your team’s own work, such as reports, proposals, data summaries and correspondence, in English and Kiswahili.',
        deliverables: ['Task-based prompt library', 'Quality-check checklists', 'Examples using your documents'],
      },
      {
        title: 'AI literacy and leadership briefings',
        description: 'Hands-on training for staff and short briefings for boards and leaders on what AI can and cannot do, and how to govern it.',
        deliverables: ['Role-based training', 'Leadership briefing', 'Certificates of completion'],
      },
    ],
  },
  {
    id: 'ai-integration',
    step: 'Build',
    title: 'AI integration for digital services',
    summary: 'We design and build AI features into the systems and channels you already use, with human review where it matters.',
    services: [
      {
        title: 'Knowledge assistants on your own documents',
        description: 'An assistant that answers questions from your approved policies, reports and manuals (retrieval-augmented generation), citing the source of every answer.',
        deliverables: ['Assistant with source citations', 'Access rules by user', 'Test set to measure accuracy'],
      },
      {
        title: 'WhatsApp and website chat assistants',
        description: 'Chat assistants for common questions in English and Kiswahili on WhatsApp and your website, handing over to a person when needed.',
        deliverables: ['WhatsApp and web chat', 'Hand-over to staff', 'Conversation reports'],
      },
      {
        title: 'Document and form data extraction',
        description: 'Turn PDFs, scanned forms, invoices and reports into structured data, with uncertain results sent to a person for checking.',
        deliverables: ['Extraction workflow', 'Review queue', 'Export to your systems'],
      },
      {
        title: 'Workflow automation',
        description: 'Automate repetitive steps such as sorting requests, drafting replies, updating records and preparing routine reports, with logs and approval steps.',
        deliverables: ['Automated workflow', 'Approval and audit log', 'Handover documentation'],
      },
      {
        title: 'AI in dashboards and MIS',
        description: 'Add plain-language summaries, anomaly alerts and question-answering to your dashboards, KoboToolbox data and management information systems.',
        deliverables: ['AI summaries and alerts', 'Question-answering on your data', 'Data-quality flags'],
      },
    ],
  },
  {
    id: 'agentic-frontier-ai',
    step: 'Explore',
    title: 'Agentic and frontier AI',
    summary: 'Prepare for more capable AI, carefully, with clear limits and human oversight.',
    services: [
      {
        title: 'Supervised AI agent pilots',
        description: 'Small, bounded pilots where AI agents carry out multi-step tasks, such as research, data checks or report preparation, within set permissions and with human approval for important actions.',
        deliverables: ['Agent design and limits', 'Human approval steps', 'Pilot evaluation report'],
      },
      {
        title: 'Frontier AI foresight briefings',
        description: 'Evidence-based briefings for leaders on where advanced AI is heading, including increasingly general and autonomous systems: scenarios, risks, opportunities and how to prepare. No hype, no promises.',
        deliverables: ['Leadership briefing', 'Scenarios for your sector', 'Preparation checklist'],
      },
    ],
  },
]

export const aiPackages = [
  {
    title: 'Leadership AI Briefing',
    duration: 'Half day',
    description: 'For boards and leadership teams: practical AI opportunities, risks and the rules to set first.',
    includes: ['Interactive briefing', 'Your top AI opportunities', 'Draft AI policy outline'],
  },
  {
    title: 'AI Readiness Sprint',
    duration: 'Typically 2–3 weeks',
    description: 'Find out where you stand and what to do first, with a ranked list of use cases and a 90-day plan.',
    includes: ['Readiness scorecard', 'Ranked use cases', '90-day roadmap'],
  },
  {
    title: 'AI Pilot',
    duration: 'Typically 6–8 weeks',
    description: 'Build and test one AI solution, such as a knowledge assistant or document extraction, on your own data.',
    includes: ['Working pilot', 'Accuracy and value evaluation', 'Scale-up recommendation'],
  },
]

export const aiPrinciples = [
  { title: 'Human in charge', description: 'People review AI outputs before they are used for important decisions.' },
  { title: 'Your data stays protected', description: 'We follow the Personal Data Protection Act and agree data rules with you before any work starts.' },
  { title: 'Measured, not assumed', description: 'Every AI solution is tested for accuracy and value, so you know it works.' },
  { title: 'Built to be owned', description: 'We document everything and train your team to run it.' },
]
