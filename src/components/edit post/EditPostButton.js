import React from 'react';
import { saveLocalStorage, getLocalStorage } from '../../utils/session';
import { handleLocation } from '../../utils/handleLocation';

function EditPostButton() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const postDetails = JSON.parse(getLocalStorage('postDetails'));

    const userId = getLocalStorage('userId');
    const postId = postDetails.id;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const image = document.getElementById('image').files[0];
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const formData = new FormData();

    console.log(`userId : ${userId}`);
    console.log(`postId : ${postId}`);
    console.log(`title : ${title}`);
    console.log(`content : ${content}`);
    console.log(`image : ${image}`);
    console.log(`date : ${date}`);
    

    formData.append('user_id', userId);
    formData.append('post_id', postId);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('date', date);
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:3000/api/post', {
        method: 'PUT',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        alert('게시글 수정이 완료되었습니다.');
        saveLocalStorage('title', title);
        saveLocalStorage('content', content);
        saveLocalStorage('updatePostDate', date);
        handleLocation('/posts');
      } else {
        alert(`게시글 수정 중 문제가 발생하였습니다. ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button className="submit-button" onClick={handleSubmit}>
      수정하기
    </button>
  );
}

export default EditPostButton;
