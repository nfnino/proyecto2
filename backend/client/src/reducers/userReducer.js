import {
    GET_USERS,
    DELETE_USER,
    USERS_LOADING
} from "../actions/types";

const initialState = {
    users: [],
    usersLoading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case USERS_LOADING:
            return {
                ...state,
                usersLoading: true
            };
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                usersLoading: false
            };
        case DELETE_USER:
            return{
                ...state, 
                users: action.payload,
                usersLoading: false
            }
        default:
            return state;
    }
}