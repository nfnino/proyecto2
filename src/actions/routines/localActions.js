import axios from "axios";
import {
    GET_ERRORS,
    GET_RUTINAS,
    GET_DETAILS,
    RUTINAS_LOADING
} from "../types";

export const getLocales = () => dispatch => {
    console.log("actions locales")
    dispatch(setRutinaLoading());
    axios
    .get("/api/routines/locales/")
    .then(res =>
        dispatch({
            type: GET_RUTINAS,
            payload: res.data
        })
    )
    .catch(err =>
        dispatch({
            type: GET_RUTINAS,
            payload: null
        })
    );
};

  export const getDetallesLocal = (id) => async dispatch => {
    axios
    .get(`/api/routines/locales/${id}`)
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
/*
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
}  */

export const addLocal = (data, history) => dispatch => {
    axios
    .post("/api/routines/locales/newLocal", data)
    .then(res => {
        history.push(`/locales`)
        return res.data
    })
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    );
}

 export const newDetLocal = (data, history) => dispatch => {
    axios
    .put("/api/routines/locales/newdetlocal", data)
    .then(res => history.push(`/updateLocal/${res.data.data._id}`))
    .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          dispatch({
            type: GET_ERRORS,
            payload: error.response.data
          })
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
} 

export const updateLocal = (id, data, history) => dispatch => {
    axios
    .put(`/api/routines/locales/updateLocal/${id}`, data)
    .then(res => history.push(`/locales`))
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    );
}

export const setRutinaLoading = () => {
    return {
        type: RUTINAS_LOADING
    };
};