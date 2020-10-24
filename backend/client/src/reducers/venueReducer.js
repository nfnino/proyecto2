import {
    GET_VENUES,
    DELETE_VENUE,
    VENUES_LOADING
} from "../actions/types";

const initialState = {
    venues: [],
    venuesLoading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_VENUES:
            return {
                ...state,
                venues: action.payload,
                venuesLoading: false
            };
        case DELETE_VENUE:
            return{
                ...state, 
                venues: action.payload,
                venuesLoading: false
            }
        case VENUES_LOADING:
            return {
                ...state, 
                venuesLoading: true
            }
        default:
            return state;
    }
}