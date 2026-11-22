import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Pause, 
  Play, 
  X,
  Award
} from 'lucide-react';
import { dbStore } from '../../lib/mockData';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const QuizRunnerPage: React.FC = () => {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const assessment = dbStore.getAssessmentById(assessmentId || 'asm-1');
  const questions = dbStore.getQuestions(assessmentId || 'asm-1');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState((assessment?.duration_minutes || 20) * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (isPaused || timeLeftSeconds <= 0) return;
    const interval = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, timeLeftSeconds]);

  const handleSelectOption = (questionId: string, optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const currentQuestion = questions[currentIndex] || questions[0];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAutoSubmit = () => {
    executeSubmission();
  };

  const executeSubmission = () => {
    setIsSubmitting(true);
    const timeSpent = (assessment?.duration_minutes || 20) * 60 - timeLeftSeconds;
    const { report } = dbStore.evaluateAttempt(
      assessment?.id || 'asm-1',
      user?.id || 's202-student-id',
      selectedAnswers,
      Math.max(15, timeSpent)
    );
    setIsSubmitting(false);
    navigate(`/student/reports?reportId=${report.id}`);
  };

  if (!assessment || questions.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-cream-300">
        <h3 className="text-lg font-bold text-espresso-900">Assessment not found or has no questions.</h3>
        <Link to="/student/assessments" className="mt-4 inline-block text-terracotta-600 font-semibold">
          Return to Assessments
        </Link>
      </div>
    );
  }

  // Calculate circular timer stroke dash
  const totalSeconds = (assessment.duration_minutes || 20) * 60;
  const progressRatio = timeLeftSeconds / totalSeconds;
  const circleRadius = 52;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - progressRatio * circumference;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Quiz Header Bar */}
      <div className="flex items-center justify-between bg-white px-6 py-4 rounded-3xl border border-cream-300/80 shadow-warm">
        <div className="flex items-center gap-3">
          <Link
            to="/student/assessments"
            className="p-2 rounded-2xl bg-cream-100 text-espresso-700 hover:bg-cream-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <span className="font-mono text-xs font-bold bg-cream-200 text-espresso-800 px-2.5 py-0.5 rounded-md">
              {assessment.course_code}
            </span>
            <h2 className="text-base font-bold text-espresso-900 leading-tight mt-0.5">
              {assessment.title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <span className="text-xs font-medium text-espresso-600/80">Answered</span>
            <div className="text-sm font-bold text-espresso-900">
              {answeredCount} / {totalQuestions}
            </div>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsSubmitModalOpen(true)}
            leftIcon={<CheckCircle className="w-4 h-4" />}
          >
            Submit Quiz
          </Button>
        </div>
      </div>

      {/* Main Focus Assessment Card - Styled with Warm Aesthetic matching Screen 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Warm Circular Countdown Timer & Cognitive Progress (matching Screen 3) */}
        <div className="bg-gradient-to-b from-terracotta-500 via-amber-500 to-terracotta-600 rounded-3xl p-6 text-white shadow-warm flex flex-col items-center justify-between text-center relative overflow-hidden">
          {/* Subtle decorative circles */}
          <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full bg-white/10 blur-xl pointer-events-none" />

          <div className="w-full flex items-center justify-between text-white/90 text-xs font-semibold">
            <span>COGNITIVE FOCUS</span>
            <button
              onClick={() => setIsPaused((p) => !p)}
              className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              title={isPaused ? 'Resume Timer' : 'Pause Timer'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Circular Progress Timer (Screen 3 inspired) */}
          <div className="relative my-6 flex items-center justify-center">
            <svg className="w-36 h-36 transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r={circleRadius}
                stroke="currentColor"
                strokeWidth="8"
                className="text-white/20"
                fill="transparent"
              />
              <circle
                cx="72"
                cy="72"
                r={circleRadius}
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="text-white transition-all duration-1000 ease-linear"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <Clock className="w-4 h-4 text-white/80 mb-1" />
              <span className="text-2xl font-extrabold tracking-tight text-white font-mono">
                {formatTimer(timeLeftSeconds)}
              </span>
              <span className="text-[10px] text-white/80 uppercase tracking-wider font-semibold">
                {isPaused ? 'Paused' : 'Remaining'}
              </span>
            </div>
          </div>

          <div className="w-full bg-white/15 backdrop-blur-md rounded-2xl p-3 border border-white/20">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Step {currentIndex + 1} of {totalQuestions}
            </div>
            <div className="w-full bg-white/30 rounded-full h-2 mt-2 overflow-hidden">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Question Content & Options (2 Cols) */}
        <div className="md:col-span-2 bg-white rounded-3xl border border-cream-300/80 shadow-warm p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* Meta Tags: Unit, Topic, Bloom's Level */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-cream-200">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-espresso-600">
                  Unit {currentQuestion.unit_number} • {currentQuestion.topic}
                </span>
                <Badge bloomLevel={currentQuestion.bloom_level} size="sm" />
                <Badge variant={currentQuestion.difficulty === 'hard' ? 'danger' : 'warning'} size="sm" className="capitalize">
                  {currentQuestion.difficulty}
                </Badge>
              </div>
              <span className="text-xs font-bold text-espresso-800 bg-cream-100 px-2.5 py-1 rounded-xl">
                {currentQuestion.marks} Marks
              </span>
            </div>

            {/* Question Stem */}
            <div className="my-6">
              <h3 className="text-base sm:text-lg font-bold text-espresso-900 leading-relaxed">
                {currentQuestion.question_text}
              </h3>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedAnswers[currentQuestion.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(currentQuestion.id, opt.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 select-none ${
                      isSelected
                        ? 'bg-terracotta-50 border-terracotta-500 shadow-sm text-espresso-900 ring-2 ring-terracotta-400/20'
                        : 'bg-white border-cream-300/90 hover:bg-cream-50/80 hover:border-cream-400 text-espresso-800'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-terracotta-500 text-white shadow-2xs'
                          : 'bg-cream-200 text-espresso-700'
                      }`}
                    >
                      {opt.id}
                    </span>
                    <span className="text-sm font-medium leading-relaxed pt-0.5">{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Navigation Footer */}
          <div className="pt-8 mt-6 border-t border-cream-200 flex items-center justify-between">
            <Button
              variant="outline"
              size="md"
              onClick={() => setCurrentIndex((idx) => Math.max(0, idx - 1))}
              disabled={currentIndex === 0}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Previous
            </Button>

            {/* Question Quick Jump Pills */}
            <div className="hidden sm:flex items-center gap-1.5">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = !!selectedAnswers[q.id];
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-terracotta-500 text-white shadow-sm'
                        : isAnswered
                        ? 'bg-cream-300 text-espresso-800'
                        : 'bg-cream-100 text-espresso-400 hover:bg-cream-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {currentIndex < totalQuestions - 1 ? (
              <Button
                variant="primary"
                size="md"
                onClick={() => setCurrentIndex((idx) => Math.min(totalQuestions - 1, idx + 1))}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="warm"
                size="md"
                onClick={() => setIsSubmitModalOpen(true)}
                rightIcon={<CheckCircle className="w-4 h-4" />}
              >
                Submit All
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Submit Modal */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="Submit Assessment?"
        description="Your responses will be graded deterministically by the backend analysis engine."
      >
        <div className="space-y-4">
          <div className="p-4 bg-cream-100 rounded-2xl border border-cream-300 text-xs text-espresso-800 space-y-2">
            <div className="flex justify-between">
              <span>Total Questions:</span>
              <span className="font-bold">{totalQuestions}</span>
            </div>
            <div className="flex justify-between">
              <span>Questions Answered:</span>
              <span className="font-bold text-terracotta-600">{answeredCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Unanswered Questions:</span>
              <span className="font-bold text-rose-600">{totalQuestions - answeredCount}</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setIsSubmitModalOpen(false)}>
              Back to Quiz
            </Button>
            <Button
              variant="primary"
              onClick={executeSubmission}
              isLoading={isSubmitting}
              leftIcon={<CheckCircle className="w-4 h-4" />}
            >
              Confirm & Grade Answers
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
