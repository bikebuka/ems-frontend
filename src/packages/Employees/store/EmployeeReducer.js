import {CLIENTS_API_FAILED, CLIENTS_API_REQUEST, CLIENTS_API_SUCCESS} from "./EmployeeActionTypes";

let initialState={
    loading: false,
    clients:[],
    error:{},
    message: "",
    pagination:{}
};
export default function EmployeeReducer(state=initialState, action) {
    const { type, loading, payload,error,processing} = action;
    switch (type) {
        case CLIENTS_API_REQUEST:
            return {
                loading,
                processing
            }
        case CLIENTS_API_SUCCESS:
            return {
                loading,
                customer_accounts: payload.data,
                pagination:payload
            }
        case CLIENTS_API_FAILED:
            return {
                loading,
                error,
                processing
            }
        default:
            return state
    }
}
