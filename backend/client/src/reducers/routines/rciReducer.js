import {
    GET_RCIS, 
    ADD_RCI,
    GET_DETAIL,
    UPDATE_RCI,
    RCIS_LOADING,
    GET_DETAILS
} from "../../actions/types";

const initialState = {
    rcis: [],
    details: [],
    rcisLoading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case RCIS_LOADING:
            return {
                ...state, 
                rcisLoading: true
            }
        case GET_RCIS:
            return {
                ...state,
                rcis: action.payload,
                rcisLoading: false
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
        case ADD_RCI:
            return{
                ...state, 
                rcis: action.payload,
                rcisLoading: false
            }
        case UPDATE_RCI:
            return{
                ...state, 
                rcis: action.payload,
                rcisLoading: false
            }     
        default:
            return state;       
    }
}