// Insights shown on /insights and the homepage. Rewritten from the three
// articles first published on the old WordPress site on 24 March 2026.
// Body text: paragraphs separated by a blank line.
export const insights = [
  {
    slug: 'stunting-48-to-30',
    type: 'data-brief',
    title: 'Stunting fell from 48% to 30%. Tracking the rest of the way is harder',
    category: 'Data brief · Health',
    published_at: '2026-11-27',
    author: 'CLM Consultants Limited',
    reading_time: 2,
    excerpt: 'Tanzania cut child stunting by 18 percentage points between 1999 and 2022. The survey that measures it comes every five to seven years, so yearly results reporting needs better evidence in between.',
    chart: {
      title: 'Stunting among children under five, Tanzania (%)',
      unit: '%',
      max: 50,
      points: [
        { x: 1999, label: '1999', value: 48 },
        { x: 2004.5, label: '2004–05', value: 44 },
        { x: 2010, label: '2010', value: 42 },
        { x: 2015.5, label: '2015–16', value: 34 },
        { x: 2022, label: '2022', value: 30 },
      ],
      source: 'Source: Tanzania Demographic and Health Survey and Malaria Indicator Survey 2022, Key Indicators Report (MoH, NBS, OCGS and ICF), trend figure for 1999–2022.',
      sourceUrl: 'https://dhsprogram.com/pubs/pdf/PR144/PPR144.pdf',
    },
    body: `Three in ten Tanzanian children under five were stunted in 2022, down from almost one in two in 1999. That is real progress on a core measure of Dira 2050's second pillar, human capabilities and social development.

The national average hides wide gaps. Stunting was 30.4% on the Mainland and 17.6% in Zanzibar, and 37.5% in the South West Highlands zone. Boys were more affected than girls: 33.3% against 26.6%.

For anyone reporting results, the harder problem is timing. The survey behind these figures ran in 1999, 2004–05, 2010, 2015–16 and 2022: gaps of five to seven years. FYDP IV asks for monthly, quarterly and annual results reporting. Between surveys, programmes must rely on routine data, such as growth monitoring at health facilities, or on their own surveys.

Three practical lessons follow:

• Check routine data before it becomes a national number. Growth-monitoring records are only useful if weights, heights and ages are recorded consistently.
• Report the breakdown, not only the average. Regional and sex differences show where effort is needed most.
• Claim contribution, not attribution. Many programmes work on nutrition at once; a credible results story shows how yours contributed.

This is the first of our monthly data briefs: one official indicator, one chart, and what it means for measuring results.`,
  },
  {
    slug: 'from-monitoring-to-impact',
    title: 'A MEL system earns its cost only when it changes decisions',
    category: 'MEL systems',
    published_at: '2026-03-24',
    author: 'CLM Consultants Limited',
    reading_time: 3,
    excerpt: 'Plenty of programmes collect monitoring data and learn little from it. Five things separate a system that informs decisions from one that only fills reports.',
    body: `Most organisations we work with already monitor their activities. They count trainings held, people reached and funds spent. The harder question is whether any of this changes what they decide to do next. A monitoring, evaluation and learning (MEL) system earns its cost only when it does.

Monitoring tells you whether activities are happening as planned. It is necessary, but on its own it rarely explains why results are, or are not, appearing. That is the job of evaluation: asking whether the programme is relevant, effective and likely to last, and testing the assumptions in your theory of change.

Learning is where the two meet. It means setting aside regular moments, such as quarterly reviews or after-action discussions, where staff and partners look at the evidence together and agree what to adjust. Without those moments, even good data sits unused in spreadsheets.

In practice, a useful MEL system usually has five things in place:

• A clear results framework that links activities to outcomes, with a small set of indicators that matter.
• Simple, reliable data collection, often digital (for example KoboToolbox or ODK), with basic quality checks.
• Dashboards or short reports that managers can read in minutes, not hours.
• Evaluation questions agreed at the start, not invented at the end.
• Scheduled learning reviews, with decisions and follow-up actions recorded.

Digital tools help, but they are not the system. A well-designed paper form used consistently beats an expensive platform nobody trusts. Start with the decisions you need to make, work back to the evidence those decisions require, and build only what you will use.

If you are reviewing or setting up a MEL system and want a second view, we are happy to talk it through.`,
  },
  {
    slug: 'transforming-data-into-decisions',
    title: 'Start with the decision, not the dashboard',
    category: 'Data & BI',
    published_at: '2026-03-24',
    author: 'CLM Consultants Limited',
    reading_time: 3,
    excerpt: 'Data has value only when someone uses it to decide something. Four steps, taken in the right order, turn raw data into better management.',
    body: `Organisations generate more data every year, from programme records and surveys to finance and service systems. Yet many managers still make key decisions on instinct, because the data they need is scattered, late or hard to read. Closing that gap is less about technology and more about working in the right order.

1. Start with the decisions, not the data.
List the five to ten recurring decisions your managers make, such as where to deploy staff, which sites need support or when to adjust a budget. For each, ask what information would make the decision better. This keeps you from building dashboards nobody opens.

2. Get the foundations right.
Decisions are only as good as the data behind them. Agree clear definitions for each indicator, decide who collects what and when, and add simple quality checks. Consistent, accurate data in one place matters more than volume.

3. Make it visual and timely.
Business intelligence tools such as Power BI or Looker Studio turn tables into dashboards that show trends and exceptions at a glance. Keep each view focused on one audience and one set of decisions, and refresh it often enough to be useful.

4. Build the habit of use.
Train staff to read and question the numbers, and put dashboards on the agenda of regular management meetings. A culture of using evidence grows from repeated, practical use, not from a single launch event.

Done in this order, even a modest investment can change how an organisation manages. Done in reverse, starting with the tool, it often produces impressive dashboards that are rarely used.`,
  },
  {
    slug: 'digital-solutions-that-drive-results',
    title: 'Why new digital systems get abandoned, and how to avoid it',
    category: 'Digital & IT',
    published_at: '2026-03-24',
    author: 'CLM Consultants Limited',
    reading_time: 3,
    excerpt: 'Systems are often bought, launched and then quietly dropped. A short checklist for choosing and introducing tools that people keep using.',
    body: `Digital tools are now part of how almost every organisation works, from data collection apps and dashboards to cloud storage and automated reporting. The promise is better efficiency and service. The reality is often a system that is bought, launched and then quietly abandoned. A few principles make the difference.

Begin with the problem.
Describe the specific bottleneck you want to fix, such as late reports, duplicated data entry or lost records, and how you will know it is fixed. If you cannot state the problem in one or two sentences, it is too early to choose a tool.

Fit the tool to your context.
Consider connectivity, devices, staff skills, language and budget for maintenance, not just purchase. A simpler tool that works offline and in Kiswahili may serve field teams far better than a sophisticated platform.

Plan integration and security early.
New systems should connect to the ones you already rely on, so data is entered once. Agree who can see and change what, how data is backed up, and how personal information is protected.

Invest in people, not only software.
Budget time for training, quick-reference guides and follow-up support. Name an internal owner for each system who can answer questions and push for improvements.

Measure whether it worked.
Return to the problem you described at the start. If reporting time, errors or costs have not improved after a few months, adjust or change course rather than adding more features.

Technology is most valuable when it quietly supports good management. Chosen and introduced with care, it frees your team to spend more time on the work that matters.`,
  },
]
