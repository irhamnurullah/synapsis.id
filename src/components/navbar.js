import React from 'react';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <nav className="sticky top-0 z-30  bg-slate-900 bg-opacity-50 backdrop-filter backdrop-blur text-gray-300 border-b border-slate-400">
      <div className="container mx-auto">
        <div className="flex items-center justify-center py-5">
          <button onClick={scrollToTop} className="font-bold text-xl">
            {router.pathname === '/' ? 'Home' : 'Users'}
          </button>
        </div>
      </div>
    </nav>
  );
}
