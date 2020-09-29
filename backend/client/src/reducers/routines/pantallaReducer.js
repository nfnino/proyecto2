import {
    GET_RUTINAS, 
    ADD_RUTINA,
    UPDATE_RUTINA,
    RUTINAS_LOADING,
    GET_DETAILS
} from "../../actions/types";

const initialState = {
    pantallas: [],
    details: [],
    pantallasLoading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case RUTINAS_LOADING:
            return {
                ...state, 
                pantallasLoading: true
            }
        case GET_RUTINAS:
            return {
                ...state,
                pantallas: action.payload,
                pantallasLoading: false
            };
        case ADD_RUTINA:
            return{
                ...state, 
                pantallas: action.payload,
                pantallasLoading: false
            }
        case GET_DETAILS:
            return {
                ...state,
                details: action.payload
            };
        case UPDATE_RUTINA:
            return{
                ...state, 
                pantallas: action.payload,
                pantallasLoading: false
            }     
        default:
            return state;       
    }
}