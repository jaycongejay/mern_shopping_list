import axios from 'axios';
import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS, ITEMS_LOADING } from './types';


// ITEMS_LOADING, GET_ITEMS
export const getItems = () => dispatch => {

    dispatch(setItemLoading());
    axios.get('/api/items')
         .then(res => dispatch({
             type: GET_ITEMS,
             payload: res.data
         }));
};

// ADD_ITEMS
export const addItem = item => dispatch => {
    
    axios.post('/api/items', item)
         .then(res => dispatch({
             type: ADD_ITEMS,
             payload: res.data
         }))
};

// DELETE_ITEMS
export const deleteItem = id => dispatch => {
   
    axios.delete(`/api/items/${id}`)
         .then(res => dispatch({
            type: DELETE_ITEMS,
            payload: id
         }))
};

// ITEMS_LOADING
export const setItemLoading = () => {
    return {
        type: ITEMS_LOADING
    };
};