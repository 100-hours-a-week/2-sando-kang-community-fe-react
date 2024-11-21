import React, { useState } from "react";
import SignUpContainer from "../../components/container/Container_4";
import Header from "../../components/header/Header4";
import ProfileImageUploader from "../../components/profile/ProfileImageUploader";
import SignUpForm from "../../components/signup/SignUpForm";
import { handleLocation } from "../../utils/handleLocation";
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

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (file) => {
    console.log("받은 파일:", file);
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        profile: file, // 파일 객체 저장
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

    console.log(`email: ${email}`)
    console.log(`password: ${password}`)
    console.log(`nickname: ${nickname}`)
    console.log(`imageFile: ${profile}`)

    try {
      const response = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        body: formDatas
      });

      const data = await response.json();
      if (data.success) {
        alert('회원가입이 성공적으로 이루어졌습니다.');
        handleLocation('/');
      } else {
        alert(`회원가입 실패: ${data.message.code}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('서버 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <SignUpContainer>
      <Header title={'아무말 대잔치'}/>
      <h2>회원가입</h2>
      <div class="signup-container">
        <ProfileImageUploader onImageChange={handleImageChange} />
        <SignUpForm
          onInputChange={handleInputChange}
          onSubmit={handleSignUpSubmit}
          onValidate={handleFormValidation}
          isActive={isFormValid}
        />
      </div>
    </SignUpContainer>
  );
};

export default SignUp;
