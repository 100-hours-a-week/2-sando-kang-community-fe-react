import React from 'react';

const MakePostButton = ({ disabled }) => {
  return (
    <button
      className="submit-button"
      id="submit-button"
      type="submit"
      disabled={disabled}
      style={{
        backgroundColor: disabled ? '#ACA0EB' : '#7F6AEE',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      작성하기
    </button>
  );
};

export default MakePostButton;
