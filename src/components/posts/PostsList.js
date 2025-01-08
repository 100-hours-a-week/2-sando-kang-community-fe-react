import React, { useState, useEffect, useRef } from "react";
import { saveLocalStorage } from "../../utils/session";
import { useHandleLocation } from "../../utils/handleLocation";
import { useInView } from "react-intersection-observer";
import { Rings } from "react-loader-spinner"; 

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(1);
  const { ref, inView } = useInView({ threshold: 0.1 });
  const handleLocation = useHandleLocation();

  const fetchPosts = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2500));

    try {
      const response = await fetch(`/api/post?page=${pageRef.current}`);
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        const { postData, hasMore: morePostsAvailable } = data.data;

        setPosts((prevPosts) => [
          ...prevPosts,
          ...postData.filter(
            (newPost) => !prevPosts.some((prevPost) => prevPost.id === newPost.id)
          ),
        ]);

        pageRef.current += 1;
        setHasMore(morePostsAvailable);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      console.log("Fetching more posts...");
      fetchPosts();
    }
  }, [inView, hasMore, isLoading]);

  useEffect(() => {
    fetchPosts();
  }, []);

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
            <span className="date">{new Date(post.date).toISOString().slice(0, 10)}</span>
          </div>
          <div className="post-info">
            <span>좋아요 {formatNumber(post.likes)}</span>
            <span>댓글 {formatNumber(post.comments)}</span>
            <span>조회수 {formatNumber(post.views)}</span>
          </div>
          <div className="author">
            <div className="avatar">
              <img src={post.profile} alt="" />
            </div>
            <span>{post.author || "Unknown Author"}</span>
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="spinner-container">
          <Rings
            height="80"
            width="80"
            color="#6fd94f"
            ariaLabel="rings-loading"
          />
        </div>
      )}
      {!hasMore && <div id="no-more-posts">더 이상 게시글이 없습니다!</div>}
      <div ref={ref} style={{ height: "1px", marginBottom: "20px" }} />
    </div>
  );

  function handlePostClick(post) {
    saveLocalStorage("postDetails", JSON.stringify(post));
    handleLocation("/post");
  }

  function formatNumber(num) {
    if (num >= 100000) return Math.floor(num / 1000) + "k";
    if (num >= 10000) return (num / 1000).toFixed(0) + "k";
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num.toString();
  }
};

export default PostsList;
