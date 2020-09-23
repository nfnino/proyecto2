import axios from "axios";
import {
    GET_ERRORS,
    GET_PARKINGS,
    PARKINGS_LOADING
} from "../types";

export const getParkings = () => dispatch => {
    dispatch(setParkingLoading());
    axios
    .get("/api/routines/parkings/")
    .then(res =>
        dispatch({
            type: GET_PARKINGS,
            payload: res.data
        })
    )
    .catch(err =>
        dispatch({
            type: GET_PARKINGS,
            payload: null
        })
    );
};

export const getParking = () => dispatch => {
    dispatch(setParkingLoading());
    axios
    .get("/api/routines/parkings/:id")
    .then(res =>
        dispatch({
            type: GET_PARKINGS,
            payload: res.data
        })
    )
    .catch(err =>
        dispatch({
            type: GET_PARKINGS,
            payload: null
        })
    );
};

export const addParking = (bathData, history) => dispatch => {
    axios
    .post("/api/routines/parkings/newParking", bathData)
    .then(res => history.push("/parkings"))
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    );
}

export const setParkingLoading = () => {
    return {
        type: PARKINGS_LOADING
    };
};