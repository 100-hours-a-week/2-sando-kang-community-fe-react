import React, { useState, useEffect } from 'react';
import { getLocalStorage } from '../../utils/session';
import { nicknameValidCheck } from '../../utils/validation';


const ProfileForm = ({ nickname, setNickname, setError, error }) => {
  const [localEmail, setLocalEmail] = useState('');

  useEffect(() => {
    setNickname(getLocalStorage('nickname') || '');
    setLocalEmail(getLocalStorage('email') || '이메일');
  }, [setNickname]);

  const handleNicknameChange = (e) => {
    const newNickname = e.target.value;
    setNickname(newNickname);

    // 유효성 검사
    const isValid = nicknameValidCheck(newNickname, {
      innerText: '',
      style: { display: 'block' },
    });

    if (!isValid) {
      setError('닉네임이 유효하지 않습니다.');
    } else {
      setError('');
    }
  };

  return (
    <div className="profile-field">
      <form className="profile-form">
        <label htmlFor="email">이메일</label>
        <input id="email" value={localEmail} readOnly />

        <label htmlFor="nickname">닉네임</label>
        <input
          id="nickname"
          value={nickname}
          onChange={handleNicknameChange}
          placeholder="닉네임"
        />
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default ProfileForm;
