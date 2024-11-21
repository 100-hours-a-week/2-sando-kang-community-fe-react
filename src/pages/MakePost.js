import React from 'react';
import '../styles/make post/make post.css';
import MakePostContainer from '../components/make post/MakePostContainer';
import MakePostHeader from '../components/header/Header5';
import MakePostForm from '../components/make post/MakePostForm';

const MakePost = () => {
  return (
    <MakePostContainer>
      <MakePostHeader title="아무 말 대잔치" />
      <MakePostForm />
    </MakePostContainer>
  );
};

export default MakePost;
