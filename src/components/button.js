import React from 'react';

export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="px-4 py-2 border rounded-md bg-white hover:bg-slate-900 hover:text-white duration-150"
    >
      {children}
    </button>
  );
}
