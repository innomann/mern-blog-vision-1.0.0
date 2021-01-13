import React,{useState,useEffect} from 'react'
import { createPost } from '../../actions/postActions'
import Validate from '../../components/form/Validate'
import PostForm from '../../components/posts/PostForm'
import { connect, useDispatch } from 'react-redux'
import {useHistory} from 'react-router-dom'


function CreatePostPage({loading,errors}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [post,setPost] = useState({
        title: "",
        body: "",
        errors: ""
    })

    useEffect(() => {
        setPost(post => {
            return {...post,errors}
        })
    }, [errors])

    const handleChange = e => {
        setPost({
            ...post,
            [e.target.name] : e.target.value
        })
    }

    const handleBlur = e => {
        const { name, value } = e.target
        const error = {...post.errors, ...Validate(name, value).errors}
        setPost({...post, errors:{...error}})
    }

    const handleSubmit = e => {
        e.preventDefault()
        const { title,body } = post
        createPost({title,body}, dispatch,history)
    }

    return (
        <PostForm
        loading = {loading}
        post = {post}
        onChange = { handleChange }
        onBlur = { handleBlur }
        onSubmit = { handleSubmit }
        />
    )
}


const mapStateToProps = state => ({
    loading: state.post.postLoading,
    errors: state.errors
})

export default connect(
    mapStateToProps,
    {createPost}
) (CreatePostPage)

