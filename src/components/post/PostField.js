import React, { useState } from "react";
import { getLocalStorage, saveLocalStorage } from "../../utils/session";
import { handleLocation } from "../../utils/handleLocation";

import "../../styles/post/post.css";

const PostField = ({ post }) => {
  const postDetails = JSON.parse(localStorage.getItem("postDetails"));
  const profile = postDetails.profile;

  const [likesCount, setLikesCount] = useState(post.likesCnt || 0);
  const [userLiked, setUserLiked] = useState(false); // 좋아요 상태 관리

  const handleModify = () => {
    saveLocalStorage("editTitle", post.title);
    saveLocalStorage("editContent", post.content);
    handleLocation("/post/edit");
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("게시글을 삭제하시겠습니까?");
    if (confirmDelete) {
      const postId = post.post_id;
      const userId = getLocalStorage("userId");
      const token = getLocalStorage('jwtToken');
      try {
        const response = await fetch(`/api/post`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user_id: userId,
            post_id: postId,
          }),
        });
        const data = await response.json();
        if (data.success) {
          alert(`${data.data}`);
          handleLocation("/posts");
        } else {
          console.error("게시글 삭제 실패:", data.data);
          alert(`${data.data}`);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("서버 오류가 발생했습니다.");
      }
    }
  };

  const handleLike = async () => {
    const postId = post.post_id;
    const userId = getLocalStorage("userId");
    const token = getLocalStorage('jwtToken');
    try {
      const response = await fetch(`/api/post`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: userId,
          post_id: postId,
        }),
      });

      const data = await response.json();
      if (data.success) {
        if (userLiked) {
          setLikesCount((prev) => prev - 1); // 좋아요 감소
        } else {
          setLikesCount((prev) => prev + 1); // 좋아요 증가
        }
        setUserLiked(!userLiked); // 상태 반전
      } else {
        console.error("좋아요 처리 실패:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="post-field">
      <article>
        {/* Title */}
        <h2>{post.title}</h2>

        <div className="author">
          <div className="avatar">
            <img src={profile || "/assets/images/default-avatar.png"} alt="avatar" />
          </div>
          <div className="author-info">
            <span className="author-name">{post.author || "알 수 없음"}</span>
            <span className="date">{new Date(post.updatePostDate).toISOString().slice(0, 10)}</span>
          </div>

          <div className="post-actions">
            {post.user_id == getLocalStorage("userId") && (
              <>
                <div className="edit" id="btnbtn" onClick={handleModify}>
                  수정
                </div>
                <div className="delete" id="btnbtn" onClick={handleDelete}>
                  삭제
                </div>
              </>
            )}
          </div>
        </div>

        {/* Post Content */}
        <div className="post-content">
          {post.image && (
            <div className="post-img">
              <img src={post.image} alt="board" />
            </div>
          )}
          <div className="post-article">
            <p>{post.content}</p>
          </div>
        </div>

        {/* Post Stats */}
        <div className="post-stats">
          <div
            className="stats"
            id="likesCount"
            onClick={handleLike}
            style={{ cursor: "pointer" }}
          >
            {likesCount} {"❤️"}
          </div>
          <div className="stats" id="viewsCount">
            {post.viewsCnt || 0} 조회수
          </div>
          <div className="stats" id="commentsCount">
            {post.commentsCnt || 0} 댓글
          </div>
        </div>
      </article>
    </div>
  );
};

export default PostField;
