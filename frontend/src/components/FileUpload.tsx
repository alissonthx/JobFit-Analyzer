import React from 'react';
import { Upload } from 'lucide-react';

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
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload Your Resume (PDF)
      </label>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          resumeFile 
            ? 'border-green-500 bg-green-50' 
            : 'border-gray-300 hover:border-blue-400 bg-gray-50'
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
        
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
        
        {resumeFile ? (
          <div>
            <p className="text-green-600 font-medium">✓ File Selected</p>
            <p className="text-sm text-gray-600 mt-1">{resumeFile.name}</p>
            <p className="text-xs text-gray-500 mt-2">
              Click to choose a different file
            </p>
          </div>
        ) : (
          <div>
            <p className="text-gray-600">
              Drag & drop your resume here, or click to browse
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PDF files only (max 5MB)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;