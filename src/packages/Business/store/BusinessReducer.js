import {BUSINESS_API_FAILED, BUSINESS_API_REQUEST, BUSINESS_API_SUCCESS} from "./BusinessActionTypes";

let initialState={
    loading: false,
    businesses:[],
    error:{},
    message: "",
    pagination:{}
};
//
export default function BusinessReducer(state=initialState, action) {
    const { type, loading, payload,error,processing} = action;
    switch (type) {
        case BUSINESS_API_REQUEST:
            return {
                loading,
                processing
            }
        case BUSINESS_API_SUCCESS:
            return {
                loading,
                businesses: payload.data,
                pagination:payload
            }
        case BUSINESS_API_FAILED:
            return {
                loading,
                error,
                processing
            }
        default:
            return state
    }
}