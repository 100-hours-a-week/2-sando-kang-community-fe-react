import React, { useState, useEffect } from "react";
import { saveLocalStorage } from "../../utils/session";
import { handleLocation } from "../../utils/handleLocation";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async () => {
    if (isLoading || !hasMore) return; 
  
    setIsLoading(true);
  
    try {
      const response = await fetch(`http://localhost:3000/api/post?page=${page}`);
      const data = await response.json();
  
      if (data.success) {
        const { postData, hasMore: morePostsAvailable } = data.data;
  
        if (postData.length > 0) {
          setPosts((prevPosts) => [...prevPosts, ...postData]);
          setPage((prevPage) => prevPage + 1);
        }
        setHasMore(morePostsAvailable); 
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    const handleScroll = () => {
      if (
        hasMore && 
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        !isLoading
      ) {
        fetchPosts();
      }
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, isLoading]); 
  

  return (
    <div>
      {posts.map((post) => (
        <div
          key={post.id}
          className="post"
          onClick={() => handlePostClick(post)}
        >
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

export default PostsList;
