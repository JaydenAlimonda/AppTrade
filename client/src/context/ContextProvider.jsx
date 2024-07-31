import React, { useState } from "react";
import axios from "axios";

export const Context = React.createContext();

const userAxios = axios.create();
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const ContextProvider = (props) => {
    //////////////////////////////////////////////////Auth//////////////////////////////////////////////////////
    const initState = {
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token') || "",
        posts: [],
        errMsg: ''
    };

    const [userState, setUserState] = useState(initState);

    //signup, get token and user
    function signup(credentials) {
        axios.post('/api/auth/signup', credentials)
            .then(res => {
                const { user, token } = res.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }));
            })
            .catch(err => handleAuthErr(err.response.data.err));
    }

    function login(credentials) {
        axios.post('/api/auth/login', credentials)
            .then(res => {
                const { user, token } = res.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }));
            })
            .catch(err => handleAuthErr(err));
    }

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUserState({
            user: {},
            token: "",
            posts: []
        });
    }

    function handleAuthErr(err) {
            console.log(err)
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg : err
        }));
    }
    ////////////////////////////////////////////////////Posts////////////////////////////////////////////////////////////////////////////////
    const [postBoard, setPostBoard] = useState([]);
    const [singlePost, setSinglePost] = useState([])

    const getPosts = () => {
        userAxios.get("/api/tradeposts")
            .then(res => setPostBoard(res.data))
            .catch(err => console.log(err));
    }
    const getOnePost = (_id) => {
        userAxios
        .get(`/api/tradeposts/${_id}`)
        .then((res) => {
            setSinglePost(res.data); // Set post data
            setComments(res.data.comments); // Set comments data
        })
        .catch((err) => console.log(err));
    }
    console.log(singlePost)
    // Add post and add to state
    const addPost = (newPost) => {
        newPost.author = userState.user.username;

        userAxios.post("/api/tradeposts", newPost)
            .then(res => {
                setPostBoard(prev => [...prev, res.data]);
            })
            .catch(err => console.log(err));
    }

    // Delete post and filter out of state
    const deletePost = (_id) => {
        // Fetch the post from the state
        const postToDelete = postBoard.find(post => post._id === _id);

        // Check if the post author matches the current user
        if (postToDelete.author === userState.user.username) {
            userAxios.delete(`/api/tradeposts/${_id}`)
                .then(res => {
                    // Filter out the post from the state if the user is the author
                    setPostBoard(prev => prev.filter(post => post._id !== _id))
                })
                .catch(err => console.log(err))
        } else {
            console.log("You can only delete your own posts.");
        }
    }
    // Update DB and update state

    const editPost = (update, _id) => {
        // Fetch the post from the state
        const postToUpdate = postBoard.find(post => post._id === _id);

        // Check Auth
        if (postToUpdate.author === userState.user.username) {
            userAxios.put(`/api/tradeposts/${_id}`, update)
                .then(res => {
                    // Update the post in the state if the user is the author
                    setPostBoard(prev => prev.map(post => post._id !== _id ? post : res.data))
                })
                .catch(err => console.log(err))
        } else {
            console.log("You can only edit your own posts.");
        }
    }


    //////////////////////////////////////////////////Comments//////////////////////////////////////////////////////
    const [comments, setComments] = useState([]); // State to store comments


    const postComment = (_id, commentInput) => {
        commentInput.author = userState.user.username;
        userAxios
            .post(`/api/tradeposts/${_id}/comments`, commentInput)
            .then((res) => {
                setComments((prevComments) => [...prevComments, res.data.comments[res.data.comments.length - 1]]); // Add new comment to the comments list
            })
            .catch((err) => console.log(err));
    }

    // Function to delete a comment
    const deleteComment = (_id, commentId) => {
        // Fetch the comment from the state
        const commentToDelete = comments.find(comment => comment._id === commentId);

        // Check Auth
        if (commentToDelete.author === userState.user.username) {
            userAxios
                .delete(`/api/tradeposts/${_id}/comments/${commentId}`)
                .then((res) => {
                    setComments(res.data.comments); // Update comments list after deletion
                })
                .catch((err) => console.log(err));
        } else {
            console.log("You can only delete your own comments.");
        }
    };

    const editComment = (_id, commentId, updatedContent) => {
        const commentToUpdate = comments.find(comment => comment._id === commentId);

        // Check Auth
        if (commentToUpdate.author === userState.user.username) {
            userAxios
                .put(`/api/tradeposts/${_id}/comments/${commentId}`, { content: updatedContent }) //update DB
                .then((res) => {
                    setComments(res.data.comments); // Update comments list after editing
                })
                .catch((err) => console.log(err));
        } else {
            console.log("You can only edit your own comments.");
        }
    };
    //////////////////////////////////////////////////Upvote/Downvote////////////////////////////////////////////////
    
    const upVote = (_id) => {
        console.log(`Upvoting post with ID: ${_id}`);
        userAxios.put(`/api/tradeposts/upVote/${_id}`)
          .then(res => {
            setPostBoard(prev => prev.map(post => post._id !== _id ? post : res.data));
          })
          .catch(err => console.log(err));
      };
    
      const downVote = (_id) => {
        console.log(`Downvoting post with ID: ${_id}`);
        userAxios.put(`/api/tradeposts/downVote/${_id}`)
          .then(res => {
            setPostBoard(prev => prev.map(post => post._id !== _id ? post : res.data));
          })
          .catch(err => console.log(err));
      };
    return (
        <Context.Provider value={{
            login,
            signup,
            logout,
            ...userState,
            getPosts,
            postBoard,
            addPost,
            editPost,
            deletePost,
            getOnePost,
            singlePost,
            comments,
            deleteComment,
            postComment,
            editComment,
            upVote,
            downVote,
            
        }}>
            {props.children}
        </Context.Provider>
    );
}
