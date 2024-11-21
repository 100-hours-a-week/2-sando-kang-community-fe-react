import React from 'react';
import ProfileContainer from '../components/container/ProfileContainer';
import ProfileHeader from '../components/header/Header6'; 
import ProfileUpdateButton from '../components/profile/ProfileUpdateButton';
import WithdrawButton from '../components/profile/WithdrawButton';
import WithdrawModal from '../components/profile/WithdrawModal';
import ToastMessage from '../components/profile/ToastMessage';
import ProfileForm from '../components/profile/ProfileForm';
import withProfileForm from '../components/hoc/profile/withProfileForm';

import '../styles/common/container/container_4.css';
import '../styles/common/header/header_5.css';
import '../styles/profile/profile.css';

const Profile = () => {
  const ProfileFormWithLogic = withProfileForm(ProfileForm);

  return (
    <ProfileContainer>
      <ProfileHeader title="아무말 대잔치" />
      <ProfileFormWithLogic />
      <ProfileUpdateButton />
      <WithdrawButton />
      <WithdrawModal />
      <ToastMessage />
    </ProfileContainer>
  );
};

export default Profile;
