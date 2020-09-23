import axios from 'axios';
import {
    GET_ERRORS,
    GET_VIPS,
    GET_DETAILS,
    VIPS_LOADING
} from "../types";

export const getvips = () => dispatch => {
    dispatch(setvipLoading());
    console.log("actions")
    axios
    .get("/api/routines/vips/")
    .then(res =>
        dispatch({
            type: GET_VIPS,
            payload: res.data
        })
    )
    .catch(err =>
        dispatch({
            type: GET_VIPS,
            payload: null
        })
    );
};

 export const getSuites = (id) => async dispatch => {
    axios
    .get(`/api/routines/vips/${id}`)
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

export const addvip = (bathData, history) => dispatch => {
    axios
    .post("/api/routines/vips/newvip", bathData)
    .then(res => {
        history.push(`/vips`)
    })
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    );
}

export const newSuite = (data, history) => dispatch => {
    axios
    .put("/api/routines/vips/newSuite", data)
    .then(res => history.push(`/updatevip/${res.data.data._id}`))
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    );
}

export const updatevip = (id, data, history) => dispatch => {
    axios
    .put(`/api/routines/vips/updatevip/${id}`, data)
    .then(res => history.push(`/vips`))
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    );
}

export const setvipLoading = () => {
    return {
        type: VIPS_LOADING
    };
};