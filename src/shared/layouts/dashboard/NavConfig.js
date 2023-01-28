// component
import {DashboardLinks} from "../../../packages/Dashboard/routes/DashboardLinks";
import {EmployeeLinks} from "../../../packages/Employees/routes/EmployeeLinks";
// ----------------------------------------------------------------------
let navConfig=[];
//dashboard
navConfig.push(...DashboardLinks)
//account links
navConfig.push(...EmployeeLinks)
//applications
// navConfig.push(...BusinessLinks)
//settings
// navConfig.push(...SettingLinks)

export default navConfig;
