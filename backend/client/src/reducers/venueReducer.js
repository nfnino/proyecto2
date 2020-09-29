import {
    GET_VENUES,
    DELETE_VENUE
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
        default:
            return state;
    }
}