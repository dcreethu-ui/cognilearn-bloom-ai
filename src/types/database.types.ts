import { BloomLevel } from './bloom.types';

export type UserRole = 'faculty' | 'student';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  department?: string;
  created_at: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  description: string;
  faculty_id: string;
  academic_term: string;
  is_published: boolean;
  created_at: string;
  faculty_name?: string;
  enrolled_count?: number;
}

export interface Enrollment {
  id: string;
  course_id: string;
  student_id: string;
  enrolled_at: string;
  status: 'active' | 'completed' | 'dropped';
}

export interface LearningOutcome {
  id: string;
  course_id: string;
  code: string; // e.g. "CO1"
  description: string;
  bloom_level: BloomLevel;
  unit_number: number;
  created_at: string;
}

export interface CourseMaterial {
  id: string;
  course_id: string;
  unit_number: number;
  topic_name: string;
  title: string;
  file_url: string;
  file_type: string;
  file_size?: number;
  storage_path: string;
  extracted_text?: string;
  created_at: string;
}
