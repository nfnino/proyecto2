import {
    GET_ROUTINES, 
    ADD_ROUTINE,
    UPDATE_ROUTINE,
    ROUTINES_LOADING
} from "../actions/types";

const initialState = {
    routines: [],
    routinesLoading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ROUTINES_LOADING:
            return {
                ...state, 
                routinesLoading: true
            }
        case GET_ROUTINES:
            return {
                ...state,
                routines: action.payload,
                routinesLoading: false
            };
        case ADD_ROUTINE:
            return{
                ...state, 
                routines: action.payload,
                routinesLoading: false
            }
        case UPDATE_ROUTINE:
            return{
                ...state, 
                routines: action.payload,
                routinesLoading: false
            }     
        default:
            return state;       
    }
}