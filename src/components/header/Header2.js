import React from 'react';
import { useHandleLocation } from '../../utils/handleLocation';
import { getLocalStorage } from "../../utils/session";

function EditPostHeader({ title }) {

  const image = getLocalStorage('profile');
    console.log(`image : ${image}`);


  const handleBack = () => {
    window.history.go(-1);
  };

  const handleProfile = () => {
    handleLocation('/profile');
  }

  return (
    <header className="header">
      <div className="head">
        <div className="back-button" onClick={handleBack}>&lt;</div>
        <div className="title">
          <h4>{title}</h4>
        </div>
        <div className="avatar" onClick={handleProfile}>
          <img src={image} alt="board" />
        </div>
      </div>
    </header>
  );
}

export default EditPostHeader;
