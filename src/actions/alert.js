import {v4 as randomID } from 'uuid';
import {SET_ALERT,REMOVE_ALERT} from "./types";

export const setAlert = (msg,alertType,timeout = 5000) => dispatch =>  {
    const id = randomID();
    dispatch({
        type:SET_ALERT,
        payload:{msg,alertType,id}
    });

    setTimeout(() => dispatch({type : REMOVE_ALERT , payload: id}), timeout);
};