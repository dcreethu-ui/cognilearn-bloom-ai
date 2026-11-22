import React, { useState } from 'react';
import { Bot, Send, Sparkles, BookOpen, User, RefreshCw } from 'lucide-react';
import { dbStore } from '../../lib/mockData';
import { useAuth } from '../../context/AuthContext';
import { askAIStudyAssistant } from '../../lib/gemini';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const StudyTutorPage: React.FC = () => {
  const { user } = useAuth();
  const enrolledCourses = dbStore.getEnrolledCourses(user?.id || 's202-student-id');
  const [selectedCourseId, setSelectedCourseId] = useState<string>(enrolledCourses[0]?.id || 'c-101');
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const materials = dbStore.getMaterials(selectedCourseId);
  const selectedCourse = dbStore.getCourseById(selectedCourseId) || enrolledCourses[0];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: `Hello Alex! I am your AI Study Tutor for ${selectedCourse?.title}. I can explain difficult concepts, break down Bloom's Taxonomy learning levels, or help you understand course materials. What would you like to explore today?`,
      timestamp: 'Just now',
    },
  ]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputQuery.trim() || isLoading) return;

    const userText = inputQuery.trim();
    setInputQuery('');

    const newMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, newMsg]);
    setIsLoading(true);

    // Collect material excerpts to ground AI tutor
    const context = materials.map((m) => m.extracted_text || '').join('\n\n');
    const answer = await askAIStudyAssistant(
      userText,
      selectedCourse?.title || 'Data Structures',
      context
    );

    const botMsg: ChatMessage = {
      id: `bot-${Date.now()}`,
      sender: 'assistant',
      text: answer,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, botMsg]);
    setIsLoading(false);
  };

  const samplePrompts = [
    'Explain how AVL tree double rotations work in simple terms.',
    'Why does open addressing with double hashing avoid secondary clustering?',
    'What is the difference between Apply and Analyze in Bloom\'s taxonomy?',
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-espresso-900 tracking-tight">
            AI Study Assistant
          </h1>
          <p className="text-sm text-espresso-600 mt-0.5">
            Socratic concept tutor grounded in your faculty's uploaded lecture materials.
          </p>
        </div>

        {/* Course Filter */}
        <select
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
          className="bg-white border border-cream-300 rounded-2xl px-4 py-2 text-xs font-bold text-espresso-800 focus:outline-none focus:ring-2 focus:ring-terracotta-400"
        >
          {enrolledCourses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.code}: {c.title}
            </option>
          ))}
        </select>
      </div>

      {/* Chat Container */}
      <Card className="flex flex-col h-[650px] shadow-warm">
        {/* Messages Scroll Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-cream-50/50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${
                m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 ${
                  m.sender === 'user'
                    ? 'bg-terracotta-500 text-white'
                    : 'bg-white border border-cream-300 text-terracotta-600 shadow-2xs'
                }`}
              >
                {m.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>

              <div
                className={`max-w-[80%] rounded-3xl p-4 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-terracotta-500 text-white rounded-tr-sm shadow-warm'
                    : 'bg-white text-espresso-900 border border-cream-300 rounded-tl-sm shadow-2xs whitespace-pre-line'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-espresso-500 pl-12">
              <Bot className="w-4 h-4 text-terracotta-600 animate-pulse" />
              <span>AI tutor is analyzing course materials and formulating response...</span>
            </div>
          )}
        </div>

        {/* Sample Prompt Chips */}
        <div className="px-6 py-2.5 bg-cream-100/70 border-t border-cream-200 flex flex-wrap gap-2 items-center">
          <span className="text-[10px] font-bold text-espresso-500 uppercase">Try asking:</span>
          {samplePrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => {
                setInputQuery(p);
              }}
              className="text-[11px] font-medium bg-white hover:bg-cream-200 text-espresso-700 border border-cream-300 px-2.5 py-1 rounded-xl transition-colors truncate max-w-xs"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-cream-200 flex items-center gap-3">
          <input
            type="text"
            placeholder="Ask a question about your course materials or concepts..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            disabled={isLoading}
            className="flex-1 bg-cream-100/70 border border-cream-300 rounded-2xl px-4 py-3 text-xs text-espresso-900 placeholder:text-espresso-400 focus:outline-none focus:ring-2 focus:ring-terracotta-400"
          />
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading || !inputQuery.trim()}
            leftIcon={<Send className="w-4 h-4" />}
          >
            Send
          </Button>
        </form>
      </Card>
    </div>
  );
};
