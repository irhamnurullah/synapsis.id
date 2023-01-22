import { Menu } from '@headlessui/react';
import React from 'react';

export default function UserCard({ name, email, gender, status }) {
  return (
    <article className="w-80 bg-white rounded-[6px] shadow-md hover:scale-105 transition duration-200">
      <div className="border-b">
        <div className="p-4">
          <div className="flex items-center relative">
            <div className="bg-red-300 rounded-full p-7 inline-block"></div>
            <div className="flex-1 ml-2">
              <h1 className="text-sm text-gray-800 font-semibold">{name}</h1>
              <h3 className="text-xs text-gray-600 font-medium">{email}</h3>
            </div>
            <div className="absolute right-0 top-0">...</div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-end items-center mt-2 space-x-4">
          <div className="text-xs text-blue-800 font-semibold py-1 px-2 rounded-full bg-blue-200">
            {gender}
          </div>
          <div className="text-xs text-green-800 font-medium py-1 px-2 rounded-lg bg-green-300">
            {status}
          </div>
        </div>
      </div>
    </article>
  );
}
