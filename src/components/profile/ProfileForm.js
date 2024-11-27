import React from 'react';

const ProfileForm = ({ nickname, setNickname, error, localEmail, handleNicknameChange }) => {
  const handleChange = (e) => {
    const newNickname = e.target.value;
    setNickname(newNickname); 
    handleNicknameChange(e); 
  };

  return (
    <div className="profile-field">
      <form className="profile-form">
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          value={localEmail}
          readOnly
          className="readonly-input"
        />
        <label htmlFor="nickname">닉네임</label>
        <input
          id="nickname"
          value={nickname}
          onChange={handleChange}
          placeholder="닉네임"
          className={error ? 'error-input' : ''}
        />
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default ProfileForm;
