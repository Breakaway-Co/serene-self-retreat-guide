import { ScreeningTool } from '../types/screening';

export const screeningTools: Record<string, ScreeningTool> = {
  'AUDIT-C': {
    id: 'AUDIT-C',
    name: 'Alcohol Use Disorders Identification Test - Consumption',
    acronym: 'AUDIT-C',
    description: 'A brief screening tool for identifying hazardous drinking and alcohol use disorders.',
    questions: [
      {
        id: 'audit_c_1',
        text: 'How often do you have a drink containing alcohol?',
        type: 'single-choice',
        required: true,
        options: [
          { id: 'never', text: 'Never', value: 0 },
          { id: 'monthly', text: 'Monthly or less', value: 1 },
          { id: 'weekly', text: '2-4 times a month', value: 2 },
          { id: 'biweekly', text: '2-3 times a week', value: 3 },
          { id: 'daily', text: '4 or more times a week', value: 4 }
        ]
      },
      {
        id: 'audit_c_2',
        text: 'How many drinks containing alcohol do you have on a typical day when you are drinking?',
        type: 'single-choice',
        required: true,
        options: [
          { id: 'one_two', text: '1 or 2', value: 0 },
          { id: 'three_four', text: '3 or 4', value: 1 },
          { id: 'five_six', text: '5 or 6', value: 2 },
          { id: 'seven_nine', text: '7 to 9', value: 3 },
          { id: 'ten_plus', text: '10 or more', value: 4 }
        ]
      },
      {
        id: 'audit_c_3',
        text: 'How often do you have six or more drinks on one occasion?',
        type: 'single-choice',
        required: true,
        options: [
          { id: 'never', text: 'Never', value: 0 },
          { id: 'monthly', text: 'Less than monthly', value: 1 },
          { id: 'monthly_reg', text: 'Monthly', value: 2 },
          { id: 'weekly', text: 'Weekly', value: 3 },
          { id: 'daily', text: 'Daily or almost daily', value: 4 }
        ]
      }
    ],
    scoring: {
      method: 'sum',
      maxScore: 12
    },
    interpretation: [
      {
        range: [0, 3],
        level: 'low',
        description: 'Low risk for alcohol use disorder',
        recommendations: ['Continue current practices', 'Be mindful of alcohol consumption']
      },
      {
        range: [4, 7],
        level: 'moderate',
        description: 'Moderate risk - hazardous drinking pattern',
        recommendations: ['Consider reducing alcohol consumption', 'Monitor drinking patterns', 'Seek brief intervention if needed']
      },
      {
        range: [8, 12],
        level: 'high',
        description: 'High risk - likely alcohol use disorder',
        recommendations: ['Seek professional assessment', 'Consider specialized treatment', 'Medical supervision may be required']
      }
    ]
  },

  'DAST-10': {
    id: 'DAST-10',
    name: 'Drug Abuse Screening Test - 10 Item',
    acronym: 'DAST-10',
    description: 'A screening tool for problems related to drug use and substance abuse.',
    questions: [
      {
        id: 'dast_1',
        text: 'Have you used drugs other than those required for medical reasons?',
        type: 'boolean',
        required: true,
        options: [
          { id: 'no', text: 'No', value: 0 },
          { id: 'yes', text: 'Yes', value: 1 }
        ]
      },
      {
        id: 'dast_2',
        text: 'Do you abuse more than one drug at a time?',
        type: 'boolean',
        required: true,
        options: [
          { id: 'no', text: 'No', value: 0 },
          { id: 'yes', text: 'Yes', value: 1 }
        ]
      },
      {
        id: 'dast_3',
        text: 'Are you always able to stop using drugs when you want to?',
        type: 'boolean',
        required: true,
        options: [
          { id: 'yes', text: 'Yes', value: 0 },
          { id: 'no', text: 'No', value: 1 }
        ]
      },
      {
        id: 'dast_4',
        text: 'Have you had "blackouts" or "flashbacks" as a result of drug use?',
        type: 'boolean',
        required: true,
        options: [
          { id: 'no', text: 'No', value: 0 },
          { id: 'yes', text: 'Yes', value: 1 }
        ]
      },
      {
        id: 'dast_5',
        text: 'Do you ever feel bad or guilty about your drug use?',
        type: 'boolean',
        required: true,
        options: [
          { id: 'no', text: 'No', value: 0 },
          { id: 'yes', text: 'Yes', value: 1 }
        ]
      },
      {
        id: 'dast_6',
        text: 'Does your spouse (or parents) ever complain about your involvement with drugs?',
        type: 'boolean',
        required: true,
        options: [
          { id: 'no', text: 'No', value: 0 },
          { id: 'yes', text: 'Yes', value: 1 }
        ]
      },
      {
        id: 'dast_7',
        text: 'Have you neglected your family because of your use of drugs?',
        type: 'boolean',
        required: true,
        options: [
          { id: 'no', text: 'No', value: 0 },
          { id: 'yes', text: 'Yes', value: 1 }
        ]
      },
      {
        id: 'dast_8',
        text: 'Have you engaged in illegal activities in order to obtain drugs?',
        type: 'boolean',
        required: true,
        options: [
          { id: 'no', text: 'No', value: 0 },
          { id: 'yes', text: 'Yes', value: 1 }
        ]
      },
      {
        id: 'dast_9',
        text: 'Have you ever experienced withdrawal symptoms (felt sick) when you stopped taking drugs?',
        type: 'boolean',
        required: true,
        options: [
          { id: 'no', text: 'No', value: 0 },
          { id: 'yes', text: 'Yes', value: 1 }
        ]
      },
      {
        id: 'dast_10',
        text: 'Have you had medical problems as a result of your drug use?',
        type: 'boolean',
        required: true,
        options: [
          { id: 'no', text: 'No', value: 0 },
          { id: 'yes', text: 'Yes', value: 1 }
        ]
      }
    ],
    scoring: {
      method: 'sum',
      maxScore: 10
    },
    interpretation: [
      {
        range: [0, 2],
        level: 'low',
        description: 'Low level of problems related to drug use',
        recommendations: ['Continue current practices', 'Maintain awareness of substance use']
      },
      {
        range: [3, 5],
        level: 'moderate',
        description: 'Moderate level of problems related to drug use',
        recommendations: ['Consider reducing substance use', 'Monitor patterns', 'Consider counseling']
      },
      {
        range: [6, 10],
        level: 'high',
        description: 'Substantial problems related to drug use',
        recommendations: ['Seek professional assessment', 'Consider specialized treatment', 'Immediate intervention recommended']
      }
    ]
  },

  'GAD-7': {
    id: 'GAD-7',
    name: 'Generalized Anxiety Disorder 7-item Scale',
    acronym: 'GAD-7',
    description: 'A screening tool for generalized anxiety disorder and anxiety symptom severity.',
    questions: [
      {
        id: 'gad_1',
        text: 'Feeling nervous, anxious, or on edge',
        type: 'scale',
        required: true,
        options: [
          { id: 'not_at_all', text: 'Not at all', value: 0 },
          { id: 'several_days', text: 'Several days', value: 1 },
          { id: 'more_than_half', text: 'More than half the days', value: 2 },
          { id: 'nearly_every_day', text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'gad_2',
        text: 'Not being able to stop or control worrying',
        type: 'scale',
        required: true,
        options: [
          { id: 'not_at_all', text: 'Not at all', value: 0 },
          { id: 'several_days', text: 'Several days', value: 1 },
          { id: 'more_than_half', text: 'More than half the days', value: 2 },
          { id: 'nearly_every_day', text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'gad_3',
        text: 'Worrying too much about different things',
        type: 'scale',
        required: true,
        options: [
          { id: 'not_at_all', text: 'Not at all', value: 0 },
          { id: 'several_days', text: 'Several days', value: 1 },
          { id: 'more_than_half', text: 'More than half the days', value: 2 },
          { id: 'nearly_every_day', text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'gad_4',
        text: 'Trouble relaxing',
        type: 'scale',
        required: true,
        options: [
          { id: 'not_at_all', text: 'Not at all', value: 0 },
          { id: 'several_days', text: 'Several days', value: 1 },
          { id: 'more_than_half', text: 'More than half the days', value: 2 },
          { id: 'nearly_every_day', text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'gad_5',
        text: 'Being so restless that it is hard to sit still',
        type: 'scale',
        required: true,
        options: [
          { id: 'not_at_all', text: 'Not at all', value: 0 },
          { id: 'several_days', text: 'Several days', value: 1 },
          { id: 'more_than_half', text: 'More than half the days', value: 2 },
          { id: 'nearly_every_day', text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'gad_6',
        text: 'Becoming easily annoyed or irritable',
        type: 'scale',
        required: true,
        options: [
          { id: 'not_at_all', text: 'Not at all', value: 0 },
          { id: 'several_days', text: 'Several days', value: 1 },
          { id: 'more_than_half', text: 'More than half the days', value: 2 },
          { id: 'nearly_every_day', text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'gad_7',
        text: 'Feeling afraid, as if something awful might happen',
        type: 'scale',
        required: true,
        options: [
          { id: 'not_at_all', text: 'Not at all', value: 0 },
          { id: 'several_days', text: 'Several days', value: 1 },
          { id: 'more_than_half', text: 'More than half the days', value: 2 },
          { id: 'nearly_every_day', text: 'Nearly every day', value: 3 }
        ]
      }
    ],
    scoring: {
      method: 'sum',
      maxScore: 21
    },
    interpretation: [
      {
        range: [0, 4],
        level: 'low',
        description: 'Minimal anxiety symptoms',
        recommendations: ['No specific intervention needed', 'Continue self-care practices']
      },
      {
        range: [5, 9],
        level: 'moderate',
        description: 'Mild anxiety symptoms',
        recommendations: ['Consider stress management techniques', 'Monitor symptoms', 'Self-help resources may be beneficial']
      },
      {
        range: [10, 14],
        level: 'moderate',
        description: 'Moderate anxiety symptoms',
        recommendations: ['Consider professional consultation', 'Therapy may be beneficial', 'Monitor for worsening symptoms']
      },
      {
        range: [15, 21],
        level: 'high',
        description: 'Severe anxiety symptoms',
        recommendations: ['Seek professional treatment', 'Consider medication evaluation', 'Immediate intervention recommended']
      }
    ]
  },

  'PHQ-9': {
    id: 'PHQ-9',
    name: 'Patient Health Questionnaire-9',
    acronym: 'PHQ-9',
    description: 'A screening tool for depression and depression symptom severity.',
    questions: [
      {
        id: 'phq_1',
        text: 'Little interest or pleasure in doing things',
        type: 'scale',
        required: true,
        options: [
          { id: 'not_at_all', text: 'Not at all', value: 0 },
          { id: 'several_days', text: 'Several days', value: 1 },
          { id: 'more_than_half', text: 'More than half the days', value: 2 },
          { id: 'nearly_every_day', text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'phq_2',
        text: 'Feeling down, depressed, or hopeless',
        type: 'scale',
        required: true,
        options: [
          { id: 'not_at_all', text: 'Not at all', value: 0 },
          { id: 'several_days', text: 'Several days', value: 1 },
          { id: 'more_than_half', text: 'More than half the days', value: 2 },
          { id: 'nearly_every_day', text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'phq_3',
        text: 'Trouble falling or staying asleep, or sleeping too much',
        type: 'scale',
        required: true,
        options: [
          { id: 'not_at_all', text: 'Not at all', value: 0 },
          { id: 'several_days', text: 'Several days', value: 1 },
          { id: 'more_than_half', text: 'More than half the days', value: 2 },
          { id: 'nearly_every_day', text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'phq_4',
        text: 'Feeling tired or having little energy',
        type: 'scale',
        required: true,
        options: [
          { id: 'not_at_all', text: 'Not at all', value: 0 },
          { id: 'several_days', text: 'Several days', value: 1 },
          { id: 'more_than_half', text: 'More than half the days', value: 2 },
          { id: 'nearly_every_day', text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'phq_5',
        text: 'Poor appetite or overeating',
        type: 'scale',
        required: true,
        options: [
          { id: 'not_at_all', text: 'Not at all', value: 0 },
          { id: 'several_days', text: 'Several days', value: 1 },
          { id: 'more_than_half', text: 'More than half the days', value: 2 },
          { id: 'nearly_every_day', text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'phq_6',
        text: 'Feeling bad about yourself or that you are a failure or have let yourself or your family down',
        type: 'scale',
        required: true,
        options: [
          { id: 'not_at_all', text: 'Not at all', value: 0 },
          { id: 'several_days', text: 'Several days', value: 1 },
          { id: 'more_than_half', text: 'More than half the days', value: 2 },
          { id: 'nearly_every_day', text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'phq_7',
        text: 'Trouble concentrating on things, such as reading the newspaper or watching television',
        type: 'scale',
        required: true,
        options: [
          { id: 'not_at_all', text: 'Not at all', value: 0 },
          { id: 'several_days', text: 'Several days', value: 1 },
          { id: 'more_than_half', text: 'More than half the days', value: 2 },
          { id: 'nearly_every_day', text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'phq_8',
        text: 'Moving or speaking so slowly that other people could have noticed, or the opposite - being so fidgety or restless that you have been moving around a lot more than usual',
        type: 'scale',
        required: true,
        options: [
          { id: 'not_at_all', text: 'Not at all', value: 0 },
          { id: 'several_days', text: 'Several days', value: 1 },
          { id: 'more_than_half', text: 'More than half the days', value: 2 },
          { id: 'nearly_every_day', text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'phq_9',
        text: 'Thoughts that you would be better off dead, or of hurting yourself',
        type: 'scale',
        required: true,
        options: [
          { id: 'not_at_all', text: 'Not at all', value: 0 },
          { id: 'several_days', text: 'Several days', value: 1 },
          { id: 'more_than_half', text: 'More than half the days', value: 2 },
          { id: 'nearly_every_day', text: 'Nearly every day', value: 3 }
        ]
      }
    ],
    scoring: {
      method: 'sum',
      maxScore: 27
    },
    interpretation: [
      {
        range: [0, 4],
        level: 'low',
        description: 'Minimal depression symptoms',
        recommendations: ['No specific intervention needed', 'Continue wellness practices']
      },
      {
        range: [5, 9],
        level: 'moderate',
        description: 'Mild depression symptoms',
        recommendations: ['Monitor symptoms', 'Consider self-help resources', 'Lifestyle modifications may help']
      },
      {
        range: [10, 14],
        level: 'moderate',
        description: 'Moderate depression symptoms',
        recommendations: ['Consider professional consultation', 'Therapy recommended', 'Monitor for worsening']
      },
      {
        range: [15, 19],
        level: 'high',
        description: 'Moderately severe depression',
        recommendations: ['Seek professional treatment', 'Consider medication evaluation', 'Regular monitoring needed']
      },
      {
        range: [20, 27],
        level: 'severe',
        description: 'Severe depression symptoms',
        recommendations: ['Immediate professional treatment', 'Comprehensive evaluation needed', 'Crisis intervention may be required']
      }
    ]
  },

  'WHO-5': {
    id: 'WHO-5',
    name: 'WHO Well-Being Index',
    acronym: 'WHO-5',
    description: 'A short questionnaire measuring current mental wellbeing over the past two weeks.',
    questions: [
      {
        id: 'who_1',
        text: 'I have felt cheerful and in good spirits',
        type: 'scale',
        required: true,
        options: [
          { id: 'all_time', text: 'All of the time', value: 5 },
          { id: 'most_time', text: 'Most of the time', value: 4 },
          { id: 'more_half', text: 'More than half of the time', value: 3 },
          { id: 'less_half', text: 'Less than half of the time', value: 2 },
          { id: 'some_time', text: 'Some of the time', value: 1 },
          { id: 'no_time', text: 'At no time', value: 0 }
        ]
      },
      {
        id: 'who_2',
        text: 'I have felt calm and relaxed',
        type: 'scale',
        required: true,
        options: [
          { id: 'all_time', text: 'All of the time', value: 5 },
          { id: 'most_time', text: 'Most of the time', value: 4 },
          { id: 'more_half', text: 'More than half of the time', value: 3 },
          { id: 'less_half', text: 'Less than half of the time', value: 2 },
          { id: 'some_time', text: 'Some of the time', value: 1 },
          { id: 'no_time', text: 'At no time', value: 0 }
        ]
      },
      {
        id: 'who_3',
        text: 'I have felt active and vigorous',
        type: 'scale',
        required: true,
        options: [
          { id: 'all_time', text: 'All of the time', value: 5 },
          { id: 'most_time', text: 'Most of the time', value: 4 },
          { id: 'more_half', text: 'More than half of the time', value: 3 },
          { id: 'less_half', text: 'Less than half of the time', value: 2 },
          { id: 'some_time', text: 'Some of the time', value: 1 },
          { id: 'no_time', text: 'At no time', value: 0 }
        ]
      },
      {
        id: 'who_4',
        text: 'I woke up feeling fresh and rested',
        type: 'scale',
        required: true,
        options: [
          { id: 'all_time', text: 'All of the time', value: 5 },
          { id: 'most_time', text: 'Most of the time', value: 4 },
          { id: 'more_half', text: 'More than half of the time', value: 3 },
          { id: 'less_half', text: 'Less than half of the time', value: 2 },
          { id: 'some_time', text: 'Some of the time', value: 1 },
          { id: 'no_time', text: 'At no time', value: 0 }
        ]
      },
      {
        id: 'who_5',
        text: 'My daily life has been filled with things that interest me',
        type: 'scale',
        required: true,
        options: [
          { id: 'all_time', text: 'All of the time', value: 5 },
          { id: 'most_time', text: 'Most of the time', value: 4 },
          { id: 'more_half', text: 'More than half of the time', value: 3 },
          { id: 'less_half', text: 'Less than half of the time', value: 2 },
          { id: 'some_time', text: 'Some of the time', value: 1 },
          { id: 'no_time', text: 'At no time', value: 0 }
        ]
      }
    ],
    scoring: {
      method: 'sum',
      maxScore: 25
    },
    interpretation: [
      {
        range: [0, 12],
        level: 'low',
        description: 'Poor wellbeing - may indicate depression',
        recommendations: ['Consider professional assessment', 'Further screening for depression recommended', 'Support services may be beneficial']
      },
      {
        range: [13, 20],
        level: 'moderate',
        description: 'Moderate wellbeing',
        recommendations: ['Monitor wellbeing regularly', 'Consider lifestyle improvements', 'Stress management techniques may help']
      },
      {
        range: [21, 25],
        level: 'high',
        description: 'Good wellbeing',
        recommendations: ['Maintain current wellness practices', 'Continue positive lifestyle choices']
      }
    ]
  }
};