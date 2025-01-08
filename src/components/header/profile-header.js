import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getLocalStorage } from '../../utils/session';
import { useHandleLocation } from '../../utils/handleLocation';
import '../../styles/common/header/profile-header.css';

const ProfileHeader = ({ title }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLocation = useHandleLocation();
  const profile = getLocalStorage('profile');
  
  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleLogoutSubmit = (event) => {
    event.preventDefault();

    const userId = getLocalStorage('userId');
    const token = getLocalStorage('jwtToken');

    if (userId) {
      fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id: userId }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert('로그아웃이 완료되었습니다.');
            localStorage.removeItem('userId');
            localStorage.removeItem('jwtToken');
            handleLocation('/'); 
          } else {
            if (data.message.status === 40104) {
              alert(data.message.code);
              handleLocation('/login');
            } else {
              alert(data.message.code);
            }
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert(`${error.message.code}`);
        });
    } else {
      alert('사용자 ID를 찾을 수 없습니다.');
    }
  };

  return (
    <header className="profile-header">
      <div className="profile-head">
        <h1 className="title" onClick={() => handleLocation('/posts')}>{title}</h1>
        <div className="avatar" onClick={toggleDropdown}>
          <img src={profile} alt="Profile" />
          {dropdownVisible && (
            <div className="dropdown-menu">
              <Link to="/profile">회원정보 수정</Link>
              <Link to="/password">비밀번호 수정</Link>
              <a href="#" onClick={handleLogoutSubmit}>로그아웃</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
