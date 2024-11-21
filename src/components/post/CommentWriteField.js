import React, { useState, useEffect } from "react";

const CommentWriteField = ({ onAddComment, initialComment, onEditComment }) => {
  const [commentContent, setCommentContent] = useState("");

  // 댓글 수정 시 초기 댓글 내용이 textarea에 표시되도록 처리
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
     
      const response = await fetch("http://localhost:3000/api/comment", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment_id: initialComment.id,
          content: commentContent,
        }),
      });
      const data = await response.json();
      if (data.success) {
        alert("댓글이 수정되었습니다.");
        onEditComment(null); 
        window.location.reload();
      } else {
        alert("댓글 수정 실패:", data.message);
      }
    } else {
 
      await onAddComment(commentContent); 
    }

    setCommentContent(""); // 댓글 작성 후 textarea 초기화
  };

  return (
    <div className="comment-field">
      <div className="comment-form">
          <textarea
            value={commentContent}
            onChange={handleCommentChange}
            placeholder="댓글을 남겨주세요!"
          />
          <button className="comment-submit" onClick={handleSubmit}>
            {initialComment ? "댓글 수정" : "댓글 등록"}
          </button>
        </div>
    </div>
  );
};

export default CommentWriteField;
