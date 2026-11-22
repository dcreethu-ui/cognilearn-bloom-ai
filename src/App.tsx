import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { RoleGuard } from './components/layout/RoleGuard';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { NotFound } from './pages/NotFound';

// Faculty Pages
import { FacultyDashboard } from './pages/faculty/FacultyDashboard';
import { CoursesPage as FacultyCoursesPage } from './pages/faculty/CoursesPage';
import { MaterialsPage as FacultyMaterialsPage } from './pages/faculty/MaterialsPage';
import { QuestionBankPage as FacultyQuestionBankPage } from './pages/faculty/QuestionBankPage';
import { AssessmentsPage as FacultyAssessmentsPage } from './pages/faculty/AssessmentsPage';
import { AnalyticsPage as FacultyAnalyticsPage } from './pages/faculty/AnalyticsPage';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { BrowseCoursesPage } from './pages/student/BrowseCoursesPage';
import { MyCoursesPage } from './pages/student/MyCoursesPage';
import { AssessmentsPage as StudentAssessmentsPage } from './pages/student/AssessmentsPage';
import { QuizRunnerPage } from './pages/student/QuizRunnerPage';
import { BloomReportsPage } from './pages/student/BloomReportsPage';
import { StudyTutorPage } from './pages/student/StudyTutorPage';

const RootRedirect: React.FC = () => {
  const { role, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Navigate to={role === 'faculty' ? '/faculty/dashboard' : '/student/dashboard'} replace />;
};

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Dashboard Protected Routes */}
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<RootRedirect />} />

              {/* Faculty Exclusive Routes */}
              <Route
                path="/faculty/dashboard"
                element={
                  <RoleGuard allowedRoles={['faculty']}>
                    <FacultyDashboard />
                  </RoleGuard>
                }
              />
              <Route
                path="/faculty/courses"
                element={
                  <RoleGuard allowedRoles={['faculty']}>
                    <FacultyCoursesPage />
                  </RoleGuard>
                }
              />
              <Route
                path="/faculty/materials"
                element={
                  <RoleGuard allowedRoles={['faculty']}>
                    <FacultyMaterialsPage />
                  </RoleGuard>
                }
              />
              <Route
                path="/faculty/question-bank"
                element={
                  <RoleGuard allowedRoles={['faculty']}>
                    <FacultyQuestionBankPage />
                  </RoleGuard>
                }
              />
              <Route
                path="/faculty/assessments"
                element={
                  <RoleGuard allowedRoles={['faculty']}>
                    <FacultyAssessmentsPage />
                  </RoleGuard>
                }
              />
              <Route
                path="/faculty/analytics"
                element={
                  <RoleGuard allowedRoles={['faculty']}>
                    <FacultyAnalyticsPage />
                  </RoleGuard>
                }
              />

              {/* Student Exclusive Routes */}
              <Route
                path="/student/dashboard"
                element={
                  <RoleGuard allowedRoles={['student']}>
                    <StudentDashboard />
                  </RoleGuard>
                }
              />
              <Route
                path="/student/browse"
                element={
                  <RoleGuard allowedRoles={['student']}>
                    <BrowseCoursesPage />
                  </RoleGuard>
                }
              />
              <Route
                path="/student/my-courses"
                element={
                  <RoleGuard allowedRoles={['student']}>
                    <MyCoursesPage />
                  </RoleGuard>
                }
              />
              <Route
                path="/student/assessments"
                element={
                  <RoleGuard allowedRoles={['student']}>
                    <StudentAssessmentsPage />
                  </RoleGuard>
                }
              />
              <Route
                path="/student/quiz/:assessmentId"
                element={
                  <RoleGuard allowedRoles={['student']}>
                    <QuizRunnerPage />
                  </RoleGuard>
                }
              />
              <Route
                path="/student/reports"
                element={
                  <RoleGuard allowedRoles={['student']}>
                    <BloomReportsPage />
                  </RoleGuard>
                }
              />
              <Route
                path="/student/tutor"
                element={
                  <RoleGuard allowedRoles={['student']}>
                    <StudyTutorPage />
                  </RoleGuard>
                }
              />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
