import React, { useState } from 'react';
import { useHandleLocation } from '../../utils/handleLocation';
import { getLocalStorage, saveLocalStorage } from '../../utils/session';

const ProfileUpdateButton = ({ nickname, setError, error, file }) => {
  const [toastVisible, setToastVisible] = useState(false);

  const handleLocation = useHandleLocation();
  const handleUpdate = async () => {
    
    const formData = new FormData();
    const userId = getLocalStorage('userId');
    const token = getLocalStorage('jwtToken');
    try {

      formData.append('user_id', userId);
      
      if(nickname.length <= 0) alert('닉네임을 입력해주세요');
      else{
        formData.append('nickname', nickname);
      
        if(file)formData.append('profile', file);
      
        const response = await fetch('/api/auth/nickname', {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        const data = await response.json();
    
        if (data.success) {
          console.log(data.data)
          alert(`프로필 수정이 완료되었습니다`);
          setToastVisible(true);
          setTimeout(() => setToastVisible(false), 2000);
          saveLocalStorage('nickname', nickname);
    
          if(file){
            const reader = new FileReader();
            reader.onload = (e) => {
              const base64Data = e.target.result;
              console.log(base64Data)
              saveLocalStorage('profile', base64Data); 
            }
            reader.readAsDataURL(file)
          }
          handleLocation('/Posts');
        } else {
          alert(`${data.message.code}`);
          setError(data.message.code || '닉네임 수정 실패');
        }
      }
    } catch (error) {
      alert(error);
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
