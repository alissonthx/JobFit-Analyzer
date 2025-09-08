import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { HelpCircle } from 'lucide-react';
import React from 'react';

interface PopoverHelpProps {
  title?: string;
  children: React.ReactNode;
}

const PopoverHelp: React.FC<PopoverHelpProps> = ({ title, children }) => {
  return (
    <Popover className="relative">
      <PopoverButton className="text-blue-500 hover:text-blue-600 transition-colors">
        <HelpCircle className="h-5 w-5" />
      </PopoverButton>
      <PopoverPanel
        transition
        className="absolute right-0 z-10 mt-2 w-80 transform px-2 sm:px-0"
      >
        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="relative bg-white p-4 text-sm text-gray-600">
            {title && (
              <h3 className="font-semibold text-gray-800 mb-3">{title}</h3>
            )}
            {children}
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  );
};

export default PopoverHelp;