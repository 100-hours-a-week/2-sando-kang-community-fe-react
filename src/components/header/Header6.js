import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getLocalStorage } from '../../utils/session';
import { handleLocation } from '../../utils/handleLocation';

const ProfileHeader = ({ title }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const profile = getLocalStorage('profile');

  console.log(`profile: ${profile}`);
  
  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const logout = (event) => {
    event.preventDefault();

    const userId = getLocalStorage('userId');

    if (userId) {
      fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert('로그아웃이 완료되었습니다.');
            localStorage.removeItem('userId');
            handleLocation('/'); 
          } else {
            throw new Error(data.message || '로그아웃 실패');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert(`오류: ${error.message}`);
        });
    } else {
      alert('사용자 ID를 찾을 수 없습니다.');
    }
  };

  return (
    <header className="profile-header">
      <div className="head">
        <h1 className="title">{title}</h1>
        <div className="avatar" onClick={toggleDropdown}>
          <img src={profile} alt="Profile" />
          {dropdownVisible && (
            <div className="dropdown-menu">
              <Link to="/profile">회원정보 수정</Link>
              <Link to="/password">비밀번호 수정</Link>
              <a href="#" onClick={logout}>로그아웃</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
