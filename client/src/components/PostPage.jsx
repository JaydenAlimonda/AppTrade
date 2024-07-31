import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Comment from './Comment';
import { Context } from '../context/ContextProvider';

function PostPage() {

  const { id } = useParams(); // get post ID

  const { getOnePost, singlePost, comments, deleteComment, postComment, editComment } = useContext(Context); // Get postBoard from context

  const [commentInput, setCommentInput] = useState({ author: '', content: '' }); // State to manage comment input
  // get post and comments data

  useEffect(() => { 
    getOnePost(id) 
    }
    , []);

  // Function to handle comment submit
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentInput.content.trim() === '') return;
    postComment(id, commentInput)
    setCommentInput({ author: '', content: '' }); // Clear comment input fields
  };

  const handleInputChange = (e) => {
    setCommentInput({ ...commentInput, content: e.target.value });
  };
  let upVoteTotal = singlePost.upVotes || []
  let downTotal =singlePost.downVotes || [] 
  
  console.log(upVoteTotal)
  console.log(downTotal)
  return (
    <div className='post--page--container'>
      <div className='post--page--info'>
        <h1>{singlePost.offer}</h1>
        <p>Price: {singlePost.price}</p>
        <p>Meet up location: {singlePost.location}</p>
        <p>Post Author: {singlePost.author}</p>
        <p>Contact info: {singlePost.contact}</p>
        <p>Votes: {upVoteTotal.length - downTotal.length}</p>
      </div>
      <h2>Comments</h2>
      {/* Form for submitting new comments */}
      <form onSubmit={handleCommentSubmit}>
        <input type='text' value={commentInput.content} onChange={handleInputChange} placeholder='Add a comment...' />
        <button type='submit'>Submit</button>
      </form>
      <div>
        {comments.map((comment) => (
          <Comment key={comment._id} postId={id}{...comment} deleteComment={deleteComment} editComment={editComment} />
        ))}
      </div>

    </div>
  );
}

export default PostPage;
