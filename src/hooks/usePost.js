import { useState, useEffect } from 'react';
import { getLocalStorage } from '../utils/session';
import { getCurrentDate } from '../utils/getCurrentDate';

const usePost = () => {
  const [postData, setPostData] = useState(null);
  const [comments, setComments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [commentToEdit, setCommentToEdit] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      const postDetails = JSON.parse(localStorage.getItem('postDetails'));
      if (postDetails) {
        const postId = postDetails.id;
        console.log(`post id : ${postId}`);
        console.log(`post details : ${[postDetails.profile]}`);
        try {
          const response = await fetch(`/api/post/${postId}`);
          const responseData = await response.json();
          
          if (responseData && responseData.data.postData) {
            const data = responseData.data.postData;
            console.log(`comments : ${data.comment}`);
            setPostData(responseData.data.postData);
            setComments(responseData.data.postData.comment || []); 
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

  const addComment = async (commentContent) => {
    const userId = getLocalStorage("userId");
    const postDetails = JSON.parse(localStorage.getItem('postDetails'));
    const postId = postDetails.id;
    console.log(`userId:  ${userId}`);
    console.log(`postId:  ${postId}`);

    try {
      const response = await fetch("/api/comment", {
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
        alert(`${data.data}`);
        window.location.reload();
      } else {
        alert(`${data.data}`);
      }
    } catch (error) {
      console.error("댓글 추가 오류:", error);
    }
  };

  const deleteComment = async (commentId) => {
    const postId = JSON.parse(localStorage.getItem("postDetails")).id;
    const userId = localStorage.getItem("userId");

    console.log(`userId: ${userId}`);
    console.log(`postId: ${postId}`);
    console.log(`commentId: ${commentId}`);
    try {
      const response = await fetch("/api/comment", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, comment_id: `${commentId}`, post_id: postId }),
      });
      const data = await response.json();
      if (data.success) {
        alert(`${data.data}`);
        setComments(comments.filter((comment) => comment.id !== commentId));
        window.location.reload();
      } else {
        alert(`${data.data}`);
      }
    } catch (error) {
      console.error("댓글 삭제 오류:", error);
    }
  };

  return {
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
  };
};

export default usePost;
