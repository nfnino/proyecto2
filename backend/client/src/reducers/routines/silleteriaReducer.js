import {
    GET_SILLETERIAS, 
    ADD_SILLETERIA,
    GET_DETAIL,
    UPDATE_SILLETERIA,
    SILLETERIAS_LOADING,
    GET_DETAILS
} from "../../actions/types";

const initialState = {
    silleterias: [],
    details: [],
    silleteriasLoading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SILLETERIAS_LOADING:
            return {
                ...state, 
                silleteriasLoading: true
            }
        case GET_SILLETERIAS:
            return {
                ...state,
                silleterias: action.payload,
                silleteriasLoading: false
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
        case ADD_SILLETERIA:
            return{
                ...state, 
                silleterias: action.payload,
                silleteriasLoading: false
            }
        case UPDATE_SILLETERIA:
            return{
                ...state, 
                silleterias: action.payload,
                silleteriasLoading: false
            }     
        default:
            return state;       
    }
}