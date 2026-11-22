import { BloomLevel, BloomLevelMeta, BloomScoreMetric } from '../types/bloom.types';

export const BLOOM_LEVELS: Record<BloomLevel, BloomLevelMeta> = {
  remember: {
    level: 'remember',
    rank: 1,
    label: 'Remember',
    description: 'Retrieve, recognize, and recall relevant definitions and facts from memory.',
    actionVerbs: ['Define', 'List', 'State', 'Identify', 'Recall', 'Name'],
    color: '#4F6B8A',
    bgColor: 'bg-[#EAF0F6]',
    textColor: 'text-[#283B4F]',
    borderColor: 'border-[#BDD1E2]',
  },
  understand: {
    level: 'understand',
    rank: 2,
    label: 'Understand',
    description: 'Construct meaning from messages, explaining and summarizing core ideas.',
    actionVerbs: ['Explain', 'Summarize', 'Paraphrase', 'Classify', 'Describe', 'Illustrate'],
    color: '#5A8260',
    bgColor: 'bg-[#EAF3EB]',
    textColor: 'text-[#2E4C33]',
    borderColor: 'border-[#BED8C1]',
  },
  apply: {
    level: 'apply',
    rank: 3,
    label: 'Apply',
    description: 'Carry out or use a procedure in a given situation to solve problems.',
    actionVerbs: ['Calculate', 'Solve', 'Implement', 'Demonstrate', 'Operate', 'Execute'],
    color: '#D9822B',
    bgColor: 'bg-[#FDF2E2]',
    textColor: 'text-[#854B10]',
    borderColor: 'border-[#F8D7A8]',
  },
  analyze: {
    level: 'analyze',
    rank: 4,
    label: 'Analyze',
    description: 'Break concepts into constituent parts, determining relations and structures.',
    actionVerbs: ['Differentiate', 'Compare', 'Contrast', 'Deconstruct', 'Examine', 'Categorize'],
    color: '#C95438',
    bgColor: 'bg-[#FCEBE6]',
    textColor: 'text-[#7D2A16]',
    borderColor: 'border-[#F5BEB0]',
  },
  evaluate: {
    level: 'evaluate',
    rank: 5,
    label: 'Evaluate',
    description: 'Make critical judgments based on criteria, standards, and trade-offs.',
    actionVerbs: ['Critique', 'Judge', 'Assess', 'Defend', 'Appraise', 'Justify'],
    color: '#884D6A',
    bgColor: 'bg-[#F7EBF1]',
    textColor: 'text-[#54263D]',
    borderColor: 'border-[#E0B8CB]',
  },
  create: {
    level: 'create',
    rank: 6,
    label: 'Create',
    description: 'Put elements together into a novel pattern, architecting new solutions.',
    actionVerbs: ['Design', 'Construct', 'Formulate', 'Devise', 'Architect', 'Synthesize'],
    color: '#E65D24',
    bgColor: 'bg-[#FDEDE6]',
    textColor: 'text-[#8F320C]',
    borderColor: 'border-[#F8BCA1]',
  },
};

export const BLOOM_ORDER: BloomLevel[] = [
  'remember',
  'understand',
  'apply',
  'analyze',
  'evaluate',
  'create',
];

export function calculateBloomMetrics(
  questions: Array<{ bloom_level: BloomLevel; max_marks: number }>,
  answers: Array<{ question_id: string; marks_awarded: number; bloom_level: BloomLevel }>
): BloomScoreMetric[] {
  return BLOOM_ORDER.map((level) => {
    const levelQuestions = questions.filter((q) => q.bloom_level === level);
    const maxScore = levelQuestions.reduce((sum, q) => sum + (q.max_marks || 0), 0);
    const questionCount = levelQuestions.length;

    const levelAnswers = answers.filter((a) => a.bloom_level === level);
    const scoreObtained = levelAnswers.reduce((sum, a) => sum + (a.marks_awarded || 0), 0);

    if (questionCount < 2 || maxScore === 0) {
      return {
        bloom_level: level,
        score_obtained: scoreObtained,
        max_score: maxScore,
        percentage: maxScore > 0 ? (scoreObtained / maxScore) * 100 : 0,
        question_count: questionCount,
        status: 'insufficient_data',
      };
    }

    const percentage = (scoreObtained / maxScore) * 100;
    let status: BloomScoreMetric['status'] = 'developing';
    if (percentage >= 75) status = 'mastered';
    else if (percentage < 50) status = 'learning_gap';

    return {
      bloom_level: level,
      score_obtained: scoreObtained,
      max_score: maxScore,
      percentage,
      question_count: questionCount,
      status,
    };
  });
}
