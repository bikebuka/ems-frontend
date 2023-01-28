import {combineReducers} from "redux";
import DashboardReducer from "../../packages/Dashboard/store/DashboardReducer"
import AuthReducer from "../../packages/Auth/store/AuthReducer";
import EmployeeReducer from "../../packages/Employees/store/EmployeeReducer";
export default combineReducers({
    AuthReducer,
    DashboardReducer,
    EmployeeReducer,
})
