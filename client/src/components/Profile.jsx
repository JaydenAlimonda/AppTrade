import React, { useContext } from "react";
import Home from "./Home";
import { Context } from '../context/ContextProvider';

const Profile = () => {
    const { postBoard, user } = useContext(Context);

    return (
        <div>
            <h1>Welcome {user.username}</h1>
            {postBoard.map(post => (
                // Check if the post author matches the current user's username
                post.author === user.username && (
                    <div key={post._id} className='trade--posts'>
                        <Home {...post} />
                    </div>
                )
            ))}
        </div>
    );
}

export default Profile;
