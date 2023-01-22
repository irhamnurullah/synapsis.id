import { Dialog } from '@headlessui/react';
import React, { useState } from 'react';

export default function modal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      as="div"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-10"
    >
      <div className="fixed inset-0 bg-slate-900 bg-opacity-25 backdrop-filter backdrop-blur" />
      <Dialog.Panel>
        <div className="fixed w-1/4 left-[39%] top-1/4 inset-0 h-1/2 p-5 bg-white z-30  rounded-2xl">
          Hallo
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
