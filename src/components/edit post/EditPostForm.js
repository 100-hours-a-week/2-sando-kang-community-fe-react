import React, { useState, useEffect } from 'react';

function EditPostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('/assets/images/post/ 하위 이미지 선택해주세요');

  useEffect(() => {
    const postDetails = JSON.parse(localStorage.getItem('postDetails'));
    if (postDetails) {
      setTitle(postDetails.title || '');
      setContent(postDetails.content || '');
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : '이미지를 선택해주세요');
  };

  return (
    <form className="edit-post-form">
      <label htmlFor="title">제목*</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요"
        required
      />

      <label htmlFor="content">내용*</label>
      <textarea
        id="content"
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력하세요"
        required
      ></textarea>

      <label htmlFor="image">이미지</label>
      <div className="file-input">
        <div className="file">
          <input type="file" id="image" name="image" onChange={handleFileChange} />
        </div>
        <div className="file-name">{fileName}</div>
      </div>
    </form>
  );
}

export default EditPostForm;
