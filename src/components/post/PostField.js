import React from "react";
import { getLocalStorage, saveLocalStorage } from '../../utils/session';
import { handleLocation } from '../../utils/handleLocation';

import '../../styles/post/post.css';

const PostField = ({ post }) => {
  const image = getLocalStorage('profile');
  console.log(`image : ${image}`);

  const handleModify = () => {
    saveLocalStorage("editTitle", post.title);
    saveLocalStorage("editContent", post.content);
    handleLocation("/post/edit");
  };

  const handleDelete = async() => {
    const confirmDelete = window.confirm("게시글을 삭제하시겠습니까?");
    if (confirmDelete) {
      const postId = post.post_id; 
      try {
        const response = await fetch(`http://localhost:3000/api/post`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            post_id: postId,
          }),
        });
        const data = await response.json();
        if (data.success) {
          alert('게시글이 삭제되었습니다!');
          handleLocation("/posts");
        } else {
          console.error('게시글 삭제 실패:', data.message);
          alert('게시글 삭제에 실패했습니다.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('서버 오류가 발생했습니다.');
      }
    }
  };

  const handleLike = async () => {
    const postId = post.post_id; 
    try {
      const response = await fetch(`http://localhost:3000/api/post`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post_id: postId,
        }),
      });
      const data = await response.json();
      if (data.success) {
        alert('좋아요가 추가되었습니다!');
        window.location.reload();
      } else {
        console.error('좋아요 추가 실패:', data.message);
        alert('좋아요 추가에 실패했습니다.');
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
            <img src={image || "/assets/images/default-avatar.png"} alt="avatar" />
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
