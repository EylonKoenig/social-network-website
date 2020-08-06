import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    ACCOUNT_DELETED,
    CLEAR_PROFILE
} from "./types";

export const getCurrentProfile = () => async dispatch => {
    try{
        const res = await axios.get('/api/profile/me');

        dispatch({
            type:GET_PROFILE,
            payload: res.data,
        });
    } catch(error){
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg : error.response.statusText, status: error.response.status}
        })
    }
};

export const createProfile = ( formData, edit = false ) => async dispatch => {
    try{

        const res = await axios.post('/api/profile', formData);

        dispatch({
            type:GET_PROFILE,
            payload: res.data
        });
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
    }catch(error){
        console.log(error);
        const errors = error.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload:{ msg : error.response.statusText, status: error.response.status}
        });

    }
};


export const addExperience = (formData, history) => async dispatch => {
    try{
        const res = await axios.put('/api/profile/experience', formData);

        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Experience Added', 'success'));
        history.push('/dashboard');
    }catch(error) {
        console.log(error);
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
};


export const addEducation = (formData,history) => async dispatch => {
    try{
        const res = await axios.put('/api/profile/education', formData);

        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data
        });
        history.push('/dashboard');
        dispatch(setAlert('Education Added', 'success'));
    }catch(error) {
        console.log(error);
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
};

export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Experience Removed', 'success'));
    } catch(error){
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
};


export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Education Removed', 'success'));
    } catch(error){
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
};

export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are you sure? This can NOT be undone!')){
        try {
            await axios.delete(`/api/profile`);

            dispatch({type: CLEAR_PROFILE});
            dispatch({type: ACCOUNT_DELETED});

            dispatch(setAlert('Your Account has been permanently deleted'));
        } catch(error){
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: error.response.statusText, status: error.response.status}
            })
        }
    }
};

