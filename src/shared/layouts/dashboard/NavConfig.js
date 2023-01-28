// component
import {DashboardLinks} from "../../../packages/Dashboard/routes/DashboardLinks";
import {ClientLinks} from "../../../packages/Clients/routes/ClientLinks";
// ----------------------------------------------------------------------
let navConfig=[];
//dashboard
navConfig.push(...DashboardLinks)
//account links
navConfig.push(...ClientLinks)
//applications
// navConfig.push(...BusinessLinks)
//settings
// navConfig.push(...SettingLinks)

export default navConfig;
