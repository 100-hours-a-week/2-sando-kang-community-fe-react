// ProfileUpdateButton.js

import React, { useState } from 'react';
import { getLocalStorage,saveLocalStorage } from '../../utils/session';
const ProfileUpdateButton = ({ nickname, image, setError, error }) => {
  const [toastVisible, setToastVisible] = useState(false);
 
  // 수정하기 버튼 클릭 시 처리
  const handleUpdate = async () => {
    
      try {
        const userId = getLocalStorage('userId');
        const response = await fetch('http://localhost:3000/api/auth/nickname', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: userId,
            nickname: nickname,
          }),
        });

        if (response.ok) {
          alert('닉네임 수정 성공');
          setToastVisible(true); // 수정 성공 시 toast 메시지 표시
          setTimeout(() => setToastVisible(false), 2000); // 2초 후 toast 숨기기

          saveLocalStorage('nickname', nickname); // 성공 시 로컬 스토리지에 저장
        } else {
          const errorData = await response.json();
          setError(errorData.message || '수정 실패');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('서버와의 통신 오류');
      }
  
  };

  return (
    <div className="profile-field">
      <button id="updateButton" onClick={handleUpdate}>
        수정하기
      </button>
      {error && <p className="error-message">{error}</p>}
      {toastVisible && <div className="toast-message">수정이 완료되었습니다.</div>}
    </div>
  );
};

export default ProfileUpdateButton;
