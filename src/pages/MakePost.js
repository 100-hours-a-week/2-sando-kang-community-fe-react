import React from 'react';
import PostsContainer from "../components/container/posts-container";
import ProfileHeaderBack from '../components/header/profile-header-back';
import MakePostForm from '../components/make post/MakePostForm';

const MakePost = () => {
  return (
    <PostsContainer>
      <ProfileHeaderBack title="squid world" />
      <MakePostForm />
    </PostsContainer>
  );
};

export default MakePost;
