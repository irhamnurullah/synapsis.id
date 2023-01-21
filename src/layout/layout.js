import React from 'react';

export default function Layout({ left, middle, right }) {
  return (
    <div className="bg-slate-900 ">
      <div className="max-w-7xl mx-auto grid grid-cols-12">
        <div className="col-span-2 border-r border-gray-600">{left}</div>
        <div className="col-span-8 ">{middle}</div>
        <div className="col-span-2">{right}</div>
      </div>
    </div>
  );
}
