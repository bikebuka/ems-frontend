import call from "../../../core/services/http";
import {
    APPLICATIONS_API_FAILED,
    APPLICATIONS_API_REQUEST,
    APPLICATIONS_API_SUCCESS,
    APPLICATIONS_SET_API_FAILED,
    APPLICATIONS_SET_API_REQUEST,
    APPLICATIONS_SET_API_SUCCESS, SCOPES_API_FAILED,
    SCOPES_API_REQUEST, SCOPES_API_SUCCESS,
} from "./ApplicationActionType";
import {toast} from "react-toastify";
import ApplicationConstants from "./ApplicationConstants";
//
const notifyError = msg => {
    toast.error(msg)
}
const notifySuccess = msg => {
    toast.success(msg)
}
//
export const getApplications= () => async (dispatch) => {
    try {
        dispatch({
            type: APPLICATIONS_API_REQUEST,
            loading: true,
        });
        const res = await call("get", ApplicationConstants.APPLICATIONS);
        if (res.data.status) {
            dispatch({
                type: APPLICATIONS_API_SUCCESS,
                payload: res.data,
                loading: false,
                status: res.data.status,
                message: res.data.message,
            });
        } else {
            dispatch({
                type: APPLICATIONS_API_FAILED,
                payload: res.data,
                loading: false
            });
            notifyError(res.data.message)
        }
    } catch (err) {
        dispatch({
            type: APPLICATIONS_API_FAILED,
            error: err.response.data,
            loading: false
        });
        notifyError(err.response.data.message)
    }
}
//
export const getApplication= (payload) => async (dispatch) => {
    try {
        dispatch({
            type: APPLICATIONS_API_REQUEST,
            loading: true,
        });
        const res = await call("get", ApplicationConstants.APPLICATION(payload));
        if (res.data.status) {
            dispatch({
                type: APPLICATIONS_API_SUCCESS,
                payload: res.data,
                loading: false,
                status: res.data.status,
                message: res.data.message,
            });
        } else {
            dispatch({
                type: APPLICATIONS_API_FAILED,
                payload: res.data,
                loading: false
            });
            notifyError(res.data.message)
        }
    } catch (err) {
        dispatch({
            type: APPLICATIONS_API_FAILED,
            error: err.response.data,
            loading: false
        });
        notifyError(err.response.data.message)
    }
}
//application scopes
export const getScopes= () => async (dispatch) => {
    try {
        dispatch({
            type: SCOPES_API_REQUEST,
            loading: true,
        });
        const res = await call("get", ApplicationConstants.SCOPES);
        if (res.data.status) {
            dispatch({
                type: SCOPES_API_SUCCESS,
                payload: res.data,
                loading: false,
                message: res.data.message,
            });
        } else {
            dispatch({
                type: SCOPES_API_FAILED,
                payload: res.data,
                loading: false
            });
            notifyError(res.data.message)
        }
    } catch (err) {
        dispatch({
            type: SCOPES_API_FAILED,
            error: err.response.data,
            loading: false
        });
        notifyError(err.response.data.message)
    }
}
//add new
export const createApplication= (payload) => async (dispatch) => {
    try {
        dispatch({
            type: APPLICATIONS_SET_API_REQUEST,
            processing: true,
            otp_sent:false
        });
        const res = await call("post", ApplicationConstants.ADD_APPLICATIONS,payload);
        if (res.data.status) {
            dispatch({
                type: APPLICATIONS_SET_API_SUCCESS,
                payload: res.data,
                processing: false,
                message: res.data.message,
                status: res.data.status,
                otp_sent:true
            });
            if (payload.environment==='sandbox') {
                notifySuccess(res.data.message)
                setTimeout(()=> {
                    dispatch(getApplications())
                },3000)
            }
        } else {
            dispatch({
                type: APPLICATIONS_SET_API_FAILED,
                payload: res.data,
                processing: false
            });
            notifyError(res.data.message)
            setTimeout(()=> {
                dispatch(getApplications())
            },2000)
        }
    } catch (err) {
        dispatch({
            type: APPLICATIONS_SET_API_FAILED,
            error: err.response.data,
            loading: false
        });
        notifyError(err.response.data.message)
        setTimeout(()=> {
            dispatch(getApplications())
        },2000)
    }
}
//add new
export const confirmApplication= (payload) => async (dispatch) => {
    try {
        dispatch({
            type: APPLICATIONS_SET_API_REQUEST,
            processing: true,
            otp_sent:false
        });
        const res = await call("post", ApplicationConstants.CONFIRM_APPLICATIONS,payload);
        if (res.data.status) {
            dispatch({
                type: APPLICATIONS_SET_API_SUCCESS,
                payload: res.data,
                processing: false,
                message: res.data.message,
                status: res.data.status,
                otp_sent:false
            });
            notifySuccess(res.data.message)
            setTimeout(()=> {
                dispatch(getApplications())
            },3000)
        } else {
            dispatch({
                type: APPLICATIONS_SET_API_FAILED,
                payload: res.data,
                processing: false
            });
            notifyError(res.data.message)
            setTimeout(()=> {
                dispatch(getApplications())
            },2000)
        }
    } catch (err) {
        dispatch({
            type: APPLICATIONS_SET_API_FAILED,
            error: err.response.data,
            loading: false
        });
        notifyError(err.response.data.message)
        setTimeout(()=> {
            dispatch(getApplications())
        },2000)
    }
}