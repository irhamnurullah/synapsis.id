import Navbar from '@/components/navbar';
import React from 'react';
import { useRouter } from 'next/router';
export default function Layout({ left, middle, right }) {
  const router = useRouter();
  const pathUser = router.pathname === '/user';

  return (
    <div className="bg-slate-900 ">
      <Navbar />
      <div className="max-w-7xl mx-auto grid grid-cols-12">
        <div className="col-span-2 border-r border-gray-600">{left}</div>
        <div className={`${pathUser ? 'col-span-10' : 'col-span-8'}`}>
          {middle}
        </div>
        {!pathUser && <div className="col-span-2">{right}</div>}
      </div>
    </div>
  );
}
