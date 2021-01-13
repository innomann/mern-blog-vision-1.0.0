import {GET_POST, GET_POSTS, TOGGLE_POST_LOADING} from '../actions/types'

const initialState = {
    post: {},
    posts: [],
    postLoading: false,
    postsLoading: false
}

const authReducer = (state = initialState,action) =>{
    
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                post: {},
                posts: [...action.payload]
            }

        case GET_POST:
            return {
                ...state,
                post: {...action.payload[0]}
            }

        case TOGGLE_POST_LOADING:
            return {
                ...state,
                postLoading: !state.postLoading
            }
    
        default:
            return state;
    }
}

export default authReducer