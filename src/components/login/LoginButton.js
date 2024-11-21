import React from "react";
import '../../styles/auth/login/login.css';

const LoginButton = ({ onClick, isActive }) => {
  return (
    <button
      type="button"
      className={`login-button ${isActive ? "active" : ""}`}
      onClick={onClick}
      disabled={!isActive}
    >
      로그인
    </button>
  );
};

export default LoginButton;
