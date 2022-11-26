import {
    CUSTOMER_API_FAILED,
    CUSTOMER_API_REQUEST,
    CUSTOMER_API_SUCCESS,
    CUSTOMER_TRANSACTIONS_API_SUCCESS,
    TRANSACTION_TOPUP_ACCOUNT_FAILED,
    TRANSACTION_TOPUP_ACCOUNT_REQUEST,
    TRANSACTION_TOPUP_ACCOUNT_SUCCESS
} from "./AccountActionTypes";

let initialState={
    loading: false,
    customer_accounts:[],
    customer_account:{},
    transactions:[],
    error:{},
    message: "",
    processing: false,
    is_sasapay: false,
    payment_initiated: {},
    pagination:{}
};
export default function AccountReducer(state=initialState,action) {
    const { type, loading, payload,is_sasapay,error,processing,pagination} = action;
    switch (type) {
        case CUSTOMER_API_REQUEST:
            return {
                loading,
                processing
            }
        case CUSTOMER_API_SUCCESS:
            return {
                loading,
                customer_accounts: payload.data,
                pagination:payload
            }
        case CUSTOMER_TRANSACTIONS_API_SUCCESS:
            return {
                loading,
                transactions: payload.transactions.data,
                customer_account: payload.account,
                pagination: payload
            }
        case CUSTOMER_API_FAILED:
            return {
                loading,
                error,
                processing
            }
        case TRANSACTION_TOPUP_ACCOUNT_REQUEST:
            return {
                processing,
                is_sasapay,
            }
        case TRANSACTION_TOPUP_ACCOUNT_SUCCESS:
            return {
                processing,
                is_sasapay,
                payment_initiated: payload
            }
        case TRANSACTION_TOPUP_ACCOUNT_FAILED:
            return {
                processing,
                error,
                is_sasapay
            }
        default:
            return state
    }
}