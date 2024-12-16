import React from "react";
import { getLocalStorage, saveLocalStorage } from '../../utils/session';
import { handleLocation } from '../../utils/handleLocation';

import '../../styles/post/post.css';

const PostField = ({ post }) => {
  const postDetails = JSON.parse(localStorage.getItem('postDetails'));
  const profile = postDetails.profile;

  const handleModify = () => {
    saveLocalStorage("editTitle", post.title);
    saveLocalStorage("editContent", post.content);
    handleLocation("/post/edit");
  };

  const handleDelete = async() => {
    const confirmDelete = window.confirm("게시글을 삭제하시겠습니까?");
    if (confirmDelete) {
      const postId = post.post_id; 
      const userId = getLocalStorage('userId');
      
      try {
        const response = await fetch(`/api/post`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
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
          console.error('게시글 삭제 실패:', data.data);
          alert(`${data.data}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('서버 오류가 발생했습니다.');
      }
    }
  };

  const handleLike = async () => {
    const postId = post.post_id;
    const userId = getLocalStorage('userId');
    
    console.log(`postId: ${postId}`);
    console.log(`userId:${userId}`);

    try {
      const response = await fetch(`/api/post`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          post_id: postId,
        }),
      });
      const data = await response.json();
      if (data.success) {
        alert(`${data.data}`);
        window.location.reload();
      } else {
        console.error('좋아요 추가 실패:', data.message);
        alert(`${data.data}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('서버 오류가 발생했습니다.');
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
            <span className="date">{post.updatePostDate || "알 수 없음"}</span>
          </div>

          <div className="post-actions">
            <div className="edit" id="btnbtn" onClick={handleModify}>수정</div>
            <div className="delete" id="btnbtn"  onClick={handleDelete}>삭제</div>
          </div>
        </div>

        {/* Post Content */}
        <div className="post-content">
          <div className="post-img">
            <img src={post.image} alt="board" />
          </div>
          <div className="post-article">
            <p>{post.content}</p>
          </div>
        </div>

        {/* Post Stats */}
        <div className="post-stats">
          <div className="stats" id="likesCount" onClick={handleLike}>{post.likesCnt || 0} 좋아요</div>
          <div className="stats" id="viewsCount">{post.viewsCnt || 0} 조회수</div>
          <div className="stats" id="commentsCount">{post.commentsCnt || 0} 댓글</div>
        </div>
      </article>
    </div>
  );
};

export default PostField;
