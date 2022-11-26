import {
    TRANSACTION_API_FAILED,
    TRANSACTION_API_REQUEST, TRANSACTION_SEND_MONEY_API_SUCCESS,

} from "./AccountActionTypes";

let initialState={
    loading: false,
    error:{},
    message: "",
    processing: false,
};
export default function AccountTransactionReducer(state=initialState,action) {
    const { type, loading,error,processing,message} = action;
    switch (type) {
        case TRANSACTION_API_REQUEST:
            return {
                loading,
                processing
            }
        case TRANSACTION_SEND_MONEY_API_SUCCESS:
            return {
                loading,
                processing,
                message
            }
        case TRANSACTION_API_FAILED:
            return {
                loading,
                error,
                processing,
                message
            }
        default:
            return state
    }
}