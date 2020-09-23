import axios from "axios";
import {
    GET_TASK_AUDITS,
    TASK_AUDITS_LOADING
} from "../../actions/types";

export const getTaskAudits = () => dispatch => {
    dispatch(setTaskAuditsLoading());
    axios
    .get("api/audits/tasks")
    .then(res =>
        dispatch({
            type: GET_TASK_AUDITS,
            payload: res.data
        })
    )
    .catch(err =>
        dispatch({
            type: GET_TASK_AUDITS,
            payload: null
        })
    );
};

export const getTaskAudit = (assetData, history) => dispatch => {
    const id = assetData.id
    axios
    .get(`api/audits/tasks/${id}`)
    .catch(err => console.log(err));
}

export const setTaskAuditsLoading = () => {
    return {
        type: TASK_AUDITS_LOADING
    };
};