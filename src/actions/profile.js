import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE
} from "./types";

export const getCurrentProfile = () => async dispath => {
    try{
        const res = await axios.get('/api/profile/me');

        dispath({
            type:GET_PROFILE,
            payload: res.data,
        });
    } catch(error){
        dispath({
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