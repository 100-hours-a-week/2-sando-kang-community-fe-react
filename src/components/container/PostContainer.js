import React from 'react';
import ProfileHeader from "../header/profile-header";
import PostField from "../post/PostField";
import CommentWriteField from "../post/CommentWriteField";
import CommentField from "../post/CommentField";
import Modal from "../post/Modal";
import CommentModal from "../post/CommentModal";
import usePost from '../../hooks/usePost'; 

import '../../styles/common/container/container.css';
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
          <ProfileHeader title={'squid world'} />
          <PostField post={postData} />
          <CommentWriteField 
            onAddComment={addComment}
            initialComment={commentToEdit} 
            onEditComment={(comment) => setCommentToEdit(comment)} 
          />
          <CommentField
            comments={comments}
            onDeleteComment={(id) => {
              setSelectedCommentId(id);
              setCommentModalOpen(true);
            }}
            onEditComment={(comment) => setCommentToEdit(comment)} 
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
