import React, { useState, useEffect } from "react";
import { getLocalStorage } from "../../utils/session";

const CommentWriteField = ({ onAddComment, initialComment, onEditComment }) => {
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    if (initialComment) {
      setCommentContent(initialComment.content); 
    } else {
      setCommentContent(""); 
    }
  }, [initialComment]); 

  // 댓글 내용 변경 처리
  const handleCommentChange = (event) => {
    setCommentContent(event.target.value);
  };

  // 댓글 등록 처리
  const handleSubmit = async () => {
    if (commentContent.trim() === "") {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    if (initialComment) {
      const userId = getLocalStorage('userId');
      console.log(`userid: ${userId}`);
      console.log(`initialComment: ${initialComment.id}`);
      console.log(`content: ${commentContent}`);
      const response = await fetch("/api/comment", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          comment_id: initialComment.id,
          content: commentContent,
        }),
      });
      const data = await response.json();
      if (data.success) {
        alert(`${data.data}`);
        onEditComment(null); 
        window.location.reload();
      } else {
        alert(`${data.data}`);
      }
    } else {
 
      await onAddComment(commentContent); 
    }

    setCommentContent(""); // 댓글 작성 후 textarea 초기화
  };

  return (
    <div className="comment-field">
    <div className="comment-form">
      <input
        className="comment-input"
        type="text"
        value={commentContent}
        onChange={handleCommentChange}
        placeholder="댓글을 달아주세요 (최대 100자)"
        maxLength="100"
      />
      <button className="comment-submit" onClick={handleSubmit}>
        {initialComment ? "댓글 수정" : "댓글 등록"}
      </button>
    </div>
  </div>
  );
};

export default CommentWriteField;
