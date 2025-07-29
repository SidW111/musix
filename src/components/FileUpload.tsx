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
    <label
  htmlFor="audio-upload"
  className="relative inline-block px-6 py-3 cursor-pointer rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-sm shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_#a855f7]"
>
  🎵 Upload Your Audio 🎵
  <input
    id="audio-upload"
    type="file"
    accept="audio/*,.mp3,.wav"
    onChange={handleChange}
    className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer"
  />
</label>
  );
};


export default FileUpload