import React, { useState } from 'react';
import ProfileContainer from '../components/container/ProfileContainer';
import ProfileHeader from '../components/header/Header6'; 
import ProfileForm from '../components/profile/ProfileForm';
import ProfileUpdateButton from '../components/profile/ProfileUpdateButton';
import WithdrawButton from '../components/profile/WithdrawButton';
import WithdrawModal from '../components/profile/WithdrawModal';
import ToastMessage from '../components/profile/ToastMessage';

import '../styles/common/container/container_4.css';
import '../styles/common/header/header_5.css';
import '../styles/profile/profile.css';

const Profile = () => {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  return (
    <ProfileContainer>
      <ProfileHeader title="회원 정보 수정" />
      <ProfileForm nickname={nickname} setNickname={setNickname} setError={setError} error={error} />
      <ProfileUpdateButton nickname={nickname} setNickname={setNickname} setError={setError} error={error} />
      <WithdrawButton />
      <WithdrawModal />
      <ToastMessage />
    </ProfileContainer>
  );
};

export default Profile;
