
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { toast } from 'sonner';

// Mock course data with modules
const coursesData = [
  {
    id: '1',
    title: 'Investment Fundamentals',
    description: 'Learn the basics of investment and build a solid foundation for your financial journey.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    duration: '4 hours',
    level: 'Beginner',
    modules: [
      {
        id: 'module-1-1',
        title: 'Understanding Investment Basics',
        videoUrl: 'https://www.youtube.com/embed/Pb9MZoIKVhg',
        description: 'This module introduces the fundamental concepts of investment, explaining different asset classes and how financial markets work.',
      },
      {
        id: 'module-1-2',
        title: 'Risk Management',
        videoUrl: 'https://www.youtube.com/embed/dCWWdO4JnqQ',
        description: 'Learn about risk assessment, portfolio diversification, and strategies to protect your investments against market volatility.',
      },
      {
        id: 'module-1-3',
        title: 'Creating an Investment Plan',
        videoUrl: 'https://www.youtube.com/embed/chVOQTmDvRY',
        description: 'Develop a personalized investment plan based on your financial goals, risk tolerance, and time horizon.',
      },
      {
        id: 'module-1-4',
        title: 'Measuring Investment Performance',
        videoUrl: 'https://www.youtube.com/embed/P2vxVl3zkZo',
        description: 'Understand key metrics and methods to evaluate the performance of your investments over time.',
      }
    ]
  },
  {
    id: '2',
    title: 'Stock Market Essentials',
    description: 'Understand how the stock market works and develop effective trading strategies.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    duration: '6 hours',
    level: 'Intermediate',
    modules: [
      {
        id: 'module-2-1',
        title: 'Introduction to Stock Markets',
        videoUrl: 'https://www.youtube.com/embed/p7HKvqRI_Bo',
        description: 'An overview of stock markets, their function in the economy, and how they provide opportunities for investors.',
      },
      {
        id: 'module-2-2',
        title: 'Fundamental Analysis',
        videoUrl: 'https://www.youtube.com/embed/7CMGmdKZ7-8',
        description: 'Learn how to analyze company financials, industry trends, and economic indicators to make informed stock selections.',
      },
      {
        id: 'module-2-3',
        title: 'Technical Analysis',
        videoUrl: 'https://www.youtube.com/embed/eynxyoKgpng',
        description: 'Master chart reading, pattern recognition, and technical indicators to time your entry and exit from stocks.',
      },
      {
        id: 'module-2-4',
        title: 'Building a Stock Portfolio',
        videoUrl: 'https://www.youtube.com/embed/5rwoiUtn02E',
        description: 'Strategies for constructing a balanced stock portfolio that aligns with your investment objectives.',
      }
    ]
  },
  // Adding more courses with their modules
  {
    id: '3',
    title: 'Personal Finance Mastery',
    description: 'Master budgeting, saving, and long-term financial planning for a secure future.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    duration: '5 hours',
    level: 'Beginner',
    modules: [
      {
        id: 'module-3-1',
        title: 'Budgeting Fundamentals',
        videoUrl: 'https://www.youtube.com/embed/sVKQn2I4HDM',
        description: 'Learn how to create and maintain a budget that helps you track expenses and save for your financial goals.',
      },
      {
        id: 'module-3-2',
        title: 'Debt Management',
        videoUrl: 'https://www.youtube.com/embed/XfoOLBlP_mg',
        description: 'Strategies for managing and reducing debt effectively to improve your financial health.',
      },
      {
        id: 'module-3-3',
        title: 'Emergency Fund Planning',
        videoUrl: 'https://www.youtube.com/embed/bvYc1GyKBLA',
        description: 'How to build and maintain an emergency fund to protect yourself from unexpected financial challenges.',
      },
      {
        id: 'module-3-4',
        title: 'Saving for Major Life Goals',
        videoUrl: 'https://www.youtube.com/embed/iQXrxqwsiPw',
        description: 'Planning and saving for major life events such as education, home purchase, and retirement.',
      }
    ]
  }
];

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [currentCourse, setCurrentCourse] = useState<any>(null);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch course data from an API
    const course = coursesData.find(c => c.id === courseId);
    if (course) {
      setCurrentCourse(course);
    } else {
      // Navigate back to courses if course not found
      navigate('/courses');
      toast.error('Course not found');
    }
    
    // Load completed modules from local storage
    const saved = localStorage.getItem(`course-${courseId}-progress`);
    if (saved) {
      setCompletedModules(JSON.parse(saved));
    }
    
    setIsLoading(false);
  }, [courseId, navigate]);

  const handlePrevious = () => {
    if (currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentCourse && currentModuleIndex < currentCourse.modules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
    }
  };

  const markAsCompleted = () => {
    if (!currentCourse) return;
    
    const moduleId = currentCourse.modules[currentModuleIndex].id;
    const updatedCompletedModules = [...completedModules];
    
    if (!updatedCompletedModules.includes(moduleId)) {
      updatedCompletedModules.push(moduleId);
      setCompletedModules(updatedCompletedModules);
      
      // Save progress to local storage
      localStorage.setItem(
        `course-${courseId}-progress`, 
        JSON.stringify(updatedCompletedModules)
      );
      
      toast.success('Module marked as completed!');
    }
  };

  const isModuleCompleted = (moduleId: string) => {
    return completedModules.includes(moduleId);
  };

  const isCourseCompleted = () => {
    if (!currentCourse) return false;
    return currentCourse.modules.every(module => completedModules.includes(module.id));
  };

  if (isLoading || !currentCourse) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading course...</p>
      </div>
    );
  }

  const currentModule = currentCourse.modules[currentModuleIndex];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container px-4 mx-auto mb-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{currentCourse.title}</h1>
            <p className="text-muted-foreground">{currentCourse.description}</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="col-span-1 border rounded-lg p-4 h-fit">
              <h3 className="font-medium text-lg mb-4">Course Modules</h3>
              <div className="space-y-2">
                {currentCourse.modules.map((module, index) => (
                  <div 
                    key={module.id}
                    className={`p-3 rounded-md cursor-pointer flex items-center gap-2 ${
                      index === currentModuleIndex
                        ? 'bg-primary text-primary-foreground'
                        : isModuleCompleted(module.id)
                        ? 'bg-accent/70'
                        : 'hover:bg-accent'
                    }`}
                    onClick={() => setCurrentModuleIndex(index)}
                  >
                    {isModuleCompleted(module.id) && (
                      <Check className="h-4 w-4 flex-shrink-0" />
                    )}
                    <span className="text-sm">{module.title}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Main Content */}
            <div className="col-span-1 lg:col-span-3">
              <Card>
                <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                  <iframe
                    src={currentModule.videoUrl}
                    title={currentModule.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">{currentModule.title}</h2>
                  <p className="text-muted-foreground mb-6">{currentModule.description}</p>
                  
                  <Tabs defaultValue="content">
                    <TabsList>
                      <TabsTrigger value="content">Module Content</TabsTrigger>
                      <TabsTrigger value="resources">Resources</TabsTrigger>
                      <TabsTrigger value="discussion">Discussion</TabsTrigger>
                    </TabsList>
                    <TabsContent value="content" className="mt-6">
                      <p>This module covers key concepts about {currentModule.title.toLowerCase()}. 
                      Watch the video carefully and make notes of important points to enhance your learning.</p>
                    </TabsContent>
                    <TabsContent value="resources" className="mt-6">
                      <p>Additional resources for {currentModule.title} will be available here including PDFs, recommended readings, and practice exercises.</p>
                    </TabsContent>
                    <TabsContent value="discussion" className="mt-6">
                      <p>Join the discussion about {currentModule.title} with other students. Share your insights and ask questions.</p>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="flex justify-between items-center mt-8">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentModuleIndex === 0}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                    
                    <Button
                      variant={isModuleCompleted(currentModule.id) ? "secondary" : "default"}
                      onClick={markAsCompleted}
                    >
                      {isModuleCompleted(currentModule.id) ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Completed
                        </>
                      ) : (
                        "Mark as Completed"
                      )}
                    </Button>
                    
                    <Button
                      onClick={handleNext}
                      disabled={currentModuleIndex === currentCourse.modules.length - 1}
                    >
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {isCourseCompleted() && (
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg">
                  <h3 className="text-lg font-medium text-green-800 dark:text-green-300 mb-2">
                    Congratulations!
                  </h3>
                  <p className="text-green-700 dark:text-green-400">
                    You have successfully completed this course. You can now access your certificate from your profile.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;
