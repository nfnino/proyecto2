import {
    GET_TASKS, 
    ADD_TASK,
    UPDATE_TASK,
    TASKS_LOADING
} from "../actions/types";

const initialState = {
    tasks: [],
    tasksLoading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case TASKS_LOADING:
            return {
                ...state, 
                tasksLoading: true
            }
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload,
                tasksLoading: false
            };
        case ADD_TASK:
            return{
                ...state, 
                tasks: action.payload,
                tasksLoading: false
            }
        case UPDATE_TASK:
            return{
                ...state, 
                tasks: action.payload,
                tasksLoading: false
            }     
        default:
            return state;       
    }
}