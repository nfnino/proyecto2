import axios from "axios";
import {
    GET_USER_AUDITS,
    USER_AUDITS_LOADING
} from "../../actions/types";

export const getUserAudits = () => dispatch => {
    dispatch(setUserAuditsLoading());
    axios
    .get("api/audits/users")
    .then(res =>
        dispatch({
            type: GET_USER_AUDITS,
            payload: res.data
        })
    )
    .catch(err =>
        dispatch({
            type: GET_USER_AUDITS,
            payload: null
        })
    );
};

export const getUserAudit = (assetData, history) => dispatch => {
    const id = assetData.id
    axios
    .get(`api/audits/users/${id}`)
    .catch(err => console.log(err));
}

export const setUserAuditsLoading = () => {
    return {
        type: USER_AUDITS_LOADING
    };
};