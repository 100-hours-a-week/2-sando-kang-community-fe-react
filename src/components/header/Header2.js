import React from 'react';

function EditPostHeader({ title }) {
  const handleBack = () => {
    window.history.go(-1);
  };

  return (
    <header className="header">
      <div className="head">
        <div className="back-button" onClick={handleBack}>&lt;</div>
        <div className="title">
          <h4>{title}</h4>
        </div>
        <div className="avatar">
          <img src="/assets/images/logo/board-list-icon.png" alt="board" />
        </div>
      </div>
    </header>
  );
}

export default EditPostHeader;
