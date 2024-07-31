import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import About from './components/About';
import PostPage from './components/PostPage';
import NavBar from './components/NavBar';
import Auth from './components/Auth';
import Profile from './components/Profile';
import { useContext } from 'react';
import { Context } from './context/ContextProvider';

const App = () => {
  const { token, logout, getPosts, postBoard } = useContext(Context)
  // Get posts init for page

  useEffect(() => {
    getPosts();
  }, [token]);

  return (
    <Router >

      <h1 className='title'>Appalachian Trade</h1>

      {token && <NavBar logout={logout} />}
      <Routes>
        <Route path="/" element={!token ? <Auth /> : <Navigate to='/home' />} />
        <Route path='/home' element={token ?
          <div className='post--container'>
            {postBoard.map(post => (
              <div key={post._id} className='trade--posts'>
                <Home {...post} />
              </div>
            ))}
          </div> : <Navigate to='/' />
        } />

        <Route path='/createPost' element={<CreatePost btnTxt="Submit" />} />
        <Route path='/about' element={<About />} />
        <Route path='/post/:id' element={<PostPage />} />
        <Route path='/logout' element={<Navigate to='/' />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      {!token && <Navigate to="/" />}
    </Router>
  )
}

export default App;
