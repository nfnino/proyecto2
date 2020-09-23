import axios from "axios";
import {
    GET_ERRORS,
    GET_FACHADAS,
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

export const getFachada = () => dispatch => {
    dispatch(setFachadaLoading());
    axios
    .get("/api/routines/fachadas/:id")
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

export const setFachadaLoading = () => {
    return {
        type: FACHADAS_LOADING
    };
};