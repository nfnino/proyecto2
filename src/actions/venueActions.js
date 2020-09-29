import axios from "axios";
import {
    GET_ERRORS,
    GET_VENUES,
    DELETE_VENUE
} from "./types";

export const getVenues = () => dispatch => {
    axios
    .get("api/venues/venues")
    .then(res =>
        dispatch({
            type: GET_VENUES,
            payload: res.data
        })
    )
    .catch(err =>
        dispatch({
            type: GET_VENUES,
            payload: null
        })
    );
};

export const deleteVenue = (venueData) => dispatch => {
    if (window.confirm("Confirmar para eliminar el recinto")) {
        const id = venueData.id
        axios
        .delete(`api/venues/venues/${id}`)
        .then(res =>
        dispatch({
          type: DELETE_VENUE,
          payload: id
        })
      )
      .catch(err => console.log(err));
    }
}

export const addVenue = (venueData, history) => dispatch => {
    axios
      .post("api/venues/newVenue", venueData)
      .then(res => history.push("/venues")) 
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
