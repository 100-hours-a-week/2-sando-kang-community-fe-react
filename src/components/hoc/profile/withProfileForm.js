import React, { useState, useEffect } from 'react';
import { getLocalStorage } from '../../../utils/session';
import { nicknameValidCheck } from '../../../utils/validation';

const withProfileForm = (Component) => {
  return function ProfileFormHOC(props) {
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState('');
    const [localEmail, setLocalEmail] = useState('');

    useEffect(() => {
      setNickname(getLocalStorage('nickname') || '');
      setLocalEmail(getLocalStorage('email') || '이메일');
    }, []);

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
      <Component
        {...props}
        nickname={nickname}
        setNickname={setNickname}
        error={error}
        setError={setError}
        localEmail={localEmail}
        handleNicknameChange={handleNicknameChange}
      />
    );
  };
};

export default withProfileForm;
