import React, { useState, useEffect } from "react";
import PostsContainer from "../components/container/posts-container";
import ProfileHeader from "../components/header/profile-header";
import PostWriteButton from "../components/posts/PostWriteButton";
import PostsList from "../components/posts/PostsList";
import "../styles/posts/posts.css";
import { getLocalStorage } from "../utils/session";

const Posts = () => {
  const userId = getLocalStorage("userId");
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled 300px from the top
      if (window.scrollY > 300) {
        setShowScrollTopButton(true);
      } else {
        setShowScrollTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PostsContainer>
      <ProfileHeader title="squid world" />
      <section className="intro">
        <div className="intro-word">
          <p>
            {userId}번 참가자,<br />
            <b>오징어 월드</b>에 온걸 환영해.
          </p>
        </div>
        <PostWriteButton />
      </section>
      <section className="posts" id="posts">
        <PostsList />
      </section>
      {showScrollTopButton && (
        <button 
          className="scroll-top-button" 
          onClick={scrollToTop}
          style={scrollTopButtonStyles}
        >
          ↑ 
        </button>
      )}
    </PostsContainer>
  );
};

const scrollTopButtonStyles = {
  position: "fixed",
  bottom: "20px",
  right: "50px",
  padding: "20px 25px",
  fontSize: "14px",
  backgroundColor: "#F44788",
  color: "#fff",
  border: "none",
  borderRadius: "40px",
  cursor: "pointer",
  zIndex: 1000,
};

export default Posts;
