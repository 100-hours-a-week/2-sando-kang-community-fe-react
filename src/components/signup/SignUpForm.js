import React, { useState, useEffect } from 'react';
import { emailValidCheck, pwValidCheck } from '../../utils/validation';
import '../../styles/auth/signup/signup.css';

const SignUpForm = ({ onInputChange, onSubmit, onValidate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    let isValid = true;

    // 이메일 유효성 검사
    if (!email.trim()) {
      setEmailError('이메일을 입력하세요.');
      isValid = false;
    } else if (!emailValidCheck(email.trim())) {
      setEmailError('*올바른 이메일 주소 형식을 입력해주세요.');
      isValid = false;
    } else {
      setEmailError('');
    }

    // 비밀번호 유효성 검사
    if (!password.trim()) {
      setPasswordError('비밀번호를 입력하세요.');
      isValid = false;
    } else if (!pwValidCheck(password.trim())) {
      setPasswordError('*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    // 비밀번호 확인 유효성 검사
    if (password !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    // 닉네임 유효성 검사
    if (!nickname.trim()) {
      setNicknameError('닉네임을 입력하세요.');
      isValid = false;
    } else {
      setNicknameError('');
    }

    setIsFormValid(isValid);
    onValidate(isValid);
  };

  useEffect(() => {
    validateForm(); // 이메일, 비밀번호, 닉네임, 비밀번호 확인이 변경될 때마다 유효성 검사
    onInputChange('email', email);
    onInputChange('password', password);
    onInputChange('nickname', nickname);
    onInputChange('confirmPassword', confirmPassword);
  }, [email, password, confirmPassword, nickname]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit({ email, password, confirmPassword, nickname });
    }
  };

  return (
    <>
        <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="email">이메일</label>
        <input
            type="email"
            id="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <div className="error-message">{emailError}</div>

        <label htmlFor="password">비밀번호</label>
        <input
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <div className="error-message">{passwordError}</div>

        <label htmlFor="confirm-password">비밀번호 확인</label>
        <input
            type="password"
            id="confirm-password"
            placeholder="비밀번호를 다시 입력하세요"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="error-message">{confirmPasswordError}</div>

        <label htmlFor="nickname">닉네임</label>
        <input
            type="text"
            id="nickname"
            placeholder="닉네임을 입력하세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
        />
        <div className="error-message">{nicknameError}</div>

        <button type="submit" id="submit-button" disabled={!isFormValid}>회원가입</button>
        </form>

        <div className="login-link">
        <a href="/html/Log in.html">로그인하러 가기</a>
        </div>
    </>
  );
};

export default SignUpForm;
