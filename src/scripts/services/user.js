import {SERVER_LATENCY} from './constant';

export const loginService = ({
    username,
    password
}) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                username,
                status: 'success'
            })
        }, SERVER_LATENCY);
    });
}

export const logoutService = ({
    username
}) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                username,
                status: 'success'
            })
        }, SERVER_LATENCY);
    });
}