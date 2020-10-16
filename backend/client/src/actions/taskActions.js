import axios from "axios";
import {
    GET_ERRORS,
    GET_TASKS,
    TASKS_LOADING
} from "./types";

export const getTasks = () => dispatch => {
    dispatch(setTasksLoading());
    axios
    .get("/api/tasks/tasks")
    .then(res =>
        dispatch({
            type: GET_TASKS,
            payload: res.data
        })
    )
    .catch(err =>
        dispatch({
            type: GET_TASKS,
            payload: null
        })
    );
};

export const nameTasks = (taskData, history) => dispatch => {
    dispatch(setTasksLoading());
    let a = taskData.activo
    let t = taskData.tipo
    let d = taskData.descripcion
    if(a===""||a===null) {
        a = "[a-zA-Z ]"
    }
    if(t===""||t===null) {
        t = "[a-zA-Z ]"
    }
    if(d===""||d===null) {
        d = "[a-zA-Z ]"
    }
    axios
    .get(`api/tasks/tasks/${a}/${t}/${d}`)
    .then(res =>
        dispatch({
            type: GET_TASKS,
            payload: res.data
        })
    )
    .catch(err =>
        dispatch({
            type: GET_TASKS,
            payload: null
        })
    );
};

export const addTask = (taskData, history) => dispatch => {
    axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
    axios({
        url: "api/tasks/newTask",
        method: 'POST',
        data: taskData,
        headers: {
            Accept: 'application/JSON',
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(res => history.push("/dashboard"))
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    );
}

export const darBajaTask = (taskData => dispatch => {
    if(window.confirm("¿Desea terminar esta actividad?")) {
        console.log(taskData)
        const id = taskData.id
        const estado = taskData.estado
        axios
        .put(`api/tasks/tasks/${id}/${estado}`, taskData)
    }
});

export const updateImage = (id, date, taskData) => dispatch => {
    axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
    axios.put(`/api/tasks/taskImage/${id}/${date}`, taskData)
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    );
}

export const editTask = (taskData, history) => dispatch => {
    const id = taskData.id;
    axios.put(`/api/tasks/update/${id}`, taskData)
    .then(res => {
        history.push("/tasks")
    })
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    );
}

export const setTasksLoading = () => {
    return {
        type: TASKS_LOADING
    };
};