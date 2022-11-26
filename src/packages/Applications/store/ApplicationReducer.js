import {
    APPLICATIONS_API_FAILED,
    APPLICATIONS_API_REQUEST,
    APPLICATIONS_API_SUCCESS,
    APPLICATIONS_SET_API_FAILED,
    APPLICATIONS_SET_API_REQUEST,
    APPLICATIONS_SET_API_SUCCESS,
} from "./ApplicationActionType";

let initialState={
    loading: false,
    customer_accounts:[],
    applications:[],
    application:{},
    transactions:[],
    error:{},
    status: false,
    message: "",
    processing: false,
    otp_sent:false,
};
export default function ApplicationReducer(state=initialState, action) {
    const { type, loading, status,otp_sent,payload,error,processing,message} = action;
    switch (type) {
        case APPLICATIONS_API_REQUEST:
            return {
                loading,
                processing
            }
        case APPLICATIONS_SET_API_REQUEST: {
            return {
                loading,
                processing
            }
        }
        case APPLICATIONS_API_SUCCESS:
            return {
                loading,
                status,
                customer_accounts: payload.data,
                applications: payload.data,
                application: payload.data
            }
        case APPLICATIONS_SET_API_SUCCESS:
            return {
                loading,
                processing,
                status,
                otp_sent,
                message
            }
        case APPLICATIONS_API_FAILED:
            return {
                loading,
                error
            }
        case APPLICATIONS_SET_API_FAILED:
            return {
                loading,
                processing,
                error
            }
        default:
            return state
    }
}