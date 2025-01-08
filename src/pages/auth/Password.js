import React, { useState } from 'react';
import ProfileContainer from '../../components/container/profile-container';
import ProfileHeader from '../../components/header/profile-header'; 
import PasswordForm from '../../components/profile/PasswordForm'; 
import ToastMessage from '../../components/profile/ToastMessage';

import '../../styles/common/container/profile-container.css';
import '../../styles/profile/profile.css';
import '../../styles/auth/password/password.css';

const Password = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  return (
    <ProfileContainer>
      <ProfileHeader title="squid world" />
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
