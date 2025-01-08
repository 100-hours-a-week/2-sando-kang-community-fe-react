import React, { useState } from "react";
import ProfileContainer from "../../components/container/profile-container";
import Header from "../../components/header/Header4";
import ProfileImageUploader from "../../components/profile/ProfileImageUploader";
import SignUpForm from "../../components/signup/SignUpForm";
import { useHandleLocation }from "../../utils/handleLocation";
import "../../styles/auth/signup/signup.css";

const SignUp = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    profile: ""
  });

  const handleLocation = useHandleLocation();
  
  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (file) => {
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        profile: file, 
      }));
    }
  };

  const handleFormValidation = (isValid) => {
    setIsFormValid(isValid);
  };

  const handleSignUpSubmit = async () => {
    const { email, password, nickname, profile } = formData;

    const formDatas = new FormData();
    formDatas.append("email", email);
    formDatas.append("password", password);
    formDatas.append("nickname", nickname);
    formDatas.append("profile", profile);

    try {
      const response = await fetch('/api/auth/signin', {
        credentials: 'include',
        method: 'POST',
        body: formDatas,
      });

      const data = await response.json();
      if (data.success) {
        alert(`${data.data}`);
        handleLocation('/login');
      } else {
        alert(`${data.data}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('서버 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <ProfileContainer>
      <Header title={'squid world'}/>
      <h2 className="signup-title">회원가입</h2>
      <div className="signup-container">
        <ProfileImageUploader onImageChange={handleImageChange} />
        <SignUpForm
          onInputChange={handleInputChange}
          onSubmit={handleSignUpSubmit}
          onValidate={handleFormValidation}
          isActive={isFormValid}
        />
      </div>
    </ProfileContainer>
  );
};

export default SignUp;
