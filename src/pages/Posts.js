import React from "react";
import PostContainer from "../components/container/Container";
import Header1 from "../components/header/Header1";
import PostWriteButton from "../components/posts/PostWriteButton";
import PostsList from "../components/posts/PostsList";
import "../styles/posts/posts.css";

const Posts = () => {
  return (
    <PostContainer>
      <Header1 title="아무 말 대잔치" />
      <section className="intro">
        <div className="intro-word">
          <p>
            안녕하세요,<br />
            아무 말 대잔치 <b>게시판</b>입니다.
          </p>
        </div>
        <PostWriteButton />
      </section>
      <section className="posts" id="posts">
        <PostsList />
      </section>
    </PostContainer>
  );
};

export default Posts;
