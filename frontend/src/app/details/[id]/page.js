'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RouteNavigator } from '@/app/ui/redirect-comp';
import { deleteCourse, fetchData } from './api';

export default function Page({ params: { id } }) {
  const [config, setConfig] = useState({
    data: {},
    redirectToHome: false,
  });
  const { data: course } = config;

  useEffect(() => {
    fetchData(id, setConfig);
  }, [id]);
  return (
    <>
      <ToastContainer />
      <RouteNavigator navigate={config.redirectToHome} />
      <div className="container mx-auto mt-8">
        <div className="bg-blue-200 shadow-lg rounded-lg p-6">
          <div className="flex justify-center">
            <img
              src={course?.thumbnail}
              alt={course?.name}
              className="h-48 object-fit object-center rounded-lg mb-6"
            />
          </div>

          <div className="flex justify-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {course?.name}
              </h2>
              <p className="text-gray-600 mb-4">Author: {course?.author}</p>
              <p className="text-gray-700">{course?.description}</p>
              <div className="mt-6 ">
                <button
                  onClick={() => {
                    deleteCourse(course.id, setConfig);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-4"
                >
                  Delete Course
                </button>
                <Link href={`/`}>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                    Back to Home
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
