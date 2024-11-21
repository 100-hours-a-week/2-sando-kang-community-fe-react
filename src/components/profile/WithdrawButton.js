import React from 'react';

const WithdrawButton = ({ onWithdraw }) => {
  return (
    <div className="profile-field">
      <button id="deleteButton" onClick={onWithdraw}>
        회원 탈퇴
      </button>
    </div>
  );
};

export default WithdrawButton;
