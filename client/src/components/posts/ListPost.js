import React from 'react'
import Post from './Post'
import { Link } from "react-router-dom";
import "./post.scss";

function ListPost({posts}) {
    return (
        <div className="grid-container mx-3">
            {posts.map (post => (
                 <Link to={`/blog/post/${post._id}`} key={post._id}>
                     <Post post = {post}/>
                 </Link>
            ))}
        </div>
    )
}

export default ListPost
