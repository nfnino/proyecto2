import axios from "axios";
import {
    GET_ASSET_AUDITS,
    ASSET_AUDITS_LOADING
} from "../../actions/types";

export const getAssetAudits = () => dispatch => {
    dispatch(setAssetAuditsLoading());
    axios
    .get("api/audits/assets")
    .then(res => {
        dispatch({
            type: GET_ASSET_AUDITS,
            payload: res.data
        })}
    )
    .catch(err =>
        dispatch({
            type: GET_ASSET_AUDITS,
            payload: null
        })
    );
};

export const getAssetAudit = (assetData, history) => dispatch => {
    const id = assetData.id
    axios
    .get(`api/audits/assets/${id}`)
    .catch(err => console.log(err));
}

export const setAssetAuditsLoading = () => {
    return {
        type: ASSET_AUDITS_LOADING
    };
};