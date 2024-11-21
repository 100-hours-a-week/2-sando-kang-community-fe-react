import React from 'react';

const CommentField = ({ comments, onDeleteComment, onEditComment }) => {
  if (!comments || comments.length === 0) return null; // 댓글이 없으면 렌더링하지 않음

  const handleEdit = (comment) => {
    if (onEditComment) {
      onEditComment(comment);
    }
  };

  const handleDelete = (commentId) => {
    if (onDeleteComment) {
      onDeleteComment(commentId);
    }
  };

  return (
    <div className='comment-field'>
      <div className="comments-section">
        {comments.map((comment) => (
          <div className="comment" key={comment.id}>
            <div className="comment-author">
              <span>{comment.author}</span>
              <span>{comment.date}</span>
            </div>
            <div className="comment-content">
              <p>{comment.content}</p>
            </div>
            <div className="comment-actions">
              <div className="comment-edit" id='btnbtn' onClick={() => handleEdit(comment)}>
                수정
              </div>
              <div className="comment-delete" id='btnbtn' onClick={() => handleDelete(comment.id)}>
                삭제
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentField;
