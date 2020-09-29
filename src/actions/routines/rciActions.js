import axios from "axios";
import {
    GET_ERRORS,
    GET_RCIS,
    //GET_DETAIL,
    GET_DETAILS,
    RCIS_LOADING
} from "../types";

export const getrcis = () => dispatch => {
    dispatch(setrciLoading());
    console.log("actions")
    axios
    .get("/api/routines/rcis/")
    .then(res =>
        dispatch({
            type: GET_RCIS,
            payload: res.data
        })
    )
    .catch(err =>
        dispatch({
            type: GET_RCIS,
            payload: null
        })
    );
};

 export const getGabinetes = (id) => async dispatch => {
    axios
    .get(`/api/routines/rcis/${id}`)
    .then(res =>  {
        console.log(res.data)
        dispatch({
        type: GET_DETAILS,
        payload: res.data
    })})
    .catch(err =>
        dispatch({
            type: GET_DETAILS,
            payload: null
        })
    );
};

/* export const getDetail = (data) => dispatch => {
    axios
    .get("/api/routines/rcis/newDetBath", {
        params: {
            id: data.id,
            rutina: data.rutina
        }
    })
    .then(res =>
        dispatch({
            type: GET_DETAIL,
            payload: res.data
        })
    )
    .catch(err =>
        dispatch({
            type: GET_DETAIL,
            payload: null
        })
    );
}  */

export const addrci = (bathData, history) => dispatch => {
    axios
    .post("/api/routines/rcis/newrci", bathData)
    .then(res => {
        history.push(`/rcis`)
    })
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    );
}

export const newGabinete = (data, history) => dispatch => {
    axios
    .put("/api/routines/rcis/newGabinete", data)
    .then(res => history.push(`/updaterci/${res.data.data._id}`))
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    );
}

export const updaterci = (id, data, history) => dispatch => {
    axios
    .put(`/api/routines/rcis/updaterci/${id}`, data)
    .then(res => history.push(`/rcis`))
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    );
}

export const setrciLoading = () => {
    return {
        type: RCIS_LOADING
    };
};