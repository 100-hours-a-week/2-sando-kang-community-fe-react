import React from 'react';

const WithdrawModal = ({ visible, onConfirm, onCancel }) => {
  if (!visible) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <p>정말로 탈퇴하시겠습니까?</p>
        <div className="modal-button-group">
          <button id="confirmDelete" onClick={onConfirm}>
            확인
          </button>
          <button id="cancelDelete" onClick={onCancel}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawModal;
