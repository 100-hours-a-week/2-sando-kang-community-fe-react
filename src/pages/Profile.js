import React, { useState } from 'react';
import { getLocalStorage } from '../utils/session';
import { handleLocation } from '../utils/handleLocation';
import ProfileContainer from '../components/container/profile-container';
import ProfileHeader from '../components/header/profile-header'; 
import ProfileUpdateButton from '../components/profile/ProfileUpdateButton';
import WithdrawButton from '../components/profile/WithdrawButton';
import WithdrawModal from '../components/profile/WithdrawModal';
import ToastMessage from '../components/profile/ToastMessage';
import ProfileForm from '../components/profile/ProfileForm';

import '../styles/common/container/profile-container.css';
import '../styles/profile/profile.css';
import ProfileImage from '../components/profile/ProfileImage';

const Profile = () => {
  const [isModalVisible, setModalVisible] = useState(false); 
  const [file, setFile] = useState();
  const [nickname, setNickname] = useState(getLocalStorage('nickname') || ''); 
  const [error, setError] = useState(''); 
  
  const handleWithdraw = () => {
    setModalVisible(true); 
  };

  const handleModalConfirm = async () => {
    const userId = getLocalStorage('userId'); 
  
    if (userId) {
      try {
        const response = await fetch('/api/auth/withdraw', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: userId }), 
        });
  
        const data = await response.json();
  
        if (data.success) {
          alert('회원 탈퇴가 완료되었습니다.');
          setModalVisible(false); // 모달 닫기 
          handleLocation('/');
        } else {
          alert(`회원 탈퇴 실패: ${data.message}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert(`오류 발생: ${error.message}`);
      }
    } else {
      alert('사용자 ID를 찾을 수 없습니다.');
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false); // 모달 숨기기
  };

  const handleNicknameChange = (e) => {
    const newNickname = e.target.value;
    setNickname(newNickname);

    // 유효성 검사 (예: 닉네임 길이 확인)
    if (newNickname.length < 2 || newNickname.length > 10) {
      setError('닉네임은 2자 이상 10자 이하여야 합니다.');
    } else {
      setError('');
    }
  };

  return (
    <ProfileContainer>
      <ProfileHeader title="아무말 대잔치" />
      <ProfileImage setFile={setFile} />
      <ProfileForm
        nickname={nickname}
        setNickname={setNickname}
        error={error}
        localEmail={getLocalStorage('email')}
        handleNicknameChange={handleNicknameChange}
      />
      <ProfileUpdateButton
        nickname={nickname}
        setError={setError}
        error={error}
        file={file}
      />
      <WithdrawButton onWithdraw={handleWithdraw} />
      <WithdrawModal
        visible={isModalVisible}
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
      />
      <ToastMessage />
    </ProfileContainer>
  );
};

export default Profile;
