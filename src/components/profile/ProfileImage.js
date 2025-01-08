import React, { useState, useEffect } from 'react';

const ProfileImage = ({ setFile }) => {
    const [imagePreview, setImagePreview] = useState(''); 
  
    useEffect(() => {
      const storedProfileImage = localStorage.getItem('profile');
      if (!imagePreview && storedProfileImage) {
        setImagePreview(storedProfileImage); // 로컬스토리지에서 프로필 이미지를 설정
      }
    }, [imagePreview]); // imagePreview가 없을 때만 로컬스토리지를 확인
  
    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result); // 미리보기 이미지 설정
          console.log('선택된 파일:', selectedFile);
          setFile(selectedFile); // 상위 컴포넌트로 파일 전달
        };
        reader.readAsDataURL(selectedFile);
      }
    };
  
    const handleUploadClick = () => {
      document.getElementById('fileInput').click();
    };
  
    return (
      <div className="profile-section">
        <div className="profile-image" onClick={handleUploadClick} style={{ cursor: 'pointer' }}>
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
