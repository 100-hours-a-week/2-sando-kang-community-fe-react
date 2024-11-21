import React, { useState, useEffect, useCallback } from "react";
import { saveLocalStorage } from "../../utils/session";
import { handleLocation } from "../../utils/handleLocation";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 추적

  const fetchPosts = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
        const response = await fetch(`http://localhost:3000/api/post?page=${page}`);
        const data = await response.json();

        if (data.success && data.data.postData.length > 0) {
            setPosts((prevPosts) => [...prevPosts, ...data.data.postData]);
            setPage((prevPage) => prevPage + 1); // 다음 페이지로 이동
        } else if (data.data.postData.length === 0) {
            console.log("No more posts to load.");
            setIsLoading(false);
        }
    } catch (error) {
        console.error("Error fetching posts:", error);
    } finally {
        setIsLoading(false);
    }
};


useEffect(() => {
  fetchPosts(); 
  const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
          fetchPosts();
      }
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
      window.removeEventListener("scroll", handleScroll);
  };
}, [page]); 



  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post" onClick={() => handlePostClick(post)}>
          <div className="post-header">
            <h2>{post.title}</h2>
            <span className="date">{post.date}</span>
          </div>
          <div className="post-info">
            <span>좋아요 {formatNumber(post.likes)}</span>
            <span>댓글 {formatNumber(post.comments)}</span>
            <span>조회수 {formatNumber(post.views)}</span>
          </div>
          <div className="author">
            <div className="avatar">
              <img src={post.profile} alt="profile" />
            </div>
            <span>{post.author || "Unknown Author"}</span>
          </div>
        </div>
      ))}
      {isLoading && <div id="loading">Loading...</div>}
      {!hasMore && <div id="no-more-posts">더 이상 게시글이 없습니다.</div>}
    </div>
  );
};

const handlePostClick = (post) => {
  saveLocalStorage("postDetails", JSON.stringify(post));
  handleLocation("/post"); 
};

const formatNumber = (num) => {
  if (num >= 100000) return Math.floor(num / 1000) + "k";
  if (num >= 10000) return (num / 1000).toFixed(0) + "k";
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return num.toString();
};

const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function (...args) {
    const context = this;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

export default PostsList;
