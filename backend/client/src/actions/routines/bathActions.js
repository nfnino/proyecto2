import axios from "axios";
import {
    GET_ERRORS,
    GET_BATHS,
    GET_DETAIL,
    GET_DETAILS,
    BATHS_LOADING
} from "../types";

export const getBaths = () => dispatch => {
    dispatch(setBathsLoading());
    axios
    .get("/api/routines/baths/")
    .then(res =>
        dispatch({
            type: GET_BATHS,
            payload: res.data
        })
    )
    .catch(err =>
        dispatch({
            type: GET_BATHS,
            payload: null
        })
    );
};

 export const getDetallesBath = (id) => async dispatch => {
    axios
    .get(`/api/routines/baths/${id}`)
    .then(res =>  {
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

export const getDetail = (data) => dispatch => {
    axios
    .get("/api/routines/baths/newDetBath", {
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
} 

export const addBath = (bathData, history) => dispatch => {
    axios
    .post("/api/routines/baths/newBath", bathData)
    .then(res => {
        history.push(`/baths`)
    })
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    );
}

export const newDetBath = (data, history) => dispatch => {
    axios
    .put("/api/routines/baths/newdetbath", data)
    .then(res => history.push(`/updateBath/${res.data.data._id}`))
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    );
}

export const updateBath = (id, data, history) => dispatch => {
    axios
    .put(`/api/routines/baths/updateBath/${id}`, data)
    .then(res => history.push(`/baths`))
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    );
}

export const setBathsLoading = () => {
    return {
        type: BATHS_LOADING
    };
};