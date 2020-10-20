import {
    GET_FACHADAS, 
    ADD_FACHADA,
    GET_DETAIL,
    GET_DETAILS,
    UPDATE_FACHADA,
    FACHADAS_LOADING
} from "../../actions/types";

const initialState = {
    fachadas: [],
    detail: null,
    details: [],
    fachadasLoading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FACHADAS_LOADING:
            return {
                ...state, 
                fachadasLoading: true
            }
        case GET_FACHADAS:
            return {
                ...state,
                fachadas: action.payload,
                fachadasLoading: false
            };
        case ADD_FACHADA:
            return{
                ...state, 
                fachadas: action.payload,
                fachadasLoading: false
            }
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
        case UPDATE_FACHADA:
            return{
                ...state, 
                fachadas: action.payload,
                fachadasLoading: false
            }
        default:
            return state;       
    }
}