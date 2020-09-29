import {
    GET_BATHS, 
    ADD_BATH,
    GET_DETAIL,
    UPDATE_BATH,
    BATHS_LOADING,
    GET_DETAILS
} from "../../actions/types";

const initialState = {
    baths: [],
    detail: null,
    details: [],
    bathsLoading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case BATHS_LOADING:
            return {
                ...state, 
                bathsLoading: true
            }
        case GET_BATHS:
            return {
                ...state,
                baths: action.payload,
                bathsLoading: false
            };
        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            };
        case GET_DETAILS:
            return {
                ...state,
                details: action.payload
            };
        case ADD_BATH:
            return{
                ...state, 
                baths: action.payload,
                bathsLoading: false
            }
        case UPDATE_BATH:
            return{
                ...state, 
                baths: action.payload,
                bathsLoading: false
            }     
        default:
            return state;       
    }
}