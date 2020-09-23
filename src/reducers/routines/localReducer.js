import {
    GET_RUTINAS, 
    ADD_RUTINA,
    UPDATE_RUTINA,
    RUTINAS_LOADING,
    GET_DETAILS
} from "../../actions/types";

const initialState = {
    locals: [],
    details: [],
    localsLoading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case RUTINAS_LOADING:
            return {
                ...state, 
                localsLoading: true
            }
        case GET_RUTINAS:
            return {
                ...state,
                locals: action.payload,
                localsLoading: false
            };
        case ADD_RUTINA:
            return{
                ...state, 
                locals: action.payload,
                localsLoading: false
            }
        case GET_DETAILS:
            return {
                ...state,
                details: action.payload
            };
        case UPDATE_RUTINA:
            return{
                ...state, 
                locals: action.payload,
                localsLoading: false
            }     
        default:
            return state;       
    }
}