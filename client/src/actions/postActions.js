import axios from 'axios'
import { setErrors } from './errorActions'
import {  GET_POSTS, GET_POST} from './types'
import { TOGGLE_POST_LOADING } from './types'


export const createPost = ( postData,dispatch,history) => {

    dispatch(togglePostLoading())
    axios.post("/api/posts/create", postData)
    .then(res => {
        dispatch(togglePostLoading())
        history.push("/blog")
    })
    .catch(err => {
        dispatch(setErrors(err.response.data))
        dispatch(togglePostLoading())
    })

}

export const getPostById = (id, dispatch) => {

    axios.get(`/api/posts/post/${id}`)
    .then(res => {
        dispatch ({
            type: GET_POST,
            payload:res.data
        })   
    })
    .catch(err => {
        console.log(err.response.data)
    })

}



export const getPosts = () => dispatch => {

    axios
       .get(`/api/posts/`)
       .then(res => {        
          dispatch({
              type: GET_POSTS,
              payload: res.data
          })
         
       })
       .catch(err => {
          dispatch(setErrors(err.response.data));
          
       });
 };


export const deletePost = (id, history) => {
    axios.delete(`/api/posts/delete/${id}`)
    .then(res => {
        history.push("/blog")
    })
    .catch(err => {
        console.log(err.response.data)
    })
}

export const togglePostLoading = () => {
    return {
        type: TOGGLE_POST_LOADING
    }

}