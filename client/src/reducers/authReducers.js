import { SET_CURRENT_USER, TOGGLE_USER_LOADING } from "../actions/types";
const isEmpty = require("is-empty");

const initialState = {
    isAuthenticated: false,
    user: {},
    userLoading: false
}

const authReducer = (state = initialState,action) => {
    switch (action.type) {
        case TOGGLE_USER_LOADING :
            return {
                ...state,
                userLoading: !state.userLoading
            };
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload           
            }
    
        default:
            return state;
    }
}

export default authReducer