
'use client';

import CourseDetail from '@/pages/CourseDetail';
import { useParams } from 'next/navigation';

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  
  return <CourseDetail courseId={courseId} />;
}
