import React, { useRef, useState } from 'react';

const FileUpload = ({ onUpload }) => {
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      simulateUpload(file);
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      simulateUpload(file);
    }
  };

  const simulateUpload = (file) => {
    setProgress(0);
    let percent = 0;
    const interval = setInterval(() => {
      percent += 10;
      setProgress(percent);
      if (percent >= 100) {
        clearInterval(interval);
        onUpload && onUpload(file);
      }
    }, 100);
  };

  return (
    <div
      onDragOver={e => { e.preventDefault(); setDragActive(true); }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-6 mb-4 transition-colors duration-200 ${dragActive ? 'bg-blue-50 border-blue-400' : 'bg-gray-50 border-gray-300'}`}
    >
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={handleChange}
      />
      <button
        type="button"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={() => inputRef.current.click()}
      >
        Select File
      </button>
      <span className="ml-2 text-gray-600">or drag and drop here</span>
      {progress > 0 && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="text-sm text-gray-700">{progress}%</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
