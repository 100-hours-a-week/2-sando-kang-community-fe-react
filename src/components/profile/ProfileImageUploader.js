import React, { useState } from "react";

const ProfileImageUploader = ({ onImageChange }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    console.log(file)
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setImagePreview(imageUrl);
      };
      reader.readAsDataURL(file);
  
      onImageChange(file); 
    }
  };
  
  const handleButtonClick = () => {
    document.getElementById("fileInput").click(); 
  };


  return (
    <div className="profile-section">
      <div className="profile-image" id="profileImageContainer" onClick={handleButtonClick}>
        {imagePreview ? (
          <img
            id="profileImage"
            src={imagePreview}
            alt="프로필 이미지"
            style={{ display: "block", width: "100px", height: "100px", objectFit: "cover" }}
          />
        ) : (
          <button className="upload-button" id="uploadButton" >
            +
          </button>
        )}
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
      </div>
      <p className="profile-label">프로필 사진 변경</p>
    </div>
  );
};

export default ProfileImageUploader;
