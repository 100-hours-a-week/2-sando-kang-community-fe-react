import React, { useState } from 'react';
import ProfileContainer from '../../components/container/ProfileContainer';
import ProfileHeader from '../../components/header/Header6'; 
import PasswordForm from '../../components/profile/PasswordForm'; 
import ToastMessage from '../../components/profile/ToastMessage';

import '../../styles/common/container/container_4.css';
import '../../styles/common/header/header_5.css';
import '../../styles/profile/profile.css';
import '../../styles/auth/password/password.css';

const Password = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  return (
    <ProfileContainer>
      <ProfileHeader title="아무말 대잔치" />
      <PasswordForm
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        setError={setError}
        error={error}
      />
      <ToastMessage />
    </ProfileContainer>
  );
};

export default Password;
