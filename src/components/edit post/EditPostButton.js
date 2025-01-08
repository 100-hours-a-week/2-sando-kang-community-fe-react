import React from 'react';
import { saveLocalStorage, getLocalStorage } from '../../utils/session';
import { useHandleLocation } from '../../utils/handleLocation';

function EditPostButton() {

  const handleLocation = useHandleLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postDetails = JSON.parse(getLocalStorage('postDetails'));

    const userId = getLocalStorage('userId');
    const token = getLocalStorage('jwtToken');
    const postId = postDetails.id;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const image = document.getElementById('image').files[0];
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');



    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('post_id', postId);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('date', date);
    formData.append('image', image); 

    try {
      const response = await fetch('/api/post', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        alert('게시글 수정이 완료되었습니다.');
        saveLocalStorage('title', title);
        saveLocalStorage('content', content);
        saveLocalStorage('updatePostDate', date);

         if(image){
          const reader = new FileReader();
          reader.onload = (e) => {
            const base64Data = e.target.result;
            console.log('Base64로 변환된 데이터:', base64Data);
            saveLocalStorage('image', base64Data);
          };
          reader.readAsDataURL(image); 
         }
      
        handleLocation('/posts');
      } else {
        alert(`${data.data}`);
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
