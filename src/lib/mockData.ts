import { Course, CourseMaterial, LearningOutcome, Profile } from '../types/database.types';
import { Assessment, Question, StudentAttempt, StudentAnswer } from '../types/assessment.types';
import { BloomScoreMetric } from '../types/bloom.types';

export interface PerformanceReport {
  id: string;
  attempt_id: string;
  student_id: string;
  course_id: string;
  assessment_title: string;
  course_code: string;
  topic_scores: Record<string, { scored: number; total: number; percentage: number }>;
  bloom_scores: Record<string, { scored: number; total: number; percentage: number; status: string }>;
  weak_outcomes: string[];
  strengths: string[];
  generated_at: string;
}

export interface Recommendation {
  id: string;
  student_id: string;
  course_id: string;
  gap_summary: string;
  action_plan: Array<{ step: number; title: string; detail: string; status: 'pending' | 'completed' }>;
  recommended_material_ids: string[];
  practice_questions: Array<{ stem: string; bloom: string; answer_hint: string }>;
  created_at: string;
}

// Initial seed courses
const INITIAL_COURSES: Course[] = [
  {
    id: 'c-101',
    code: 'CS201',
    title: 'Data Structures and Algorithms',
    description: 'Master core algorithmic problem solving: asymptotic analysis, tree structures, graph traversal, and dynamic programming.',
    faculty_id: 'f101-faculty-id',
    faculty_name: 'Dr. Aruna Sharma',
    academic_term: 'Fall 2026',
    is_published: true,
    created_at: '2026-10-01T08:00:00Z',
    enrolled_count: 42,
  },
  {
    id: 'c-102',
    code: 'CS301',
    title: 'Design and Analysis of Algorithms',
    description: 'Advanced complexity analysis, divide and conquer, greedy strategies, network flows, and NP-completeness reductions.',
    faculty_id: 'f101-faculty-id',
    faculty_name: 'Dr. Aruna Sharma',
    academic_term: 'Fall 2026',
    is_published: true,
    created_at: '2026-10-05T08:00:00Z',
    enrolled_count: 36,
  },
  {
    id: 'c-103',
    code: 'SE101',
    title: 'Software Engineering & Architecture',
    description: 'Systems design, Bloom-driven requirements mapping, microservice trade-offs, modular design principles, and automated verification.',
    faculty_id: 'f101-faculty-id',
    faculty_name: 'Dr. Aruna Sharma',
    academic_term: 'Fall 2026',
    is_published: true,
    created_at: '2026-10-10T08:00:00Z',
    enrolled_count: 64,
  },
];

// Initial Course Learning Outcomes mapped to Bloom's Taxonomy
const INITIAL_OUTCOMES: LearningOutcome[] = [
  { id: 'lo-1', course_id: 'c-101', code: 'CO1', unit_number: 1, bloom_level: 'remember', description: 'Recall definitions, worst-case notations (Big-O, Big-Omega, Theta), and abstract data type operations.', created_at: '2026-10-02T08:00:00Z' },
  { id: 'lo-2', course_id: 'c-101', code: 'CO2', unit_number: 2, bloom_level: 'understand', description: 'Explain principles of binary search tree invariants, tree rotations, and hash collision strategies.', created_at: '2026-10-02T08:00:00Z' },
  { id: 'lo-3', course_id: 'c-101', code: 'CO3', unit_number: 2, bloom_level: 'apply', description: 'Implement AVL tree rebalancing insertions and graph traversal algorithms to solve reachability problems.', created_at: '2026-10-02T08:00:00Z' },
  { id: 'lo-4', course_id: 'c-101', code: 'CO4', unit_number: 3, bloom_level: 'analyze', description: 'Analyze amortized performance trade-offs between open addressing and chaining in hash table resizing.', created_at: '2026-10-02T08:00:00Z' },
  { id: 'lo-5', course_id: 'c-101', code: 'CO5', unit_number: 4, bloom_level: 'evaluate', description: 'Evaluate algorithmic trade-offs between Dijkstra, Bellman-Ford, and Floyd-Warshall under edge constraints.', created_at: '2026-10-02T08:00:00Z' },
  { id: 'lo-6', course_id: 'c-101', code: 'CO6', unit_number: 5, bloom_level: 'create', description: 'Design an optimal data structure pipeline for streaming sliding-window top-K frequency queries.', created_at: '2026-10-02T08:00:00Z' },
];

