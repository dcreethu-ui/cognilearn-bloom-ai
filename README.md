# CogniLearn – AI-Powered Student Learning & Bloom's Taxonomy Platform

A responsive educational technology platform connecting faculty and students, analyzing student cognitive ability and learning gaps using **Bloom's Revised Taxonomy** (Remember, Understand, Apply, Analyze, Evaluate, Create) paired with **Google Gemini AI**.

Designed with a warm, organic terracotta & cream aesthetic featuring custom progress metrics, circular countdown timers, and interactive Bloom psychometrics.

---

## 🌟 Key Capabilities

### 1. Faculty Studio
- **Course & CLO Management**: Create, edit, and publish courses. Define Course Learning Outcomes (CLOs) mapped to the 6 cognitive levels of Bloom's Taxonomy.
- **Course Material Uploads**: Upload course materials (PDF, PPTX, DOCX, TXT) organized by unit and topic with automatic text extraction.
- **AI Question Generation (Gemini)**: Formulate assessment questions grounded in course materials with target Bloom level, difficulty, and question count.
- **Editorial Control**: Review, edit, approve, or reject AI-generated questions before adding them to the question bank.
- **Assessments Studio**: Schedule quizzes, configure duration timers, passing marks, deadlines, and publish to enrolled students.
- **Class Analytics**: View class participation, average performance, Bloom cognitive mastery heatmaps, and early learning difficulty alerts.

### 2. Student Portal
- **Dashboard**: Track daily learning minutes with vertical progress charts, view Mindful Cognitive Points, and monitor Bloom's cognitive distribution.
- **Course Discovery & Enrollment**: Browse available courses and register with 1-click.
- **Material Reader**: Access lecture notes, study materials, and learning outcomes organized by unit.
- **Online Quiz Runner**: Warm, focused assessment interface with circular countdown timer, step navigation, and instant auto-save.
- **Deterministic Evaluation**: Instant objective scoring and mathematically calculated topic and Bloom's percentages.
- **Cognitive Transcript & Remediation**: View Bloom radar/bar metrics, identify strengths and learning gaps, and generate actionable 3-step AI improvement plans.
- **AI Study Assistant**: Grounded concept tutor that answers questions about course topics using uploaded lecture notes.

---

## 🎨 UI Design System

Inspired by the attached warm terracotta, cream, and almond aesthetic:
- **Palette**: Warm Terracotta (`#E06F28`, `#C7571B`), Soft Cream (`#FAF5EC`, `#F5ECE0`), Deep Espresso (`#281A12`, `#3D2A1F`), and harmonic Bloom cognitive level colors.
- **Typography**: Plus Jakarta Sans & Inter with clean contrast and spacing.
- **Components**: Pill buttons, rounded cards (`rounded-3xl`), circular countdown timers, and vertical progress bars.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+ LTS recommended)
- npm or pnpm
- Git

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd student_hack

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Environment Variables (.env)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Populate your credentials:
```ini
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
GEMINI_API_KEY=your-gemini-api-key
```

---

## 🧠 Bloom's Taxonomy Cognitive Levels

| Rank | Level | Cognitive Domain | Verbs |
|:---:|:---|:---|:---|
| 1 | **Remember** | Recall definitions, facts, syntax | Define, list, state, identify, recall |
| 2 | **Understand** | Comprehend principles and concepts | Explain, summarize, paraphrase, classify |
| 3 | **Apply** | Execute procedures, solve novel problems | Calculate, solve, execute, implement |
| 4 | **Analyze** | Deconstruct components, examine trade-offs | Differentiate, compare, contrast, deduce |
| 5 | **Evaluate** | Critique, appraise, and justify solutions | Critique, judge, assess, defend, appraise |
| 6 | **Create** | Synthesize architectures, design solutions | Design, construct, formulate, architect |

---

## 📦 Project Structure

```
src/
├── assets/                  # Icons & graphic resources
├── components/
│   ├── common/              # Button, Card, Badge, Input, Select, Modal, Spinner
│   └── layout/              # Navbar, Sidebar, DashboardLayout, RoleGuard
├── context/
│   └── AuthContext.tsx      # Role switcher & session persistence
├── lib/
│   ├── bloomTaxonomy.ts     # Bloom's constants, metadata, mathematical calculator
│   ├── gemini.ts            # Google Gemini AI question generation & grounded study tutor
│   ├── mockData.ts          # Reactive data store with local storage persistence
│   ├── supabase.ts          # Supabase client integration
│   └── utils.ts             # Tailwind class merging & formatting
├── pages/
│   ├── auth/                # LoginPage, RegisterPage
│   ├── faculty/             # FacultyDashboard, CoursesPage, MaterialsPage, QuestionBankPage, AssessmentsPage, AnalyticsPage
│   └── student/             # StudentDashboard, BrowseCoursesPage, MyCoursesPage, AssessmentsPage, QuizRunnerPage, BloomReportsPage, StudyTutorPage
├── types/                   # TypeScript interfaces (bloom, assessment, database)
├── App.tsx                  # Application route registry
└── main.tsx                 # Entry mount point
```
