import React, { useState } from 'react';
import { handleLocation } from '../../utils/handleLocation';
import { getLocalStorage, saveLocalStorage } from '../../utils/session';

const ProfileUpdateButton = ({ nickname, setError, error, file }) => {
  const [toastVisible, setToastVisible] = useState(false);

  const handleUpdate = async () => {
    console.log('닉네임:', nickname);
    console.log('파일:', file);
  
    if (!file) {
      console.error('파일이 전달되지 않았습니다.');
      setError('파일을 선택해 주세요.');
      return;
    }
  
    const formData = new FormData();
    const userId = getLocalStorage('userId');
    try {
      formData.append('user_id', userId);
      formData.append('nickname', nickname);
      formData.append('profile', file);
  
      const response = await fetch('/api/auth/nickname', {
        method: 'PATCH',
        body: formData,
      });
      const data = await response.json();
  
      if (data.success) {
        alert(`프로필 수정이 완료되었습니다`);
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 2000);
        saveLocalStorage('nickname', nickname);
  
        // FileReader로 파일을 Base64로 변환 후 저장
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64Data = e.target.result;
          console.log('Base64로 변환된 데이터:', base64Data);
          saveLocalStorage('profile', base64Data); // Base64 데이터 저장
        };
        reader.readAsDataURL(file); // Base64 변환 실행
        handleLocation('/Posts');
      } else {
        alert(`프로필 수정 중 에러가 발생하였습니다`);
        setError(data.message || '닉네임 수정 실패');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`JPG, PNG, GIF만 허용됩니다.`);
      window.location.reload();
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
