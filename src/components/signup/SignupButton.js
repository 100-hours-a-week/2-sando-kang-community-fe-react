import React from "react";
import '../../styles/auth/signup/signup.css';

const SignUpButton = ({ onClick, isActive }) => {
  return (
    <>
      <button
        type="button"
        className={`signup-button ${isActive ? "active" : ""}`}
        onClick={onClick}
        disabled={!isActive}
      >
        회원가입
      </button>

      <div className="login-link">
      <a href="/html/Log in.html">로그인하러 가기</a>
      </div>
    </>
  );
};

export default SignUpButton;
