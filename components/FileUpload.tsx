import React from "react";

type fileUploadProps = {
  onFileSelect: (file: File) => void;
};

 const FileUpload = ({ onFileSelect }: fileUploadProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <input
        type="file"
        accept="audio/*"
        onChange={handleChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:px-4 file:py-2 
                   file:rounded-full file:border-0 file:text-sm file:font-semibold
                 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
      />
    </div>
  );
};


export default FileUpload;