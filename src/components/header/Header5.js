import React, { useState, useEffect } from 'react';
import { handleLocation } from '../../utils/handleLocation';
import { getLocalStorage } from '../../utils/session';

const MakePostHeader = ({ title }) => {

  const [profile, setProfile] = useState(null);

  const handleBack = () => {
    window.history.go(-1);
  };

  useEffect(() => {
     const profileData = getLocalStorage('profile'); // localStorage에서 프로필 데이터 가져오기
     console.log(`profile: ${profileData}`);
     if (profileData) {
      setProfile(profileData); 
    } 
  },[]);
  

  const handleProfile = () => {
    handleLocation('/profile');
  }

  return (
    <header>
        <div id = "header-container">
          <div className="back">
            <button className="page-back" onClick={handleBack}>
              {'<'}
            </button>
          </div>
          <div className="title">
            <h1>{title}</h1>
          </div>
          <div className="icon" onClick={handleProfile}>
            <img src={profile} alt="사용자 아이콘" className="user-icon" />
          </div>
        </div>
    </header>
  );
};

export default MakePostHeader;
