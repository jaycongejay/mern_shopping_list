import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS, EDIT_ITEMS, ITEMS_LOADING } from '../actions/types';

const initialState = {
    items: [],
    loading: false,
    msg: null
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
        case EDIT_ITEMS:
            return {
                ...state,
                msg: action.payload
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