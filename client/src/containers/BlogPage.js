import { connect } from 'react-redux'
import React, {useEffect} from 'react'
import Blog from '../components/user/Blog'
import {getPosts} from '../actions/postActions'

function BlogPage({isAuthenticated,getPosts,posts}) {

    useEffect(() => {
        getPosts()
     }, [ getPosts]);

    return (
        <Blog posts = {posts} />
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    posts: state.post.posts
 });

export default connect(
    mapStateToProps,
    {getPosts}
) (BlogPage)
