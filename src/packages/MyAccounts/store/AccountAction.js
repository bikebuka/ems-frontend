import call from "../../../core/services/http";
import {
    CUSTOMER_API_FAILED,
    CUSTOMER_API_REQUEST,
    CUSTOMER_API_SUCCESS,
    CUSTOMER_TRANSACTIONS_API_SUCCESS,
    TRANSACTION_API_FAILED,
    TRANSACTION_API_REQUEST,
    TRANSACTION_SEND_MONEY_API_SUCCESS,
    TRANSACTION_TOPUP_ACCOUNT_FAILED,
    TRANSACTION_TOPUP_ACCOUNT_REQUEST,
    TRANSACTION_TOPUP_ACCOUNT_SUCCESS
} from "./AccountActionTypes";
import AccountConstants from "./AccountConstants";
import {toast} from "react-toastify";
//
const notifyError = msg => {
    toast.error(msg)
}
const notifySuccess = msg => {
    toast.success(msg)
}
const notifyInfo = msg => {
    toast.info(msg)
}
const pagination={
    page: 1,
    page_size: 5
}
export const getCustomerAccounts= (payload) => async (dispatch) => {
    try {
        dispatch({
            type: CUSTOMER_API_REQUEST,
            loading: true,
        });
        const res = await call("get", AccountConstants.CUSTOMER_ACCOUNTS(payload));
        if (res.data.status) {
            dispatch({
                type: CUSTOMER_API_SUCCESS,
                payload: res.data,
                loading: false,
                message: res.data.message,
            });
        } else {
            dispatch({
                type: CUSTOMER_API_FAILED,
                payload: res.data,
                loading: false
            });
            notifyError(res.data.message)
        }
    } catch (err) {
        dispatch({
            type: CUSTOMER_API_FAILED,
            error: err.response.data,
            loading: false
        });
        notifyError(err.response.data.message)
    }
}
//transactions
export const getCustomerAccountTransactions= (payload) => async (dispatch) => {
    try {
        dispatch({
            type: CUSTOMER_API_REQUEST,
            loading: true,
        });
        const res = await call("get", AccountConstants.CUSTOMER_ACCOUNT_TRANSACTIONS(payload));
        if (res.data.status) {
            dispatch({
                type: CUSTOMER_TRANSACTIONS_API_SUCCESS,
                payload: res.data,
                loading: false,
                message: res.data.message,
            });
        } else {
            dispatch({
                type: CUSTOMER_API_FAILED,
                payload: res.data,
                loading: false
            });
            notifyError(res.data.message)
        }
    } catch (err) {
        dispatch({
            type: CUSTOMER_API_FAILED,
            error: err.response.data,
            loading: false
        });
        notifyError(err.response.data.message)
    }
}
//transactions
export const sendMoney= (payload) => async (dispatch) => {
    try {
        dispatch({
            type: TRANSACTION_API_REQUEST,
            processing: true,
        });
        const res = await call("post", AccountConstants.SEND_MONEY, payload);
        if (res.data.status) {
            dispatch({
                type: TRANSACTION_SEND_MONEY_API_SUCCESS,
                payload: res.data,
                processing: false,
                message: res.data.message,
            });
            notifySuccess(res.data.message)
            // setTimeout(() => {
            //     dispatch(getCustomerAccountTransactions(payload.ebiashiara_account_number))
            // }, 3000)
        } else {
            dispatch({
                type: TRANSACTION_API_FAILED,
                payload: res.data,
                processing: false,
                message: res.data.message,
            });
            notifyError(res.data.message)
        }
    } catch (err) {
        dispatch({
            type: TRANSACTION_API_FAILED,
            error: err.response.data,
            processing: false
        });
        notifyError(err.response.data.message)
    }
}
//top-up e-biashara account
export const topUpAccount= (payload) => async (dispatch) => {
    try {
        dispatch({
            type: TRANSACTION_TOPUP_ACCOUNT_REQUEST,
            processing: true,
        });
        const res = await call("post", AccountConstants.TOP_UP_ACCOUNT,payload);
        if (res.data.status) {
            dispatch({
                type: TRANSACTION_TOPUP_ACCOUNT_SUCCESS,
                payload: res.data,
                processing: false,
                message: res.data.message,
                is_sasapay: payload["network_code"] === "0"
            });
            notifySuccess(res.data.message)
            //is not sasapay
             if (payload["network_code"]!=="0") {
                 setTimeout(() => {
                     dispatch(getCustomerAccountTransactions(payload))
                 }, 3000)
             }
        } else {
            dispatch({
                type: TRANSACTION_TOPUP_ACCOUNT_FAILED,
                payload: res.data,
                processing: false,
                message: res.data.message,
            });
            notifyError(res.data.message)
        }
    } catch (err) {
        dispatch({
            type: TRANSACTION_TOPUP_ACCOUNT_FAILED,
            error: err.response.data,
            processing: false
        });
        notifyError(err.response.data.message)
    }

}
//top-up e-biashara account
export const processTopupPayment= (payload) => async (dispatch) => {
    try {
        dispatch({
            type: TRANSACTION_TOPUP_ACCOUNT_REQUEST,
            processing: true,
        });
        notifyInfo('Please Wait...')
        const res = await call("post", AccountConstants.PROCESS_PAYMENT,payload);
        if (res.data.status) {
            dispatch({
                type: TRANSACTION_TOPUP_ACCOUNT_SUCCESS,
                payload: res.data,
                processing: false,
                message: res.data.message,
                is_sasapay: false
            });
            notifySuccess(res.data.message)
            //is not sasapay
            if (payload?.is_view_page) {
                setTimeout(() => {
                    dispatch(getCustomerAccountTransactions(payload))
                }, 3000)
            }
            else{
                setTimeout(() => {
                    dispatch(getCustomerAccounts(pagination))
                }, 3000)
            }
        } else {
            dispatch({
                type: TRANSACTION_TOPUP_ACCOUNT_FAILED,
                payload: res.data,
                processing: false,
                message: res.data.message,
            });
            notifyError(res.data.message)
        }
    } catch (err) {
        dispatch({
            type: TRANSACTION_TOPUP_ACCOUNT_FAILED,
            error: err.response.data,
            processing: false
        });
        notifyError(err.response.data.message)
    }

}