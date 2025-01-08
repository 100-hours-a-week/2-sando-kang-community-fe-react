import React, { useState, useEffect } from 'react';
import { useHandleLocation } from '../../utils/handleLocation';import "../../styles/common/header/make-post-header.css";

const MakePostHeader = ({ title }) => {
  const [profile, setProfile] = useState(null);

  // 로컬 스토리지에서 프로필 데이터 가져오기
  useEffect(() => {
    const profileData = localStorage.getItem('profile'); // Base64 데이터 가져오기
    if (profileData) {
      setProfile(profileData); // 상태에 저장
    }
  }, []);

  const handleBack = () => {
    window.history.go(-1);
  };

  const handleProfile = () => {
    handleLocation('/profile');
  };

  return (
    <header>
      <div id="header-container">
        <div className="back">
          <button className="page-back" onClick={handleBack}>
            {'<'}
          </button>
        </div>
        <div className="title">
          <h1>{title}</h1>
        </div>
        <div className="icon" onClick={handleProfile}>
          {profile ? (
            <img src={profile} alt="사용자 아이콘" className="user-icon" />
          ) : (
            <div className="placeholder">프로필 없음</div>
          )}
        </div>
      </div>
    </header>
  );
};

export default MakePostHeader;
