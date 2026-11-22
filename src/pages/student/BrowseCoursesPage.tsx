import React, { useState } from 'react';
import { Search, BookOpen, Check, Plus, Users, Clock, Award } from 'lucide-react';
import { dbStore } from '../../lib/mockData';
import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const BrowseCoursesPage: React.FC = () => {
  const { user } = useAuth();
  const allCourses = dbStore.getCourses();
  const [searchQuery, setSearchQuery] = useState('');
  const [enrolledMap, setEnrolledMap] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    allCourses.forEach((c) => {
      map[c.id] = dbStore.isEnrolled(c.id);
    });
    return map;
  });

  const handleEnroll = (courseId: string) => {
    dbStore.enrollInCourse(courseId);
    setEnrolledMap((prev) => ({ ...prev, [courseId]: true }));
  };

  const filteredCourses = allCourses.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-espresso-900 tracking-tight">
            Browse Course Catalog
          </h1>
          <p className="text-sm text-espresso-600 mt-0.5">
            Discover courses, register with 1-click, and access faculty lecture notes and assessments.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-espresso-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search courses or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-cream-300 rounded-2xl pl-10 pr-4 py-2 text-xs text-espresso-900 placeholder:text-espresso-400 focus:outline-none focus:ring-2 focus:ring-terracotta-400 focus:border-terracotta-400"
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((c) => {
          const isEnrolled = !!enrolledMap[c.id];
          return (
            <Card key={c.id} hoverEffect className="flex flex-col justify-between">
              <div>
                {/* Visual header */}
                <div className="h-28 bg-gradient-to-tr from-cream-200 via-terracotta-100 to-amber-100 p-5 flex flex-col justify-between border-b border-cream-300/70">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold bg-white text-espresso-800 px-2.5 py-0.5 rounded-lg shadow-2xs">
                      {c.code}
                    </span>
                    <Badge variant={isEnrolled ? 'success' : 'warm'} size="sm">
                      {isEnrolled ? 'Registered' : 'Open'}
                    </Badge>
                  </div>
                  <span className="text-xs font-extrabold text-terracotta-800 uppercase tracking-wider">
                    {c.academic_term}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-base font-bold text-espresso-900 leading-snug">
                    {c.title}
                  </h3>
                  <p className="text-xs text-espresso-600 line-clamp-3 leading-relaxed">
                    {c.description}
                  </p>

                  <div className="pt-3 border-t border-cream-200 flex items-center justify-between text-xs text-espresso-500">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {c.enrolled_count || 30} Students
                    </span>
                    <span>Faculty: {c.faculty_name}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-cream-50/70 border-t border-cream-200 flex items-center justify-between">
                {isEnrolled ? (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full text-emerald-800 border-emerald-200 bg-emerald-50 hover:bg-emerald-100"
                    leftIcon={<Check className="w-4 h-4 text-emerald-600" />}
                    disabled
                  >
                    Enrolled & Active
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={() => handleEnroll(c.id)}
                    leftIcon={<Plus className="w-4 h-4" />}
                  >
                    Enroll in Course
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
