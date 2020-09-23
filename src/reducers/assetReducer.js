import {
    GET_ASSETS,
    ADD_ASSET,
    UPDATE_ASSET,
    DELETE_ASSET,
    ASSETS_LOADING
} from "../actions/types";

const initialState = {
    assets: [],
    assetsLoading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ASSETS_LOADING:
            return {
                ...state, 
                assetsLoading: true
            }
        case GET_ASSETS:
            return {
                ...state,
                assets: action.payload,
                assetsLoading: false
            };
        case ADD_ASSET:
            return{
                ...state, 
                assets: action.payload,
                assetsLoading: false
            }
        case UPDATE_ASSET:
            return{
                ...state, 
                assets: action.payload,
                assetsLoading: false
            }    
        case DELETE_ASSET:
            return{
                ...state, 
                assets: action.payload,
                assetsLoading: false
            } 
        default:
            return state;       
    }
}