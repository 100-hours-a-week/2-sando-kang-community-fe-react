import React, { useState  } from "react";
import LoginContainer from "../../components/container/LoginContainer";
import Header from "../../components/header/Header3";
import LoginForm from "../../components/login/LoginForm";
import LoginButton from "../../components/login/LoginButton";
import SignUpButton from "../../components/login/SignUpButton";
import { useHandleLocation }from "../../utils/handleLocation";
import { saveLocalStorage } from "../../utils/session";

import '../../styles/auth/login/login.css';

const Login = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLocation = useHandleLocation();

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleFormValidation = (isValid) => {
    setIsFormValid(isValid);
  };

  const handleLoginSubmit = async () => {
    const { email, password } = formData;

    try {
      console.log('로그인 시작');
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success) {

        saveLocalStorage("userId", data.data.user_id);
        saveLocalStorage("email", data.data.email);
        
        const profileImage = data.data.profile ?? 'https://ktb-image-bucket.s3.ap-northeast-2.amazonaws.com/uploads/1736266048565-default.jpg';
        saveLocalStorage("profile", profileImage);
        saveLocalStorage("nickname", data.data.nickname);
        saveLocalStorage("jwtToken", data.data.token);
        
        alert("로그인이 정상적으로 이루어졌습니다.");
        handleLocation("/posts");
      } else {
        alert(`${data.data}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("서버 요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <LoginContainer>
      <Header title="squid world" />
      <h2 className="login-title">로그인</h2>
      <div className="login-container">
        <LoginForm
          onInputChange={handleInputChange} 
          onSubmit={handleLoginSubmit}      
          onValidate={handleFormValidation} 
        />
      </div>

      <div id="login-button">
        <LoginButton
          isActive={isFormValid}
          onClick={handleLoginSubmit}
        />
      </div>

      <div id="signin-button">
        <SignUpButton onClick={() => handleLocation("/signup")} />
      </div>
    </LoginContainer>
  );
};

export default Login;
