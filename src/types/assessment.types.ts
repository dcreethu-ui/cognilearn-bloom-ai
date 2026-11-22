import { BloomLevel } from './bloom.types';

export type QuestionType = 'mcq' | 'multiple_select' | 'short_answer' | 'true_false';
export type QuestionDifficulty = 'easy' | 'medium' | 'hard';
export type FacultyStatus = 'draft' | 'approved' | 'rejected';
export type ReviewPolicy = 'immediate' | 'after_deadline' | 'manual';
export type AttemptStatus = 'in_progress' | 'submitted' | 'graded';

export interface QuestionOption {
  id: string; // 'A', 'B', 'C', 'D'
  text: string;
}

export interface Question {
  id: string;
  assessment_id?: string;
  course_id: string;
  learning_outcome_id?: string;
  unit_number: number;
  topic: string;
  bloom_level: BloomLevel;
  difficulty: QuestionDifficulty;
  question_type: QuestionType;
  question_text: string;
  options: QuestionOption[];
  correct_answer?: string; // Hidden from students until allowed
  explanation?: string; // Hidden from students until allowed
  marks: number;
  ai_generated: boolean;
  faculty_status: FacultyStatus;
  created_at: string;
}

export interface Assessment {
  id: string;
  course_id: string;
  title: string;
  description: string;
  duration_minutes: number;
  total_marks: number;
  passing_marks: number;
  release_date: string;
  deadline: string;
  is_published: boolean;
  review_policy: ReviewPolicy;
  created_by?: string;
  created_at: string;
  course_code?: string;
  course_title?: string;
  question_count?: number;
}

export interface StudentAttempt {
  id: string;
  assessment_id: string;
  student_id: string;
  started_at: string;
  submitted_at?: string;
  time_spent_seconds: number;
  total_score: number;
  max_possible_score: number;
  percentage: number;
  status: AttemptStatus;
  evaluated_at?: string;
}

export interface StudentAnswer {
  id: string;
  attempt_id: string;
  question_id: string;
  student_answer: string | string[];
  is_correct?: boolean;
  marks_awarded?: number;
  feedback?: string;
  evaluated_at?: string;
}
