import { formatDate } from '@/app/lib/date';
import React from 'react';
import Link from 'next/link';

function CourseCard({ details }) {
  const {
    thumbnail,
    name,
    author,
    description,
    creation_date: createdDate,
    id
  } = details;
  return (
    <div className="bg-blue-200 shadow-lg rounded-lg">
      <div className='flex justify-center'>
      <img
        src={thumbnail}
        alt={name}
        className="max-w-fit h-48 object-fit object-center rounded-t-lg"
      />
      </div>
      
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{name}</h2>
        <p className="text-gray-600 text-sm mb-2">Author: {author}</p>
        <p className="text-gray-700 text-base mb-4">
          Description: {description}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-gray-600 text-sm">{formatDate(createdDate)}</p>
          <Link href={`/details/${id}`}>
            <button className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
