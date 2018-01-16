import {loginService, logoutService} from '../services/user';

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const LOG_IN_ERROR = 'LOG_IN_ERROR';
export const LOG_OUT_ERROR = 'LOG_OUT_ERROR';

export const login = ({
    username,
    password
}) => (dispatch) => {
    loginService({
        username,
        password
    }).then((data) => {
        dispatch({
            type: LOG_IN,
            username
        });
    }, (err) => {
        dispatch({
            type: LOG_IN_ERROR
        });
    });
}

export const logout = ({
    username,
    password
}) => (dispatch) => {
    logoutService({
        username
    }).then((data) => {
        dispatch({
            type: LOG_OUT,
            username
        });
    }, (err) => {
        dispatch({
            type: LOG_OUT_ERROR
        });
    });
}