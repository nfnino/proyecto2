import {
    GET_PARKINGS, 
    ADD_PARKING,
    PARKINGS_LOADING
} from "../../actions/types";

const initialState = {
    parkings: [],
    parkingsLoading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case PARKINGS_LOADING:
            return {
                ...state, 
                parkingsLoading: true
            }
        case GET_PARKINGS:
            return {
                ...state,
                parkings: action.payload,
                parkingsLoading: false
            };
        case ADD_PARKING:
            return{
                ...state, 
                parkings: action.payload,
                parkingsLoading: false
            }
        default:
            return state;       
    }
}