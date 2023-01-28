import {toast} from "react-toastify";
import {CLIENTS_API_FAILED, CLIENTS_API_REQUEST, CLIENTS_API_SUCCESS} from "./EmployeeActionTypes";
import ClientConstants from "./EmployeeConstants";
import call from "../../../core/services/http";
//
const notifyError = msg => {
    toast.error(msg)
}
/**
 * GET CLIENTS
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export const getClients= (payload) => async (dispatch) => {
    try {
        dispatch({
            type: CLIENTS_API_REQUEST,
            loading: true,
        });
        const res = await call("get", ClientConstants.CLIENTS(payload));
        if (res.data.status) {
            dispatch({
                type: CLIENTS_API_SUCCESS,
                payload: res.data,
                loading: false,
                message: res.data.message,
            });
        } else {
            dispatch({
                type: CLIENTS_API_FAILED,
                payload: res.data,
                loading: false
            });
            notifyError(res.data.message)
        }
    } catch (err) {
        dispatch({
            type: CLIENTS_API_FAILED,
            error: err.response.data,
            loading: false
        });
        notifyError(err.response.data.message)
    }
}
