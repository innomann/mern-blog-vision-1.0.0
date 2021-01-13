import axios from 'axios'
import { setErrors } from './errorActions'
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER, TOGGLE_USER_LOADING } from './types'
import setAuthToken from '../utils/setAuthToken';

export  const registerUser = (userData,history,dispatch) => {
    dispatch(toggleUserLoading())
    axios.post("/api/users/signup",userData)
    .then(res => {
        dispatch(toggleUserLoading());
        localStorage.setItem("loginMessage", "Successifully registered. Login to continue");
        history.push("/login");
    })
    .catch(err => {
        dispatch(setErrors(err.response.data));
        dispatch(toggleUserLoading())
    })

}

export default registerUser

export const loginUser = (userData,dispatch) => {
    dispatch(toggleUserLoading())   
    axios.post("/api/users/login", userData)
    .then(res => {
        const { token } = res.data;
        localStorage.setItem("jwtToken", token)
        setAuthToken(token)
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded))
        dispatch(toggleUserLoading());
    })
    .catch(err => {
        dispatch(setErrors(err.response.data));
        dispatch(toggleUserLoading())
    })
}

export const setCurrentUser = userData => {
    return {
        type: SET_CURRENT_USER,
        payload: userData
    }

}



export const toggleUserLoading = () => {
    return {
        type: TOGGLE_USER_LOADING
    }
}


export const logoutUser = (dispatch) => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}


