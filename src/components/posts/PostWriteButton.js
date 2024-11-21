import React from "react";

const PostWriteButton = () => {
  const handleWritePost = () => {
    window.location.href = "/post/make";
  };

  return (
    <div className="write-post-button">
      <button className="write-post" onClick={handleWritePost}>
        게시글 작성
      </button>
    </div>
  );
};

export default PostWriteButton;
