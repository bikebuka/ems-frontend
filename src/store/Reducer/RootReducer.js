import {combineReducers} from "redux";
import DashboardReducer from "../../packages/Dashboard/store/DashboardReducer"
import AuthReducer from "../../packages/Auth/store/AuthReducer";
import AccountReducer from "../../packages/MyAccounts/store/AccountReducer";
import AccountTransactionReducer from "../../packages/MyAccounts/store/AccountTransactionReducer";
import ApplicationReducer from "../../packages/Applications/store/ApplicationReducer";
import dashboardStatsReducer from "../../packages/Dashboard/store/DashboardStatsReducer";
import ApplicationScopeReducer from "../../packages/Applications/store/ApplicationScopeReducer";
export default combineReducers({
    AuthReducer,
    DashboardReducer,
    AccountReducer,
    AccountTransactionReducer,
    ApplicationReducer,
    dashboardStatsReducer,
    ApplicationScopeReducer
})
