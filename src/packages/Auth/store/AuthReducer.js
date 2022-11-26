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
    const {type,payload,message,verifyingOTP,verified,loading,error,submitting,set_password_page,hasSentOTP} = action;
    switch (type) {
        case AUTH_API_REQUEST:
            return {
                loading,
                submitting,
                verifyingOTP
            };
        case AUTH_API_SUCCESS:
            return {
                loading,
                payload,
                submitting,
                verified,
                message,
                hasSentOTP,
                verifyingOTP,
                set_password_page
            }
        case AUTH_API_FAILED:
            return {
                loading,
                submitting,
                error,
                verifyingOTP
            };
        default:
            return state
    }
}