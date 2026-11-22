export type BloomLevel = 
  | 'remember' 
  | 'understand' 
  | 'apply' 
  | 'analyze' 
  | 'evaluate' 
  | 'create';

export interface BloomLevelMeta {
  level: BloomLevel;
  rank: number;
  label: string;
  description: string;
  actionVerbs: string[];
  color: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

export interface BloomScoreMetric {
  bloom_level: BloomLevel;
  score_obtained: number;
  max_score: number;
  percentage: number;
  question_count: number;
  status: 'mastered' | 'developing' | 'learning_gap' | 'insufficient_data';
}

export interface TopicScoreMetric {
  topic: string;
  unit_number: number;
  score_obtained: number;
  max_score: number;
  percentage: number;
  question_count: number;
}
