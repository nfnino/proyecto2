import {
    GET_TASK_AUDITS,
    TASK_AUDITS_LOADING
} from "../../actions/types";

const initialState = {
    taskaudits: [],
    taskauditsLoading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case TASK_AUDITS_LOADING:
            return {
                ...state, 
                taskauditsLoading: true
            }
        case GET_TASK_AUDITS:
            return {
                ...state,
                taskaudits: action.payload,
                taskauditsLoading: false
            };
        default:
            return state;       
    }
}