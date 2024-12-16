import { useState } from 'react';
import { saveLocalStorage, getLocalStorage } from '../utils/session';
import { handleLocation } from '../utils/handleLocation';

const useMakePostForm = () => {
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
      const response = await fetch('/api/post', {
        method: 'POST',
        body: postFormData,
      });
      const data = await response.json();

      if (data.success) {
        alert(`게시글 작성이 완료되었습니다`);
        handleLocation('/posts');
      } else {
        alert(`이미지는 JPG, PNG, GIF만 허용됩니다.`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('서버 오류가 발생했습니다.');
    }
  };

  return {
    formData,
    handleChange,
    validateForm,
    handleSubmit,
  };
};

export default useMakePostForm;
