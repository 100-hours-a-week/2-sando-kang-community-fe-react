import React, { useState } from 'react';
import { handleLocation } from '../../utils/handleLocation';
import { getLocalStorage, saveLocalStorage } from '../../utils/session';

const ProfileUpdateButton = ({ nickname, setError, error }) => {
  const [toastVisible, setToastVisible] = useState(false);
 
  const handleUpdate = async () => {
    console.log(`nickname : ${nickname}`)
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
        setToastVisible(true); 
        setTimeout(() => setToastVisible(false), 2000); 
        saveLocalStorage('nickname', nickname);
        handleLocation('/Posts');
      } else {
        const errorData = await response.json();
        setError(errorData.message || '닉네임 수정 실패');
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