// Initial Course Materials
const INITIAL_MATERIALS: CourseMaterial[] = [
  {
    id: 'mat-1',
    course_id: 'c-101',
    unit_number: 2,
    topic_name: 'Binary Search Trees & Balancing',
    title: 'Unit 2: Binary Search Trees, AVL Rotations & Rebalancing.pdf',
    file_url: 'https://example.com/materials/bst-avl.pdf',
    file_type: 'pdf',
    file_size: 2450000,
    storage_path: 'c-101/unit-2/bst-avl.pdf',
    extracted_text: `A Binary Search Tree (BST) is a node-based binary tree data structure where each node satisfies the BST property: the key in any node is strictly greater than all keys in its left subtree and strictly less than all keys in its right subtree.
In the worst case (e.g. inserting elements in sorted order), a BST degenerates into a linear linked list with O(n) search time.
AVL trees maintain strict height balance: for every node, the height difference between left and right subtrees (the balance factor) is at most 1.
When an insertion violates this balance, 4 rotation types restore balance: Left-Left (Single Right Rotation), Right-Right (Single Left Rotation), Left-Right (Double Rotation: Left then Right), and Right-Left (Double Rotation: Right then Left). Search, insertion, and deletion remain guaranteed O(log n).`,
    created_at: '2026-10-15T10:00:00Z',
  },
  {
    id: 'mat-2',
    course_id: 'c-101',
    unit_number: 3,
    topic_name: 'Hash Tables & Collision Resolution',
    title: 'Unit 3: Hash Tables, Probing Strategies & Load Factors.docx',
    file_url: 'https://example.com/materials/hashing.docx',
    file_type: 'docx',
    file_size: 1320000,
    storage_path: 'c-101/unit-3/hashing.docx',
    extracted_text: `Hash tables provide average O(1) time complexity for lookup, insert, and delete. 
Hash function h(k) maps universe of keys to buckets 0 to m-1.
Collision occurs when two distinct keys yield h(k1) = h(k2).
Two primary resolution mechanisms:
1. Separate Chaining: Each bucket holds a linked list or red-black tree. Degradation occurs if hash function is non-uniform.
2. Open Addressing: All elements reside in the table itself. Collision resolution uses probing:
   - Linear Probing: h(k, i) = (h'(k) + i) mod m. Suffers from primary clustering where long runs of occupied slots grow.
   - Quadratic Probing: h(k, i) = (h'(k) + c1*i + c2*i^2) mod m. Avoids primary clustering but causes secondary clustering.
   - Double Hashing: h(k, i) = (h1(k) + i*h2(k)) mod m. Best open addressing technique, minimizes clustering if h2(k) is coprime to m.
Load factor alpha = n/m. Rehashing is triggered typically when alpha exceeds 0.75.`,
    created_at: '2026-10-18T14:30:00Z',
  },
];

