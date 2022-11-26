import {toast} from "react-toastify";
import call from "../../../core/services/http";
import {BUSINESS_API_FAILED, BUSINESS_API_REQUEST, BUSINESS_API_SUCCESS} from "./BusinessActionTypes";
import BusinessConstants from "./BusinessConstants";
//
const notifyError = msg => {
    toast.error(msg)
}
/**
 * GET CLIENTS
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export const getBusinesses= (payload) => async (dispatch) => {
    try {
        dispatch({
            type: BUSINESS_API_REQUEST,
            loading: true,
        });
        const res = await call("get", BusinessConstants.BUSINESSES(payload));
        if (res.data.status) {
            dispatch({
                type: BUSINESS_API_SUCCESS,
                payload: res.data,
                loading: false,
                message: res.data.message,
            });
        } else {
            dispatch({
                type: BUSINESS_API_FAILED,
                payload: res.data,
                loading: false
            });
            notifyError(res.data.message)
        }
    } catch (err) {
        dispatch({
            type: BUSINESS_API_FAILED,
            error: err.response.data,
            loading: false
        });
        notifyError(err.response.data.message)
    }
}