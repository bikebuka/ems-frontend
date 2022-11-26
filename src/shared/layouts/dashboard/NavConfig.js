// component
import {DashboardLinks} from "../../../packages/Dashboard/routes/DashboardLinks";
import {MyAccountLinks} from "../../../packages/MyAccounts/routes/MyAccountLinks";
import {ApplicationLinks} from "../../../packages/Applications/routes/ApplicationLinks";
import {SettingLinks} from "../../../packages/settings/routes/SettingLinks";

// ----------------------------------------------------------------------
let navConfig=[];
//dashboard
navConfig.push(...DashboardLinks)
//account links
navConfig.push(...MyAccountLinks)
//applications
navConfig.push(...ApplicationLinks)
//settings
navConfig.push(...SettingLinks)

export default navConfig;
