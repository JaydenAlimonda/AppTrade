import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar({ logout }) {

  return (
    <nav className='nav--container'>
      <Link to='/home' className='navlink'>
        Home
      </Link>
      <Link to='/createPost' className='navlink'>
        Create Post
      </Link>
      <Link to='/about' className='navlink'>
        About
      </Link>
      <Link to='/profile' className='navlink'>
        Profile
      </Link>
      <button onClick={logout} className='logout--btn'>logout</button>
    </nav>
  );
}


