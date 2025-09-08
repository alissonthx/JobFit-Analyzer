import React from 'react';
import { Briefcase } from 'lucide-react';

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
      <label className="block text-lg font-semibold text-gray-700 mb-4">
        💼 Job Description
      </label>
      
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