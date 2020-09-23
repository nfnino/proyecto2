import {
    GET_VIPS, 
    ADD_VIP,
    UPDATE_VIP,
    VIPS_LOADING,
    GET_DETAILS
} from "../../actions/types";

const initialState = {
    vips: [],
    details: [],
    vipsLoading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case VIPS_LOADING:
            return {
                ...state, 
                vipsLoading: true
            }
        case GET_VIPS:
            return {
                ...state,
                vips: action.payload,
                vipsLoading: false
            };
        case GET_DETAILS:
            return {
                ...state,
                details: action.payload
            };
        case ADD_VIP:
            return{
                ...state, 
                vips: action.payload,
                vipsLoading: false
            }
        case UPDATE_VIP:
            return{
                ...state, 
                vips: action.payload,
                vipsLoading: false
            }     
        default:
            return state;       
    }
}