import React from "react";
import '../../styles/auth/login/login.css';

const SignUpButton = ({ onClick }) => {
  return (
    <div className="signin-button" onClick={onClick}>
      회원가입
    </div>
  );
};

export default SignUpButton;