// Initial Questions with complete Bloom Taxonomy tags & answer keys
const INITIAL_QUESTIONS: Question[] = [
  {
    id: 'q-101',
    assessment_id: 'asm-1',
    course_id: 'c-101',
    unit_number: 2,
    topic: 'Binary Search Trees & Balancing',
    bloom_level: 'remember',
    difficulty: 'easy',
    question_type: 'mcq',
    question_text: 'What is the maximum allowed balance factor (height difference between subtrees) for any node in a valid AVL tree?',
    options: [
      { id: 'A', text: '0 only' },
      { id: 'B', text: '1 (balance factor in {-1, 0, +1})' },
      { id: 'C', text: '2' },
      { id: 'D', text: 'log(n)' },
    ],
    correct_answer: 'B',
    explanation: 'An AVL tree is strictly height-balanced: for every node, the heights of left and right subtrees can differ by at most 1.',
    marks: 2,
    ai_generated: true,
    faculty_status: 'approved',
    created_at: '2026-10-20T10:00:00Z',
  },
  {
    id: 'q-102',
    assessment_id: 'asm-1',
    course_id: 'c-101',
    unit_number: 2,
    topic: 'Binary Search Trees & Balancing',
    bloom_level: 'understand',
    difficulty: 'medium',
    question_type: 'mcq',
    question_text: 'Why does an unbalanced BST exhibit O(n) search time in the worst case?',
    options: [
      { id: 'A', text: 'The hash function causes infinite primary clustering loops.' },
      { id: 'B', text: 'Inserting monotonically ordered keys creates a degenerate skew tree equivalent to a linked list.' },
      { id: 'C', text: 'Binary search trees cannot store numeric keys with duplicate hash values.' },
      { id: 'D', text: 'Cache memory misses force hardware to reread root nodes continuously.' },
    ],
    correct_answer: 'B',
    explanation: 'When keys are inserted in strictly ascending or descending order, every new node becomes the right (or left) child of the previous, collapsing tree depth to n.',
    marks: 3,
    ai_generated: true,
    faculty_status: 'approved',
    created_at: '2026-10-20T10:05:00Z',
  },
  {
    id: 'q-103',
    assessment_id: 'asm-1',
    course_id: 'c-101',
    unit_number: 2,
    topic: 'Binary Search Trees & Balancing',
    bloom_level: 'apply',
    difficulty: 'medium',
    question_type: 'mcq',
    question_text: 'An AVL tree experiences an insertion into the right subtree of a left child of node Z, resulting in balance factor violation (+2). Which rotation procedure restores balance?',
    options: [
      { id: 'A', text: 'Single Right Rotation on Z' },
      { id: 'B', text: 'Single Left Rotation on Z' },
      { id: 'C', text: 'Double Rotation: Left Rotation on left child, then Right Rotation on Z (Left-Right)' },
      { id: 'D', text: 'Rehash the entire tree with quadratic probing' },
    ],
    correct_answer: 'C',
    explanation: 'A Left-Right imbalance requires a Left rotation around the left child followed by a Right rotation around the root of the unbalanced subtree Z.',
    marks: 4,
    ai_generated: true,
    faculty_status: 'approved',
    created_at: '2026-10-20T10:10:00Z',
  },
  {
    id: 'q-104',
    assessment_id: 'asm-1',
    course_id: 'c-101',
    unit_number: 3,
    topic: 'Hash Tables & Collision Resolution',
    bloom_level: 'analyze',
    difficulty: 'hard',
    question_type: 'mcq',
    question_text: 'Analyze why Double Hashing eliminates primary and secondary clustering, whereas Linear and Quadratic Probing fail to eliminate both.',
    options: [
      { id: 'A', text: 'Double hashing uses linked lists, whereas linear probing uses contiguous array buckets.' },
      { id: 'B', text: 'The probe increment depends on the key itself via h2(k), meaning two keys hashing to the same initial slot traverse different probe sequences.' },
      { id: 'C', text: 'Double hashing doubles the table capacity upon every single collision.' },
      { id: 'D', text: 'The secondary hash function calculates amortized square roots rather than modulo arithmetic.' },
    ],
    correct_answer: 'B',
    explanation: 'In double hashing, the step size is given by h2(key). Even if key1 and key2 share h1, their probe sequences will be completely different provided h2 produces different step sizes.',
    marks: 4,
    ai_generated: true,
    faculty_status: 'approved',
    created_at: '2026-10-20T10:15:00Z',
  },
  {
    id: 'q-105',
    assessment_id: 'asm-1',
    course_id: 'c-101',
    unit_number: 3,
    topic: 'Hash Tables & Collision Resolution',
    bloom_level: 'evaluate',
    difficulty: 'hard',
    question_type: 'mcq',
    question_text: 'Evaluate whether Separate Chaining or Open Addressing with Double Hashing is more suitable for a real-time embedded system with strict memory fragmentation constraints and unknown entry volumes.',
    options: [
      { id: 'A', text: 'Separate Chaining, because dynamic node allocation minimizes peak stack usage.' },
      { id: 'B', text: 'Open Addressing with Double Hashing, because contiguous fixed array storage avoids pointer heap fragmentation and provides superior cache locality.' },
      { id: 'C', text: 'Neither, because hash tables always require non-deterministic O(n^2) garbage collection.' },
      { id: 'D', text: 'Linear Probing with infinite capacity is strictly required in embedded C.' },
    ],
    correct_answer: 'B',
    explanation: 'Embedded systems strongly avoid dynamic heap fragmentation caused by separate chaining linked-list allocations; contiguous open addressing delivers predictable layout and cache efficiency.',
    marks: 4,
    ai_generated: true,
    faculty_status: 'approved',
    created_at: '2026-10-20T10:20:00Z',
  },
  {
    id: 'q-106',
    assessment_id: 'asm-1',
    course_id: 'c-101',
    unit_number: 2,
    topic: 'Binary Search Trees & Balancing',
    bloom_level: 'create',
    difficulty: 'hard',
    question_type: 'mcq',
    question_text: 'Devise the most efficient hybrid data architecture to support both O(log n) rank-order queries ("find k-th smallest element") and O(1) key lookups.',
    options: [
      { id: 'A', text: 'An Order-Statistic Balanced BST (augmented with subtree sizes) cross-indexed with a Hash Map of node pointers.' },
      { id: 'B', text: 'A single unsorted array with quickselect invoked on every query.' },
      { id: 'C', text: 'A singly linked list with doubly-hashed skip pointers.' },
      { id: 'D', text: 'A Fibonacci heap without deletion support.' },
    ],
    correct_answer: 'A',
    explanation: 'Augmenting an AVL or Red-Black tree with subtree node counts enables O(log n) order queries, while a parallel hash map of keys to tree node references grants O(1) direct access.',
    marks: 5,
    ai_generated: true,
    faculty_status: 'approved',
    created_at: '2026-10-20T10:25:00Z',
  },
];

