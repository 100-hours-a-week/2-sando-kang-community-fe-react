import React, { useState, useEffect } from "react";
import { emailValidCheck, pwValidCheck } from '../../utils/validation';

const LoginForm = ({ onInputChange, onSubmit, onValidate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    let isValid = true;
    console.log('유효 검사 시작!');
    console.log(email.trim());
    if (!email.trim()) {
      setEmailError("이메일을 입력하세요.");
      isValid = false;
    } else if (!emailValidCheck(email.trim())) {
      setEmailError("*올바른 이메일 주소 형식을 입력해주세요.");
      console.log(emailError);
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("비밀번호를 입력하세요.");
      isValid = false;
    } else if (!pwValidCheck(password.trim())) {
      setPasswordError("*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.");
      console.log(passwordError);
      isValid = false;
    } else {
      setPasswordError("");
    }

    setIsFormValid(isValid);
    onValidate(isValid); // 부모에게 유효성 결과 전달
    onInputChange("email", email); // 부모 컴포넌트로 이메일 전달
    onInputChange("password", password);
  };

  useEffect(() => {
    if (email || password) validateForm(); // 이메일 또는 비밀번호가 변경될 때마다 유효성 검사
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit({ email, password }); // 부모 컴포넌트로 이메일과 비밀번호 전달
    }
  };

  return (
    <form className="login-field" onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="emailLogin"
          name="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // 입력값이 변경될 때마다 상태 업데이트
        />
        {/* 이메일 오류 메시지가 있을 경우 표시 */}
        {emailError && <div className="error-messages">{emailError}</div>}
      </div>

      <div className="input-group">
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="passwordLogin"
          name="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // 입력값이 변경될 때마다 상태 업데이트
        />
        {/* 비밀번호 오류 메시지가 있을 경우 표시 */}
        {passwordError && <div className="error-messages">{passwordError}</div>}
      </div>

    
    </form>
  );
};

export default LoginForm;
