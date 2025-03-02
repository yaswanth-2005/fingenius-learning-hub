
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CourseCard from '@/components/ui/CourseCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';

const coursesData = [
  {
    id: '1',
    title: 'Investment Fundamentals',
    description: 'Learn the basics of investment and build a solid foundation for your financial journey. This course covers key investment types, risk management, and strategic planning.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    duration: '4 hours',
    level: 'Beginner',
  },
  {
    id: '2',
    title: 'Stock Market Essentials',
    description: 'Understand how the stock market works and develop effective trading strategies. Learn about stock analysis, market trends, and building a balanced portfolio.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    duration: '6 hours',
    level: 'Intermediate',
  },
  {
    id: '3',
    title: 'Personal Finance Mastery',
    description: 'Master budgeting, saving, and long-term financial planning for a secure future. Develop skills to manage debt, build credit, and create a sustainable financial plan.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    duration: '5 hours',
    level: 'Beginner',
  },
  {
    id: '4',
    title: 'Advanced Trading Techniques',
    description: 'Take your trading skills to the next level with advanced analysis methods and sophisticated strategies for maximizing returns in various market conditions.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    duration: '8 hours',
    level: 'Advanced',
  },
  {
    id: '5',
    title: 'Retirement Planning',
    description: 'Comprehensive guide to planning for retirement, including pension strategies, investment vehicles, and calculating your retirement needs based on lifestyle goals.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    duration: '4 hours',
    level: 'Intermediate',
  },
  {
    id: '6',
    title: 'Tax Optimization Strategies',
    description: 'Learn legal and effective tax optimization strategies to minimize your tax burden and maximize your wealth accumulation over time.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21ed6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    duration: '3 hours',
    level: 'Advanced',
  },
];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<string | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);

  const handleEnroll = (courseId: string) => {
    if (enrolledCourses.includes(courseId)) {
      // If already enrolled, do nothing (in a real app, would navigate to course)
      console.log(`Navigate to course ${courseId}`);
    } else {
      // Add to enrolled courses
      setEnrolledCourses([...enrolledCourses, courseId]);
    }
  };

  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = !filterLevel || course.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Header */}
        <section className="bg-muted/30 py-12">
          <div className="container px-4 mx-auto">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold mb-4">Financial Courses</h1>
              <p className="text-lg text-muted-foreground">
                Expand your financial knowledge with our comprehensive courses designed by industry experts.
              </p>
            </div>
          </div>
        </section>
        
        {/* Filters */}
        <section className="py-8 border-b">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium"><Filter className="inline h-4 w-4 mr-1" /> Filter by:</span>
                <Button 
                  variant={filterLevel === null ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setFilterLevel(null)}
                >
                  All
                </Button>
                <Button 
                  variant={filterLevel === 'Beginner' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setFilterLevel('Beginner')}
                >
                  Beginner
                </Button>
                <Button 
                  variant={filterLevel === 'Intermediate' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setFilterLevel('Intermediate')}
                >
                  Intermediate
                </Button>
                <Button 
                  variant={filterLevel === 'Advanced' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setFilterLevel('Advanced')}
                >
                  Advanced
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Courses Grid */}
        <section className="py-12">
          <div className="container px-4 mx-auto">
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    description={course.description}
                    thumbnailUrl={course.thumbnailUrl}
                    duration={course.duration}
                    level={course.level as any}
                    isEnrolled={enrolledCourses.includes(course.id)}
                    onEnroll={handleEnroll}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-xl font-medium mb-2">No courses found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <Button onClick={() => { setSearchTerm(''); setFilterLevel(null); }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;
