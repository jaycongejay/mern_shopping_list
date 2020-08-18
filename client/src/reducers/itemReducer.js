import { v4 as uuidv4 } from 'uuid';
import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS, ITEMS_LOADING } from '../actions/types';

const initialState = {
    items: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                laoding: false
            };
        case DELETE_ITEMS:
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            };
        case ADD_ITEMS:
            return {
                ...state,
                items: [...state.items, action.payload]
            };
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}