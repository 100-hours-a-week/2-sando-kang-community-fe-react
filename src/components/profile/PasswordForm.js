import React, { useState, useEffect } from 'react';
import { pwValidCheck} from '../../utils/validation';  // 유효성 검사 함수
import { getLocalStorage, saveLocalStorage } from '../../utils/session';
import { useHandleLocation } from '../../utils/handleLocation';
const PasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [password, confirmPassword]);

  const handleLocation = useHandleLocation();
  
  const validateForm = () => {
    let pwCheck = false;
    let cfPwCheck = false;

    if (!password.trim()) {
      setPasswordError('  *비밀번호를 입력해주세요.');
    } else if (!pwValidCheck(password.trim())) {
      setPasswordError('  *비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.');
    } else {
      setPasswordError('');
      pwCheck = true;
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError('  *비밀번호를 한번 더 입력해주세요.');
    } else if (confirmPassword.trim() !== password.trim()) {
      setConfirmPasswordError('  *비밀번호가 다릅니다.');
    } else {
      setConfirmPasswordError('');
      cfPwCheck = true;
    }

    if (pwCheck && cfPwCheck) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isFormValid) {
      const userId = getLocalStorage('userId');
      const token = getLocalStorage('jwtToken');
      const newPassword = password.trim();

      if (userId) {
        try {
          const response = await fetch('/api/auth/password', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ user_id: userId, password: newPassword }),
          });
          const data = await response.json();

          if (data.success) {
            alert("비밀번호가 수정되었습니다.");
            localStorage.removeItem('password');
            saveLocalStorage('password', newPassword);
            handleLocation('/profile');
          } else {
            alert("비밀번호 수정에 실패했습니다.");
          }
        } catch (error) {
          console.error('Error:', error);
          alert(`오류: ${error.message}`);
        }
      } else {
        alert('사용자 ID를 찾을 수 없습니다.');
      }
    }
  };

  return (
    <div className="password-container">
      <h2>비밀번호 수정</h2>
      <form onSubmit={handleSubmit} id="password-form">
        <div className="input-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>
        {passwordError && <div className="error-message" style={{ display: 'block' }}>{passwordError}</div>}

        <div className="input-group">
          <label htmlFor="confirm-password">비밀번호 확인</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호를 한번 더 입력하세요"
            required
          />
        </div>
        {confirmPasswordError && <div className="error-message" style={{ display: 'block' }}>{confirmPasswordError}</div>}

        <button
          type="submit"
          id="modify-button"
          disabled={!isFormValid}
        >
          수정하기
        </button>
      </form>
    </div>
  );
};

export default PasswordForm;
