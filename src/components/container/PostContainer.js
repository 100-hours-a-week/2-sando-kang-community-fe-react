import React, { useState, useEffect } from "react";
import { getLocalStorage } from "../../utils/session";
import { getCurrentDate } from "../../utils/getCurrentDate";


import MakePostHeader from "../header/Header5";
import PostField from "../post/PostField";
import CommentWriteField from "../post/CommentWriteField";
import CommentField from "../post/CommentField";
import Modal from "../post/Modal";
import CommentModal from "../post/CommentModal";

import '../../styles/common/container/container.css';
import '../../styles/common/header/header_5.css';
import '../../styles/post/post.css';


const PostContainer = () => {
  const [postData, setPostData] = useState(null);
  const [comments, setComments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [commentToEdit, setCommentToEdit] = useState(null);

  // 게시물 데이터 가져오기
  useEffect(() => {
    const fetchPostData = async () => {
      const postDetails = JSON.parse(localStorage.getItem('postDetails'));
      if (postDetails) {
        const postId = postDetails.id;
        console.log(`post id : ${postId}`);
        try {
          const response = await fetch(`http://localhost:3000/api/post/${postId}`);
          const responseData = await response.json();
          
          if (responseData && responseData.data.postData) {
            const data = responseData.data.postData;
            console.log(`comments : ${data.comment}`);
            setPostData(responseData.data.postData);
            setComments(responseData.data.postData.comment || []); // comment 필드 확인
          } else {
            console.error("유효하지 않은 데이터:", responseData);
          }
        } catch (error) {
          console.error("게시물 데이터를 가져오는 중 오류 발생:", error);
        }
      }
    };

    fetchPostData();
  }, []);

  // 댓글 추가
  const addComment = async (commentContent) => {
    const userId = getLocalStorage("userId");
    const postDetails = JSON.parse(localStorage.getItem('postDetails'));
    const postId = postDetails.id;
    console.log(`userId:  ${userId}`);
    console.log(`postId:  ${postId}`);


    try {
      const response = await fetch("http://localhost:3000/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          post_id: postId,
          comment: commentContent,
          date: getCurrentDate(),
        }),
      });
      const data = await response.json();
      if (data.success) {
        alert("댓글이 추가되었습니다!");
        setComments([...comments, data.comment]); // 댓글 목록 갱신
        window.location.reload();
      } else {
        alert("댓글 추가 실패:", data.message);
      }
    } catch (error) {
      console.error("댓글 추가 오류:", error);
    }
  };

  // 댓글 삭제
  const deleteComment = async (commentId) => {
    const postId = localStorage.getItem("postId");
    try {
      const response = await fetch("http://localhost:3000/api/comment", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: commentId, post_id: postId }),
      });
      const data = await response.json();
      if (data.success) {
        alert("댓글이 삭제되었습니다.");
        setComments(comments.filter((comment) => comment.id !== commentId)); // 댓글 목록 갱신
      } else {
        alert("댓글 삭제 실패:", data.message);
      }
    } catch (error) {
      console.error("댓글 삭제 오류:", error);
    }
  };

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
