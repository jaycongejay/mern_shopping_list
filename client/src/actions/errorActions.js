import { GET_ERRORS, CLEAR_ERRORS } from './types';


// Return Errors
export const returnErrors = (msg, status, id = null) => {

    return {
        type: GET_ERRORS,
        msg : msg,
        status : status,
        id : id
        // paylaod: { msg, status, id }  !!Not working!!
    };
};

// Clear Errors
export const clearErrors = () => {

    return {
        type: CLEAR_ERRORS
    };
};