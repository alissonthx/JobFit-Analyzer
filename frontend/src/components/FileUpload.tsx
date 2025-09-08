import React from 'react';
import { Upload, FileText } from 'lucide-react';

interface FileUploadProps {
  resumeFile: File | null;
  onFileChange: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ resumeFile, onFileChange }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileChange(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === 'application/pdf') {
      onFileChange(files[0]);
    }
  };

  return (
    <div>
      <label className="block text-lg font-semibold text-gray-700 mb-4">
        📄 Upload Your Resume (PDF)
      </label>
      
      <div
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
          resumeFile 
            ? 'border-green-500 bg-green-50 ring-4 ring-green-100 shadow-inner' 
            : 'border-gray-300 hover:border-blue-400 bg-gray-50 hover:bg-blue-50 hover:shadow-md'
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => document.getElementById('resume-upload')?.click()}
      >
        <input
          id="resume-upload"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        
        {resumeFile ? (
          <FileText className="mx-auto h-16 w-16 text-green-500 mb-4" />
        ) : (
          <Upload className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        )}
        
        {resumeFile ? (
          <div className="space-y-3">
            <p className="text-green-600 font-semibold text-xl">✓ Resume Uploaded!</p>
            <p className="text-sm text-gray-600 bg-white py-2 px-4 rounded-full inline-block border">
              {resumeFile.name}
            </p>
            <p className="text-xs text-gray-500 mt-4">
              Click to choose a different file
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-gray-600 text-xl font-semibold">
              Drag & drop your resume here
            </p>
            <p className="text-gray-500 text-lg">
              or click to browse files
            </p>
            <p className="text-sm text-gray-400 mt-4">
              Supports PDF files only (max 5MB)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;