import React from 'react';
import MakePostHeader from "../header/Header5";
import PostField from "../post/PostField";
import CommentWriteField from "../post/CommentWriteField";
import CommentField from "../post/CommentField";
import Modal from "../post/Modal";
import CommentModal from "../post/CommentModal";
import usePost from '../../hooks/usePost'; 

import '../../styles/common/container/container.css';
import '../../styles/common/header/header_5.css';
import '../../styles/post/post.css';

const PostContainer = () => {
  const {
    postData,
    comments,
    modalOpen,
    commentModalOpen,
    selectedCommentId,
    commentToEdit,
    setModalOpen,
    setCommentModalOpen,
    setSelectedCommentId,
    setCommentToEdit,
    addComment,
    deleteComment,
  } = usePost(); 

  return (
    <>
      {postData ? (
        <div className="post-container">
          <MakePostHeader title={'아무말 대잔치'} />
          <PostField post={postData} />
          <CommentWriteField 
            onAddComment={addComment}
            initialComment={commentToEdit} // 수정할 댓글 전달
            onEditComment={(comment) => setCommentToEdit(comment)} // 댓글 수정
          />
          <CommentField
            comments={comments}
            onDeleteComment={(id) => {
              setSelectedCommentId(id);
              setCommentModalOpen(true);
            }}
            onEditComment={(comment) => setCommentToEdit(comment)} // 댓글 수정 기능
          />
          <Modal
            isOpen={modalOpen}
            onCancel={() => setModalOpen(false)}
            onConfirm={() => {
              console.log("게시글 삭제 로직 추가");
              setModalOpen(false);
            }}
          />
          <CommentModal
            isOpen={commentModalOpen}
            onCancel={() => setCommentModalOpen(false)}
            onConfirm={() => {
              deleteComment(selectedCommentId);
              setCommentModalOpen(false);
            }}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default PostContainer;
