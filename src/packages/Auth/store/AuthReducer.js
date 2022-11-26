import {AUTH_API_FAILED, AUTH_API_REQUEST, AUTH_API_SUCCESS} from "./AuthActionTypes";

const initialState={
    loading: false,
    submitting: false,
    error: {},
    hasSentOTP:false,
    verifyingOTP:false,
    set_password_page: false,
    verified:false,
}
export default function AuthReducer(state=initialState,action){
    const {type,payload,message,loading,error,submitting} = action;
    switch (type) {
        case AUTH_API_REQUEST:
            return {
                loading,
                submitting,
            };
        case AUTH_API_SUCCESS:
            return {
                loading,
                payload,
                submitting,
                message,
            }
        case AUTH_API_FAILED:
            return {
                loading,
                submitting,
                error,
            };
        default:
            return state
    }
}
