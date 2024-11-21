let nicknameError = document.getElementById('nicknameError');


// 이메일 유효성 검사 함수
export function emailValidCheck(email) {
    const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+$/;
    return pattern.test(email);
  }
  
  // 비밀번호 유효성 검사 함수
  export function pwValidCheck(value) {
    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/.test(value);
  }
  
  // 비밀번호 확인 유효성 검사 함수
  export function confirmPwValidCheck(value, inputPassword) {
    return value === inputPassword.trim();
  }
  
  // 닉네임 유효성 검사 함수
  export function nicknameValidCheck(value, nicknameError) {
    if (!value) {
      nicknameError.innerText = '  *닉네임을 입력해주세요.';
      nicknameError.style.display = 'block';
      return false;
    } else if (/\s/.test(value)) {
      nicknameError.innerText = '  *띄어쓰기를 없애주세요.';
      nicknameError.style.display = 'block';
      return false;
    } else if (value.length > 10) {
      nicknameError.innerText = '  *닉네임은 최대 10자까지 작성 가능합니다.';
      nicknameError.style.display = 'block';
      return false;
    } else {
      nicknameError.style.display = 'none';
      return true;
    }
  }
  
export function validateNickname(nickname, setError) {
  if (!nickname) {
    setError('  *닉네임을 입력해주세요.');
    return false;
  } else if (/\s/.test(nickname)) {
    setError('  *띄어쓰기를 없애주세요.');
    return false;
  } else if (nickname.length > 10) {
    setError('  *닉네임 최대 10자까지 가능합니다.');
    return false;
  } else if (nickname === document.getElementById('nickname').placeholder) {
    setError('  *중복된 닉네임 입니다');
    return false;
  } else {
    setError('');
    return true;
  }
}
