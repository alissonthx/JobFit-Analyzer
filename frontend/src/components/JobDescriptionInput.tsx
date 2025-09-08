// components/JobDescriptionInput.tsx
import React from 'react';
import { Briefcase, HelpCircle } from 'lucide-react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({ 
  value, 
  onChange 
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <label className="block text-lg font-semibold text-gray-700">
          💼 Job Description
        </label>
        <Popover className="relative">
          <PopoverButton className="text-blue-500 hover:text-blue-700 transition-colors">
            <HelpCircle className="h-5 w-5" />
          </PopoverButton>
          <PopoverPanel
            transition
            className="absolute left-1/2 z-10 mt-2 w-64 -translate-x-1/2 transform px-2 sm:px-0"
          >
            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="relative bg-white p-4 text-sm text-gray-600">
                <p>Paste the complete job description, including:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Required skills</li>
                  <li>Responsibilities</li>
                  <li>Qualifications</li>
                  <li>Experience requirements</li>
                </ul>
              </div>
            </div>
          </PopoverPanel>
        </Popover>
      </div>
      
      <div className="relative">
        <Briefcase className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
        
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste the job description you're applying for... Include requirements, skills, and responsibilities for better analysis."
          rows={8}
          className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl resize-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 placeholder-gray-400 transition-all duration-200 text-gray-700 text-lg shadow-inner"
        />
      </div>
      
      <div className="flex justify-between items-center mt-3">
        <p className="text-sm text-gray-500">
          Character count: {value.length}
        </p>
        {value.length > 0 && (
          <p className="text-sm text-blue-600 font-medium">
            {value.length > 100 ? '✓ Good length' : 'Add more details for better analysis'}
          </p>
        )}
      </div>
    </div>
  );
};

export default JobDescriptionInput;