import axios from "axios";
import {
    GET_ERRORS,
    GET_FACHADAS,
    GET_DETAILS,
    GET_DETAIL,
    FACHADAS_LOADING
} from "../types";

export const getFachadas = () => dispatch => {
    dispatch(setFachadaLoading());
    axios
    .get("/api/routines/fachadas/")
    .then(res =>
        dispatch({
            type: GET_FACHADAS,
            payload: res.data
        })
    )
    .catch(err =>
        dispatch({
            type: GET_FACHADAS,
            payload: null
        })
    );
};

export const getDetallesFachada = (id) => async dispatch => {
    axios
    .get(`/api/routines/fachadas/${id}`)
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
    .get("/api/routines/fachadas/newDetFachada", {
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

export const addFachada = (bathData, history) => dispatch => {
    axios
    .post("/api/routines/fachadas/newFachada", bathData)
    .then(res => history.push("/fachadas"))
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    );
}

export const newDetFachada = (data, history) => dispatch => {
    axios
    .put("/api/routines/fachadas/newdetfachada", data)
    .then(res => history.push(`/updateFachada/${res.data.data._id}`))
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    );
}

export const updateFachada = (id, data, history) => dispatch => {
    axios
    .put(`/api/routines/fachadas/updateFachada/${id}`, data)
    .then(res => history.push(`/fachadas`))
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    );
}

export const setFachadaLoading = () => {
    return {
        type: FACHADAS_LOADING
    };
};