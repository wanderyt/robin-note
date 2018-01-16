import {
    LOG_IN,
    LOG_IN_ERROR,
    LOG_OUT,
    LOG_OUT_ERROR
} from '../actions';

const initialState = {
    user: {}
};

export function login(state = initialState, action) {
    switch (action.type) {
        case LOG_IN:
            return Object.assign({}, state, {
                user: {
                    loginStatus: true,
                    username: action.username
                }
            })
        case LOG_IN_ERROR:
            return Object.assign({}, state, {
                user: {
                    loginStatus: false,
                    error: 'Login Failed'
                }
            })
        default:
            return state;
    }
}