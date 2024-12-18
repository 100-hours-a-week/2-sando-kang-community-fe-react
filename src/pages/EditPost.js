import React from 'react';
import EditPostContainer from '../components/container/EditPostContainer';
import ProfileHeader from '../components/header/profile-header';
import EditPostForm from '../components/edit post/EditPostForm';
import EditPostButton from '../components/edit post/EditPostButton';

import '../styles/edit post/edit post.css';

function EditPost() {
  return (
    <EditPostContainer>
      <ProfileHeader title="아무 말 대잔치" />
      <EditPostForm />
      <EditPostButton />
    </EditPostContainer>
  );
}

export default EditPost;
