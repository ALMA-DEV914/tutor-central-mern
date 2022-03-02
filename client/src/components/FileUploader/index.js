import React, { useRef } from "react";

const FileUploader = ({ onFileSelectSuccess, onFileSelectError }) => {
  const fileInput = useRef(null);

  const handleFileInput = (e) => {
    // handle validations
    const file = e.target.files[0];
    if (file.size > 1024 * 1024 * 10)
      onFileSelectError({ error: "File size cannot exceed more than 10MB" });
    else onFileSelectSuccess(file);
  };

  return (
    <div className='file-uploader'>
      <input
        className='file-input form-control'
        accept='image/png, image/jpeg'
        type='file'
        ref={fileInput}
        onChange={handleFileInput}
      />
    </div>
  );
};

export default FileUploader;
