"use client"
import { useEffect, useState } from 'react';
import { backendUrls } from './lib/rest-urls';
import CourseCard from '@/app/ui/course-card';
import { fetchHandler } from './lib/request-handler';

export default function Home() {
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const response = await fetchHandler(backendUrls.getAllCourses);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-10 mt-10">Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((course) => (
          <CourseCard
            key={course.id} // Assuming each course has a unique identifier
            details={course}
          />
        ))}
      </div>
    </div>
  );
}
