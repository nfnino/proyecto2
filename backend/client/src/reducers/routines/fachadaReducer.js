import {
    GET_FACHADAS, 
    ADD_FACHADA,
    FACHADAS_LOADING
} from "../../actions/types";

const initialState = {
    fachadas: [],
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
        default:
            return state;       
    }
}