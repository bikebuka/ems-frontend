import {
    SCOPES_API_FAILED,
    SCOPES_API_REQUEST, SCOPES_API_SUCCESS,
} from "./ApplicationActionType";

let initialState={
    loading: false,
    error:{},
    message: "",
    processing: false,
    scopes: []
};
export default function ApplicationScopeReducer(state=initialState, action) {
    const { type, loading, payload,error,message} = action;
    switch (type) {
        case SCOPES_API_REQUEST: {
            return {
                loading
            }
        }
        case SCOPES_API_SUCCESS: {
            return {
                loading,
                message,
                scopes: payload.scopes
            }
        }
        case SCOPES_API_FAILED: {
            return {
                loading,
                error
            }
        }
        default:
            return state
    }
}