// Initial Assessments
const INITIAL_ASSESSMENTS: Assessment[] = [
  {
    id: 'asm-1',
    course_id: 'c-101',
    course_code: 'CS201',
    course_title: 'Data Structures and Algorithms',
    title: 'Diagnostic Quiz 2: Trees, AVL Balancing & Hashing',
    description: 'Comprehensive 6-level Bloom evaluation covering BST degenerate cases, AVL rotations, and hash collision mechanics.',
    duration_minutes: 20,
    total_marks: 22,
    passing_marks: 12,
    release_date: '2026-11-01T00:00:00Z',
    deadline: '2026-12-05T23:59:59Z',
    is_published: true,
    review_policy: 'immediate',
    created_at: '2026-10-20T12:00:00Z',
    question_count: 6,
  },
  {
    id: 'asm-2',
    course_id: 'c-102',
    course_code: 'CS301',
    course_title: 'Design and Analysis of Algorithms',
    title: 'Midterm Cognitive Assessment: Dynamic Programming & Greedy',
    description: 'Tests problem formulation, optimal substructure proof, state compression, and greedy choice criteria.',
    duration_minutes: 35,
    total_marks: 30,
    passing_marks: 18,
    release_date: '2026-11-15T00:00:00Z',
    deadline: '2026-12-10T23:59:59Z',
    is_published: true,
    review_policy: 'immediate',
    created_at: '2026-10-25T12:00:00Z',
    question_count: 8,
  },
];

class ReactiveEducationStore {
  private courses: Course[] = [];
  private outcomes: LearningOutcome[] = [];
  private materials: CourseMaterial[] = [];
  private questions: Question[] = [];
  private assessments: Assessment[] = [];
  private enrollments: Set<string> = new Set(['c-101', 'c-102']); // Student initially enrolled in CS201 and CS301
  private attempts: StudentAttempt[] = [];
  private reports: PerformanceReport[] = [];
  private recommendations: Recommendation[] = [];

