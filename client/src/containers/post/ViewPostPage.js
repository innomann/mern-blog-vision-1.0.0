import React, {useEffect} from 'react'
import { deletePost, getPostById } from '../../actions/postActions'
import ViewPost from '../../components/posts/ViewPost'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'


function ViewPostPage({post,match}) {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        getPostById(match.params.id,dispatch)     
    }, [match,dispatch])

    const handleDelete = () => {
        deletePost(post._id, history)
    }

    return (
        <ViewPost 
        post = {post} 
        onDelete = { handleDelete }
        />
    )
}

const mapStateToProps = state => ({
    post: state.post.post
})

export default connect(
    mapStateToProps,
    {getPostById}
) (ViewPostPage);
