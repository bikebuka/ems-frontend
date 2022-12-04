import {
    API_ERROR,
    API_REQUEST,
    API_SUCCESS
} from "./DashboardActionTypes";
import call from "../../../core/services/http";
import DashboardConstants from "./DashboardConstants";
import AuthService from "../../../core/access-control/AuthService";

export const getProfile =  () => async (dispatch) => {
    try {
        dispatch({
            type: API_REQUEST,
            loading: true
        });
        const res = AuthService.user
        if (res) {
            dispatch({
                type: API_SUCCESS,
                payload: res.user,
                loading: false
            });
            dispatch({ type: 'set', profile: res.user })
        }
        else{
            dispatch({
                type: API_ERROR,
                payload: res,
                loading: false
            });
        }
    } catch (err) {
        dispatch({
            type: API_ERROR,
            error: {message: "could not fetch user profile"},
            loading: false
        });
    }
};
//stats
export const getStatistics =  () => async (dispatch) => {
    try {
        dispatch({
            type: API_REQUEST,
            loading: true
        });
        const res = await call("get",DashboardConstants.STATS);
        dispatch({
            type: API_SUCCESS,
            payload: res.data,
            loading: false
        });
    } catch (err) {
        dispatch({
            type: API_ERROR,
            error: err?.response?.data,
            loading: false
        });
    }
};