  constructor() {
    this.loadState();
  }

  private loadState() {
    try {
      const savedCourses = localStorage.getItem('cogni_courses');
      this.courses = savedCourses ? JSON.parse(savedCourses) : INITIAL_COURSES;

      const savedOutcomes = localStorage.getItem('cogni_outcomes');
      this.outcomes = savedOutcomes ? JSON.parse(savedOutcomes) : INITIAL_OUTCOMES;

      const savedMaterials = localStorage.getItem('cogni_materials');
      this.materials = savedMaterials ? JSON.parse(savedMaterials) : INITIAL_MATERIALS;

      const savedQuestions = localStorage.getItem('cogni_questions');
      this.questions = savedQuestions ? JSON.parse(savedQuestions) : INITIAL_QUESTIONS;

      const savedAssessments = localStorage.getItem('cogni_assessments');
      this.assessments = savedAssessments ? JSON.parse(savedAssessments) : INITIAL_ASSESSMENTS;

      const savedEnrollments = localStorage.getItem('cogni_enrollments');
      if (savedEnrollments) {
        this.enrollments = new Set(JSON.parse(savedEnrollments));
      }

      const savedReports = localStorage.getItem('cogni_reports');
      if (savedReports) {
        this.reports = JSON.parse(savedReports);
      } else {
        // Seed an initial diagnostic report for Alex so graphs & progress bars look lively immediately!
        this.reports = [
          {
            id: 'rep-initial',
            attempt_id: 'att-seed',
            student_id: 's202-student-id',
            course_id: 'c-101',
            course_code: 'CS201',
            assessment_title: 'Diagnostic Quiz 1: Asymptotic Complexity & Recursion',
            topic_scores: {
              'Asymptotic Notations': { scored: 6, total: 6, percentage: 100 },
              'Recursion Trees': { scored: 4, total: 6, percentage: 66.7 },
              'Master Theorem': { scored: 3, total: 6, percentage: 50 },
            },
            bloom_scores: {
              remember: { scored: 6, total: 6, percentage: 100, status: 'mastered' },
              understand: { scored: 5, total: 6, percentage: 83.3, status: 'mastered' },
              apply: { scored: 4, total: 6, percentage: 66.7, status: 'developing' },
              analyze: { scored: 3, total: 6, percentage: 50, status: 'developing' },
              evaluate: { scored: 2, total: 5, percentage: 40, status: 'learning_gap' },
              create: { scored: 3, total: 6, percentage: 50, status: 'developing' },
            },
            weak_outcomes: ['CO5: Algorithmic Trade-off Evaluation'],
            strengths: ['CO1: Mathematical Asymptotic Definitions', 'CO2: Recursion Unrolling'],
            generated_at: '2026-11-10T14:00:00Z',
          },
        ];
      }
    } catch {
      this.courses = INITIAL_COURSES;
      this.outcomes = INITIAL_OUTCOMES;
      this.materials = INITIAL_MATERIALS;
      this.questions = INITIAL_QUESTIONS;
      this.assessments = INITIAL_ASSESSMENTS;
    }
  }

  private saveState() {
    localStorage.setItem('cogni_courses', JSON.stringify(this.courses));
    localStorage.setItem('cogni_outcomes', JSON.stringify(this.outcomes));
    localStorage.setItem('cogni_materials', JSON.stringify(this.materials));
    localStorage.setItem('cogni_questions', JSON.stringify(this.questions));
    localStorage.setItem('cogni_assessments', JSON.stringify(this.assessments));
    localStorage.setItem('cogni_enrollments', JSON.stringify(Array.from(this.enrollments)));
    localStorage.setItem('cogni_reports', JSON.stringify(this.reports));
  }

  // Courses
  public getCourses(): Course[] {
    return [...this.courses];
  }

  public getCourseById(id: string): Course | undefined {
    return this.courses.find((c) => c.id === id);
  }

