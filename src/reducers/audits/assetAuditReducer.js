import {
    GET_ASSET_AUDITS,
    ASSET_AUDITS_LOADING
} from "../../actions/types";

const initialState = {
    assetaudits: [],
    assetauditsLoading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ASSET_AUDITS_LOADING:
            return {
                ...state, 
                assetauditsLoading: true
            }
        case GET_ASSET_AUDITS:
            return {
                ...state,
                assetaudits: action.payload,
                assetauditsLoading: false
            };
        default:
            return state;       
    }
}