import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/ContextProvider';

const Home = (props) => {

  const { editPost, deletePost, upVote, downVote } = useContext(Context)

  const [editMode, setEditMode] = useState(false); // Edit toggle

  const [editedPost, setEditedPost] = useState({}); // Edit post state 


  const handleEdit = () => {
    setEditMode(true);
    setEditedPost({
      offer: props.offer,
      price: props.price,
      location: props.location,
      author: props.author,
      contact: props.contact
    });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPost(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  // Call editPost function from props with edited data and post ID & disable edit mode
const handleDownVote = () =>{
  downVote(props._id)
}

const handleUpVote = () =>{
  upVote(props._id)
}


  const handleSubmitEdit = () => {
    editPost(editedPost, props._id);
    setEditMode(false);
  }

  // Disable edit mode

  const handleCancelEdit = () => {
    setEditMode(false);
  }

  // handle delete

  const handleDelete = () => {
    deletePost(props._id);
  }

  const totalVotes = props.upVotes.length - props.downVotes.length;

  return (
    <div className='homePostContainer'>
      {editMode ? (
        <div className='trade--post'>
          <p>Offer: </p><input type="text" name="offer" value={editedPost.offer} onChange={handleInputChange} />
          <p>Price: </p><input type="number" name="price" value={editedPost.price} onChange={handleInputChange} />
          <p>Location: </p><input type="text" name="location" value={editedPost.location} onChange={handleInputChange} />
          <p>Contact: :</p><input type="text" name="contact" value={editedPost.contact} onChange={handleInputChange} />
          <button onClick={handleSubmitEdit}>Submit Edit</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) : (
        <div className='trade--post'>
          <Link to={`/Post/${props._id}`} className='offer--Link'>
            {props.offer}
          </Link>
          <p>Offer type: {props.typeOfOffer}</p>
          <p>Price: ${props.price}</p>
          <p>Meetup spot: {props.location}</p>
          <p>Post Author: {props.author}</p>
          <p>Contact information: {props.contact}</p>
          {/* Edit and Delete buttons */}
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleEdit}>Edit</button>
          <span> Votes: </span>
          <button onClick={handleUpVote}>/\</button>
          <span> {totalVotes} </span>
          <button onClick={handleDownVote}>\/</button>
        </div>
      )}
    </div>
  )
}

export default Home;
