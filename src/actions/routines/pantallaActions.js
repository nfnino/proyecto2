import axios from "axios";
import {
    GET_ERRORS,
    GET_RUTINAS,
    GET_DETAILS,
    RUTINAS_LOADING
} from "../types";

export const getPantallas = () => dispatch => {
    console.log("actions pantallas")
    dispatch(setRutinaLoading());
    axios
    .get("/api/routines/pantallas/")
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

  export const getDetallesPantalla = (id) => async dispatch => {
    axios
    .get(`/api/routines/pantallas/${id}`)
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

export const addPantalla = (data, history) => dispatch => {
    axios
    .post("/api/routines/pantallas/newPantalla", data)
    .then(res => {
        history.push(`/pantallas`)
        return res.data
    })
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    );
}

 export const newDetPantalla = (data, history) => dispatch => {
    axios
    .put("/api/routines/pantallas/newdetpantalla", data)
    .then(res => history.push(`/updatePantalla/${res.data.data._id}`))
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

export const updatePantalla = (id, data, history) => dispatch => {
    axios
    .put(`/api/routines/pantallas/updatePantalla/${id}`, data)
    .then(res => history.push(`/pantallas`))
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