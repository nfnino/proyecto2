import axios from "axios";
import {
    GET_ERRORS,
    GET_SILLETERIAS,
    GET_DETAILS,
    SILLETERIAS_LOADING
} from "../types";

export const getSilleteria = () => dispatch => {
    dispatch(setSilleteriaLoading());
    console.log("actions")
    axios
    .get("/api/routines/silleterias/")
    .then(res =>
        dispatch({
            type: GET_SILLETERIAS,
            payload: res.data
        })
    )
    .catch(err =>
        dispatch({
            type: GET_SILLETERIAS,
            payload: null
        })
    );
};

 export const getPisos = (id) => async dispatch => {
    axios
    .get(`/api/routines/silleterias/${id}`)
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

export const addSilleteria = (bathData, history) => dispatch => {
    axios
    .post("/api/routines/silleterias/newSilleteria", bathData)
    .then(res => {
        history.push(`/silleterias`)
    })
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    );
}

export const newPiso = (data, history) => dispatch => {
    axios
    .put("/api/routines/silleterias/newPiso", data)
    .then(res => history.push(`/updateSilleteria/${res.data.data._id}`))
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    );
}

export const updateSilleteria = (id, data, history) => dispatch => {
    axios
    .put(`/api/routines/silleterias/updateSilleteria/${id}`, data)
    .then(res => history.push(`/silleterias`))
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    );
}

export const setSilleteriaLoading = () => {
    return {
        type: SILLETERIAS_LOADING
    };
};