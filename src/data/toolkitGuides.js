// Short practical MEL guides shown on /toolkit. Review wording before launch.
export const toolkitGuides = [
  {
    slug: 'theory-of-change',
    title: 'Theory of Change: a practical starting point',
    category: 'MEL systems',
    readingTime: '5 min read',
    summary: 'What a theory of change is, why it matters, and five steps to build one your team will actually use.',
    serviceSlug: 'mel-systems-evaluation',
    sections: [
      {
        heading: 'What it is',
        paragraphs: [
          'A theory of change explains how and why your activities are expected to lead to the change you want to see. It links what you do (activities and outputs) to the results you are aiming for (outcomes and impact), and it states the assumptions that must hold for each link to work.',
          'It is not just a diagram for a proposal. A good theory of change is a working tool that guides what you measure, what you evaluate and what you learn.',
        ],
      },
      {
        heading: 'Five steps to build one',
        list: [
          'Start with the long-term change. Agree, in plain language, the change you want to see for people or institutions.',
          'Work backwards. Ask "what must be true before this can happen?" until you reach changes your programme can directly influence.',
          'Place your activities. Show which activities contribute to which early changes, and where others (government, partners, markets) also play a role.',
          'Name the assumptions. For each important link, write down what must hold true. These become your learning questions.',
          'Test it with the people involved. Check the logic with staff, partners and participants, and revise it.',
        ],
      },
      {
        heading: 'Common pitfalls',
        list: [
          'Treating it as a one-off design document instead of revisiting it at reviews.',
          'Jumping from activities straight to impact with no intermediate changes.',
          'Hiding assumptions, so nobody tests the riskiest parts of the logic.',
        ],
      },
      {
        heading: 'Using it in practice',
        paragraphs: [
          'Use your theory of change to choose indicators at each level, set evaluation questions, and plan regular reflection sessions. When the evidence shows an assumption does not hold, update the theory and the programme together.',
        ],
      },
    ],
  },
  {
    slug: 'writing-good-indicators',
    title: 'Writing indicators that are worth measuring',
    category: 'MEL systems',
    readingTime: '5 min read',
    summary: 'How to write clear, measurable indicators and document them in an indicator reference sheet.',
    serviceSlug: 'mel-systems-evaluation',
    sections: [
      {
        heading: 'Start with the decision',
        paragraphs: [
          'An indicator is only useful if someone will use it to make a decision. Before writing one, ask: who needs this information, how often, and what would they do differently depending on the answer?',
        ],
      },
      {
        heading: 'Qualities of a good indicator',
        list: [
          'Specific: it measures one thing, described precisely.',
          'Measurable: there is a practical way to collect the data at an acceptable cost.',
          'Relevant: it reflects the result in your theory of change, not just activity.',
          'Time-bound: it has a clear reporting period and target date.',
          'Disaggregated where it matters: for example by sex, age, location or disability.',
        ],
      },
      {
        heading: 'The indicator reference sheet',
        paragraphs: ['Document each indicator so that anyone can collect and calculate it the same way. A reference sheet usually records:'],
        list: [
          'Definition, unit of measure and how it is calculated',
          'Data source, collection method and frequency',
          'Who is responsible for collecting and reporting it',
          'Baseline value, targets and disaggregation',
          'Known data limitations and quality checks',
        ],
      },
      {
        heading: 'Keep the set small',
        paragraphs: [
          'Many MEL systems fail because they track too many indicators. A smaller set that is collected reliably and reviewed regularly is far more valuable than a long list nobody uses.',
        ],
      },
    ],
  },
  {
    slug: 'oecd-dac-criteria',
    title: 'The OECD-DAC evaluation criteria in plain language',
    category: 'Evaluation',
    readingTime: '4 min read',
    summary: 'The six criteria most evaluations use, what each one asks, and how to apply them sensibly.',
    serviceSlug: 'mel-systems-evaluation',
    sections: [
      {
        heading: 'Why the criteria matter',
        paragraphs: [
          'The OECD Development Assistance Committee criteria give evaluations a shared structure. They were revised in 2019, adding coherence. They are a lens for asking good questions, not a checklist that every evaluation must cover equally.',
        ],
      },
      {
        heading: 'The six criteria',
        list: [
          'Relevance: is the intervention doing the right things for the people and institutions it serves?',
          'Coherence: how well does it fit with other interventions, policies and plans in the same context?',
          'Effectiveness: is it achieving its objectives, and for whom?',
          'Efficiency: how well are resources being used to deliver results on time?',
          'Impact: what difference is it making, including unintended effects?',
          'Sustainability: will the benefits last after support ends?',
        ],
      },
      {
        heading: 'Applying them well',
        list: [
          'Choose the criteria that matter most for the decisions the evaluation must inform.',
          'Turn each criterion into a few specific evaluation questions.',
          'Match methods to questions: impact questions usually need a stronger design than relevance questions.',
          'Agree with the commissioner up front how findings will be used.',
        ],
      },
    ],
  },
  {
    slug: 'data-quality-checks',
    title: 'Five checks for data you can trust',
    category: 'Data',
    readingTime: '4 min read',
    summary: 'A simple way to assess whether your monitoring data is good enough to base decisions on.',
    serviceSlug: 'data-dashboards-bi',
    sections: [
      {
        heading: 'Why data quality matters',
        paragraphs: [
          'Dashboards and reports are only as good as the data behind them. A short, regular data quality check catches problems before they reach managers and funders.',
        ],
      },
      {
        heading: 'The five checks',
        list: [
          'Validity: does the data measure what the indicator says it measures?',
          'Reliability: is it collected the same way every time, by every person and site?',
          'Timeliness: is it available in time to inform decisions?',
          'Precision: is it detailed enough, with errors small enough, for the decision at hand?',
          'Integrity: is it protected from error, manipulation and unauthorised change?',
        ],
      },
      {
        heading: 'Making it routine',
        list: [
          'Recount a sample of reported figures against source records each quarter.',
          'Use validation rules in digital forms (for example KoboToolbox or ODK) to stop obvious errors at entry.',
          'Keep a short log of known data issues and how they were resolved.',
          'Train data collectors on definitions from the indicator reference sheets.',
        ],
      },
    ],
  },
  {
    slug: 'learning-reviews',
    title: 'Running a learning review your team will value',
    category: 'Learning',
    readingTime: '4 min read',
    summary: 'A simple structure for reflection sessions that turn evidence into decisions and action.',
    serviceSlug: 'mel-systems-evaluation',
    sections: [
      {
        heading: 'What a learning review is',
        paragraphs: [
          'A learning review is a short, structured session where a team looks at its evidence, makes sense of it together and agrees what to change. It can follow a quarter, a milestone or an evaluation.',
        ],
      },
      {
        heading: 'Four questions to structure the session',
        list: [
          'What did we plan to happen?',
          'What actually happened, according to our data and experience?',
          'Why was there a difference?',
          'What will we keep, change or stop doing?',
        ],
      },
      {
        heading: 'Making it work',
        list: [
          'Share the data before the session so people come prepared.',
          'Include people closest to the work, not just managers.',
          'Create space for honest discussion of what did not work.',
          'End with clear actions, owners and dates, and check on them at the next review.',
        ],
      },
      {
        heading: 'Linking learning to decisions',
        paragraphs: [
          'Record decisions and actions in one place so the next review starts by checking what happened. Over time, this record shows funders and leaders that the organisation learns and adapts.',
        ],
      },
    ],
  },
]
