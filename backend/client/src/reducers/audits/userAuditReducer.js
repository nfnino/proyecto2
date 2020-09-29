import {
    GET_USER_AUDITS,
    USER_AUDITS_LOADING
} from "../../actions/types";

const initialState = {
    useraudits: [],
    userauditsLoading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case USER_AUDITS_LOADING:
            return {
                ...state, 
                userauditsLoading: true
            }
        case GET_USER_AUDITS:
            return {
                ...state,
                useraudits: action.payload,
                userauditsLoading: false
            };
        default:
            return state;       
    }
}