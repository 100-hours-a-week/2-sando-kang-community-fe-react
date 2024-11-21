import React, { useState } from 'react';
import MakePostButton from './MakePostButton';
import { saveLocalStorage, getLocalStorage } from '../../utils/session';
import { handleLocation } from '../../utils/handleLocation';

const MakePostForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });

    saveLocalStorage(name, files ? files[0].name : value);
  };

  const validateForm = () => {
    return formData.title.trim() && formData.content.trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = getLocalStorage('userId');

    const postFormData = new FormData();
    postFormData.append('user_id', userId);
    postFormData.append('title', formData.title);
    postFormData.append('content', formData.content);
    if (formData.image) {
      postFormData.append('image', formData.image);
    }

    try {
      const response = await fetch('http://localhost:3000/api/post', {
        method: 'POST',
        body: postFormData,
      });
      const data = await response.json();

      if (data.success) {
        alert('게시글 작성이 완료되었습니다!');
        handleLocation('/posts');
      } else {
        alert('게시글 작성에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('서버 오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">제목*</label>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="제목을 입력하세요 (최대 26자)"
        maxLength="26"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label htmlFor="content">내용*</label>
      <textarea
        id="content"
        name="content"
        placeholder="내용을 입력하세요"
        value={formData.content}
        onChange={handleChange}
        required
      />

      <label htmlFor="image">이미지</label>
      <div className="file-input">
        <input type="file" id="image" name="image" onChange={handleChange} />
        <span className="file-name">{formData.image?.name || '기존 파일명'}</span>
      </div>

      <MakePostButton disabled={!validateForm()} />
    </form>
  );
};

export default MakePostForm;