  public addCourse(newCourse: Omit<Course, 'id' | 'created_at' | 'enrolled_count'>): Course {
    const course: Course = {
      ...newCourse,
      id: `c-${Date.now()}`,
      created_at: new Date().toISOString(),
      enrolled_count: 0,
    };
    this.courses.unshift(course);
    this.saveState();
    return course;
  }

  // Enrollment
  public getEnrolledCourses(studentId: string): Course[] {
    return this.courses.filter((c) => this.enrollments.has(c.id));
  }

  public enrollInCourse(courseId: string): boolean {
    this.enrollments.add(courseId);
    const course = this.courses.find((c) => c.id === courseId);
    if (course) {
      course.enrolled_count = (course.enrolled_count || 0) + 1;
    }
    this.saveState();
    return true;
  }

  public isEnrolled(courseId: string): boolean {
    return this.enrollments.has(courseId);
  }

  // Learning Outcomes
  public getOutcomes(courseId?: string): LearningOutcome[] {
    return courseId ? this.outcomes.filter((o) => o.course_id === courseId) : this.outcomes;
  }

  public addOutcome(outcome: Omit<LearningOutcome, 'id' | 'created_at'>): LearningOutcome {
    const lo: LearningOutcome = {
      ...outcome,
      id: `lo-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    this.outcomes.push(lo);
    this.saveState();
    return lo;
  }

  // Materials
  public getMaterials(courseId?: string): CourseMaterial[] {
    return courseId ? this.materials.filter((m) => m.course_id === courseId) : this.materials;
  }

  public addMaterial(material: Omit<CourseMaterial, 'id' | 'created_at'>): CourseMaterial {
    const mat: CourseMaterial = {
      ...material,
      id: `mat-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    this.materials.unshift(mat);
    this.saveState();
    return mat;
  }

  // Questions
  public getQuestions(assessmentId?: string): Question[] {
    return assessmentId ? this.questions.filter((q) => q.assessment_id === assessmentId) : this.questions;
  }

  public addQuestion(question: Omit<Question, 'id' | 'created_at'>): Question {
    const q: Question = {
      ...question,
      id: `q-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    this.questions.push(q);
    this.saveState();
    return q;
  }

  public updateQuestionStatus(id: string, status: 'approved' | 'rejected'): void {
    const q = this.questions.find((x) => x.id === id);
    if (q) {
      q.faculty_status = status;
      this.saveState();
    }
  }

  // Assessments
  public getAssessments(courseId?: string): Assessment[] {
    return courseId ? this.assessments.filter((a) => a.course_id === courseId) : this.assessments;
  }

  public getAssessmentById(id: string): Assessment | undefined {
    return this.assessments.find((a) => a.id === id);
  }

  public addAssessment(assessment: Omit<Assessment, 'id' | 'created_at' | 'question_count'>, questionIds: string[]): Assessment {
    const newAsm: Assessment = {
      ...assessment,
      id: `asm-${Date.now()}`,
      created_at: new Date().toISOString(),
      question_count: questionIds.length,
    };

    // Associate questions with this assessment
    questionIds.forEach((qid) => {
      const q = this.questions.find((x) => x.id === qid);
      if (q) q.assessment_id = newAsm.id;
    });

    this.assessments.unshift(newAsm);
    this.saveState();
    return newAsm;
  }

  // Deterministic Assessment Grading & Bloom Analysis Engine
  public evaluateAttempt(
    assessmentId: string,
    studentId: string,
    submittedAnswers: Record<string, string>, // question_id -> selected option ('A', 'B', etc)
    timeSpentSeconds: number
  ): { attempt: StudentAttempt; report: PerformanceReport } {
    const assessment = this.getAssessmentById(assessmentId);
    const questions = this.getQuestions(assessmentId);

    let totalScore = 0;
    let maxScore = 0;
    const topicAggregates: Record<string, { scored: number; total: number }> = {};
    const bloomAggregates: Record<string, { scored: number; total: number; count: number }> = {
      remember: { scored: 0, total: 0, count: 0 },
      understand: { scored: 0, total: 0, count: 0 },
      apply: { scored: 0, total: 0, count: 0 },
      analyze: { scored: 0, total: 0, count: 0 },
      evaluate: { scored: 0, total: 0, count: 0 },
      create: { scored: 0, total: 0, count: 0 },
    };

    questions.forEach((q) => {
      const selectedOption = submittedAnswers[q.id];
      const isCorrect = selectedOption && selectedOption === q.correct_answer;
      const marksAwarded = isCorrect ? q.marks : 0;

      totalScore += marksAwarded;
      maxScore += q.marks;

      // Topic aggregation
      if (!topicAggregates[q.topic]) {
        topicAggregates[q.topic] = { scored: 0, total: 0 };
      }
      topicAggregates[q.topic].scored += marksAwarded;
      topicAggregates[q.topic].total += q.marks;

      // Bloom level aggregation
      if (bloomAggregates[q.bloom_level]) {
        bloomAggregates[q.bloom_level].scored += marksAwarded;
        bloomAggregates[q.bloom_level].total += q.marks;
        bloomAggregates[q.bloom_level].count += 1;
      }
    });

    const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

    const attempt: StudentAttempt = {
      id: `att-${Date.now()}`,
      assessment_id: assessmentId,
      student_id: studentId,
      started_at: new Date(Date.now() - timeSpentSeconds * 1000).toISOString(),
      submitted_at: new Date().toISOString(),
      time_spent_seconds: timeSpentSeconds,
      total_score: totalScore,
      max_possible_score: maxScore,
      percentage: Math.round(percentage * 10) / 10,
      status: 'graded',
      evaluated_at: new Date().toISOString(),
    };

    // Calculate Bloom percentages & statistical validity
    const bloomScores: Record<string, { scored: number; total: number; percentage: number; status: string }> = {};
    const weakOutcomes: string[] = [];
    const strengths: string[] = [];

    Object.entries(bloomAggregates).forEach(([level, data]) => {
      const p = data.total > 0 ? Math.round((data.scored / data.total) * 100) : 0;
      let status = 'developing';
      if (data.count < 1 || data.total === 0) {
        status = 'insufficient_data';
      } else if (p >= 75) {
        status = 'mastered';
        strengths.push(`${level.toUpperCase()} Mastery (${p}%)`);
      } else if (p < 50) {
        status = 'learning_gap';
        weakOutcomes.push(`Cognitive Gap in ${level.toUpperCase()} (${p}%)`);
      }
      bloomScores[level] = {
        scored: data.scored,
        total: data.total,
        percentage: p,
        status,
      };
    });

    const topicScores: Record<string, { scored: number; total: number; percentage: number }> = {};
    Object.entries(topicAggregates).forEach(([topic, d]) => {
      topicScores[topic] = {
        scored: d.scored,
        total: d.total,
        percentage: d.total > 0 ? Math.round((d.scored / d.total) * 100) : 0,
      };
    });

    const report: PerformanceReport = {
      id: `rep-${Date.now()}`,
      attempt_id: attempt.id,
      student_id: studentId,
      course_id: assessment?.course_id || 'c-101',
      course_code: assessment?.course_code || 'CS201',
      assessment_title: assessment?.title || 'Assessment',
      topic_scores: topicScores,
      bloom_scores: bloomScores,
      weak_outcomes: weakOutcomes.length > 0 ? weakOutcomes : ['None identified; consistent performance across tested levels'],
      strengths: strengths.length > 0 ? strengths : ['Basic recall and conceptual understanding'],
      generated_at: new Date().toISOString(),
    };

    this.attempts.push(attempt);
    this.reports.unshift(report);
    this.saveState();

    return { attempt, report };
  }

  // Reports
  public getReports(studentId?: string): PerformanceReport[] {
    return this.reports;
  }

  public getLatestReport(studentId?: string): PerformanceReport | undefined {
    return this.reports[0];
  }
}

export const dbStore = new ReactiveEducationStore();
