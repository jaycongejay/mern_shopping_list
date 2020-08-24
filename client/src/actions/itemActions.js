import axios from 'axios';
import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS, EDIT_ITEMS, ITEMS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

// ITEMS_LOADING, GET_ITEMS
export const getItems = () => dispatch => {

    dispatch(setItemLoading());
    axios.get('/api/items')
         .then(res => dispatch({
             type: GET_ITEMS,
             payload: res.data
         }))
         .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

// ADD_ITEMS
export const addItem = item => (dispatch, getState) => {
    
    axios.post('/api/items', item, tokenConfig(getState))
         .then(res => dispatch({
             type: ADD_ITEMS,
             payload: res.data
         }))
         .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

// DELETE_ITEMS
export const deleteItem = id => (dispatch, getState) => {
   
    axios.delete(`/api/items/${id}`, tokenConfig(getState))
         .then(res => dispatch({
            type: DELETE_ITEMS,
            payload: id
         }))
         .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

// EDIT_ITEMS
export const editItem = (id, edit_name) => (dispatch, getState) => {
   
    axios.post(`/api/items/${id}`, edit_name, tokenConfig(getState))
         .then(res => dispatch({
            type: EDIT_ITEMS,
            payload: res.data
         }))
         .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

// ITEMS_LOADING
export const setItemLoading = () => {
    return {
        type: ITEMS_LOADING
    };
};