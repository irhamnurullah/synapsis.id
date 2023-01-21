import React from 'react';
import { HomeIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="text-white py-7 flex flex-col h-screen justify-between sticky top-0">
      <div className="flex flex-col space-y-4">
        <Link href={'/'}>
          <div className="flex space-x-4">
            <HomeIcon className="h-6 w-6" />
            <h1 className="text-xl font-bold">Home</h1>
          </div>
        </Link>
        <Link href={'/user'}>
          <div className="flex space-x-4">
            <UserGroupIcon className="h-6 w-6" />
            <h1 className="text-xl font-bold">Users</h1>
          </div>
        </Link>
      </div>

      <div>
        <p className="text-xs">Irham Nurullah</p>
      </div>
    </aside>
  );
}
