import React, { useState } from 'react';

const ChangePasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 비밀번호 수정 API 호출 (예시)
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch('http://localhost:3000/api/auth/password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          password: password,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('비밀번호 수정 성공');
      } else {
        setError(data.message || '수정 실패');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('서버와의 통신 오류');
    }
  };

  return (
    <div>
      <label>새 비밀번호</label>
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="새 비밀번호"
      />
      <label>비밀번호 확인</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        placeholder="비밀번호 확인"
      />
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleSubmit}>비밀번호 수정</button>
    </div>
  );
};

export default ChangePasswordForm;
