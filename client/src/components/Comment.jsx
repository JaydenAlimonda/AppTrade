import React, { useState } from 'react';

function Comment({ _id, author, content, deleteComment, editComment, postId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(content);

  const handleDelete = () => {
    deleteComment(postId, _id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    editComment(postId, _id, updatedContent);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setUpdatedContent(content);
  };

  return (
    <div>
      {isEditing ? (
        <>
          <input type="text" value={updatedContent} onChange={(e) => setUpdatedContent(e.target.value)} />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </>
      ) : (
        <>
          <p><strong>{author}</strong>: {content}</p>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
    </div>
  );
}

export default Comment;
