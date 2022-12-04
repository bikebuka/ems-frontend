import {combineReducers} from "redux";
import DashboardReducer from "../../packages/Dashboard/store/DashboardReducer"
import AuthReducer from "../../packages/Auth/store/AuthReducer";
import ClientReducer from "../../packages/Clients/store/ClientReducer";
import BusinessReducer from "../../packages/Business/store/BusinessReducer";
export default combineReducers({
    AuthReducer,
    DashboardReducer,
    ClientReducer,
    BusinessReducer,
})
