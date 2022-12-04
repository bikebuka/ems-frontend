import {
    API_ERROR,
    API_REQUEST,
    API_SUCCESS
} from "./DashboardActionTypes";

const initialState = {
    loading: false,
    error: {},
    status: false,
    sidebarShow: 'responsive',
    stats: {},
};
export default function dashboardReducer(state=initialState,action) {
    const { type, payload, loading, error,rest} = action;
    switch (type) {
        case API_REQUEST:
            return {
                loading
            }
        case API_SUCCESS:
            return {
                ...state,
                loading,
                stats:payload
            }
        case API_ERROR:
            return {
                error,
                loading
            }
        default:
            return state
    }
}
