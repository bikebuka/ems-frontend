import {
    API_STATS_ERROR,
    API_STATS_REQUEST,
    API_STATS_SUCCESS,
} from "./DashboardActionTypes";

const initialState = {
    loading: false,
    error: {},
    status: false,
    statistics:{}
};
export default function dashboardStatsReducer(state=initialState,action) {
    const { type, payload, loading, error,rest} = action;
    switch (type) {
        case 'set':
            return { ...state, ...rest }
        case API_STATS_REQUEST:
            return {
                loading
            }
        case API_STATS_SUCCESS:
            return {
                ...state,
                loading,
                statistics:payload
            }
        case API_STATS_ERROR:
            return {
                error,
                loading
            }
        default:
            return state
    }
}
