import axios from "axios";
import {
    GET_ERRORS,
    GET_ROUTINES,
    ROUTINES_LOADING
} from "./types";

export const getRoutines = () => dispatch => {
    dispatch(setRoutinesLoading());
    axios
    .get("/api/routines/routines")
    .then(res =>
        dispatch({
            type: GET_ROUTINES,
            payload: res.data
        })
    )
    .catch(err =>
        dispatch({
            type: GET_ROUTINES,
            payload: null
        })
    );
};

export const nameRoutines = (routineData, history) => dispatch => {
    dispatch(setRoutinesLoading());
    console.log(routineData)
    let e = routineData.ejecutor
    let s = routineData.supervisor
    let est = routineData.estado
    console.log(e+" "+s+" "+est)
    if(e===""||e===null) {
        e = "[a-zA-Z]"
    }
    if(s===""||s===null) {
        s = "[a-zA-Z]"
    }
    if(est===""||est===null) {
        est = "[a-zA-Z]"
    }
    axios
    .get(`api/routines/routines/${e}/${s}/${est}`)
    .then(res =>
        dispatch({
            type: GET_ROUTINES,
            payload: res.data
        })
    )
    .catch(err =>
        dispatch({
            type: GET_ROUTINES,
            payload: null
        })
    );
};

export const addRoutine = (routineData, history) => dispatch => {
    axios
    .post("/api/routines/newRoutine", routineData)
    .then(res => history.push("/routines"))
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    );
}

export const updateRoutine = (routineData, history) => dispatch => {
    const id = routineData.id
    axios
    .put(`/api/routines/updateRoutine/${id}`, routineData)
    .then(res => history.push("/routines"))
    .catch(err =>
         dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        }) 
    );
}

export const setRoutinesLoading = () => {
    return {
        type: ROUTINES_LOADING
    };
};