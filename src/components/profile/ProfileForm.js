import React from 'react';

const ProfileForm = ({ nickname, setNickname, setError, error, localEmail, handleNicknameChange }) => {
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
