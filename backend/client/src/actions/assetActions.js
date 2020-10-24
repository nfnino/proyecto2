import axios from "axios";
import {
    GET_ERRORS,
    GET_ASSETS,
    DELETE_ASSET,
    ASSETS_LOADING
} from "./types";

export const getAssets = () => dispatch => {
    dispatch(setAssetsLoading());
    axios
    .get("api/assets/assets")
    .then(res => {
        console.log(res.data)
        dispatch({
            type: GET_ASSETS,
            payload: res.data
        })
        }
    )
    .catch(err =>
        dispatch({
            type: GET_ASSETS,
            payload: null
        })
    );
};

export const nameAssets = (assetData, history) => dispatch => {
    dispatch(setAssetsLoading());
    let c = assetData.categoria
    let n = assetData.nombre
    if(c===""||c===null) {
        c = "[a-zA-Z0-9]"
    }
    if(n===""||n===null) {
        n = "[ a-zA-Z0-9]"
    }
    axios
    .get(`api/assets/assets/${c}/${n}`)
    .then(res =>
        dispatch({
            type: GET_ASSETS,
            payload: res.data
        })
    )
    .catch(err =>
        dispatch({
            type: GET_ASSETS,
            payload: null
        })
    );
};

export const addAsset = (fd, history) => dispatch => {
    axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
    axios({
        url: "api/assets/newAsset",
        method: 'POST',
        data: fd,
        headers: {
            Accept: 'application/JSON',
            'Content-Type': 'multipart/form-data'
        }
    }).catch(err => 
        dispatch({
         type: GET_ERRORS,
         payload: err.response.data
       })
    );
    
   /*  await axios.post("api/assets/newAsset", ad)
    .then(res => { return res.data._id;})
    .then(async (myres) => {
        console.log(myres)
        await axios.put(`api/assets/newAsset/${myres}`, assetData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(res => history.push("/assets"))
        .catch(err => 
            dispatch({
             type: GET_ERRORS,
             payload: err.response.data
           })
       );
    })
    .catch(err =>
        console.log(err)
   ); */
}

export const updateAsset = (assetData, history) => dispatch => {
    const id = assetData.id
    axios
    .put(`/api/assets/updateAsset/${id}`, assetData)
    .then(res => history.push("/assets"))
    .catch(err =>
         dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        }) 
    );
}

export const getAsset = (assetData, history) => dispatch => {
    const id = assetData.id
    axios
    .get(`api/assets/assets/${id}`)
    .catch(err => console.log(err));
}

export const deleteAsset = (assetData) => dispatch => {
    if (window.confirm("Confirmar para eliminar el activo")) {
        const id = assetData.id
        axios
        .delete(`api/assets/assets/${id}`)
        .then(res =>
        dispatch({
          type: DELETE_ASSET,
          payload: id
        })
      )
      .catch(err => console.log(err));
    }
}

export const updateImage = (id, assetData, history) => dispatch => {
    axios.put(`/api/assets/assetImage/${id}`, assetData, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
    .then(res => history.push("/assets"))
    .catch(err =>
         dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        }) 
    );
}

export const darBajaAsset = ((id, assetData, history) => dispatch => {
    if(window.confirm("Confirmar para solicitar eliminar el activo")) {
        axios
        .put(`/api/assets/req-delete/${id}`, assetData , {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(res => history.push("/assets"))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
    }
});

export const eliminarAsset = (( assetData, history) => dispatch => {
    if(window.confirm("Confirmar para dar de baja el activo")) {
        const id = assetData.id
        axios
        .put(`/api/assets/delete/${id}`, assetData)
        .then(res => history.push("/assets"))
    }
});

export const setAssetsLoading = () => {
    return {
        type: ASSETS_LOADING
    };
};