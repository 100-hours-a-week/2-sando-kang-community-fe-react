import React, { useState } from 'react';


const ProfileImage = ({ setFile }) => {
    const [imagePreview, setImagePreview] = useState(''); 
  
    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result);
          console.log('선택된 파일:', selectedFile);
          setFile(selectedFile); 
        };
        reader.readAsDataURL(selectedFile);
      }
    };
  
    const handleUploadClick = () => {
      document.getElementById('fileInput').click();
    };
  
    return (
      <div className="profile-section">
        <div className="profile-image">
          {imagePreview ? (
            <img src={imagePreview} alt="프로필 이미지" />
          ) : (
            <div className="placeholder">프로필 이미지</div>
          )}
        </div>
        {!imagePreview && (
          <button className="upload-button" onClick={handleUploadClick}>
            변경
          </button>
        )}
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
    );
  };
  
  export default ProfileImage;
  