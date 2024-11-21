import React from 'react';
import MakePostButton from './MakePostButton';
import useMakePostForm from '../../hooks/useMakePostForm';

const MakePostForm = () => {
  const { formData, handleChange, validateForm, handleSubmit } = useMakePostForm();

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
        <input type="file" id="image-make" name="image" onChange={handleChange} />
        <span className="file-name">{formData.image?.name || '기존 파일명'}</span>
      </div>

      <MakePostButton disabled={!validateForm()} />
    </form>
  );
};

export default MakePostForm;
