import React from "react";

const Modal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal_body">
        <p>게시글을 삭제하시겠습니까?</p>
        <div className="delete-modal-group">
          <button id="cancel" onClick={onCancel}>취소</button>
          <button id="ok" onClick={onConfirm}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
