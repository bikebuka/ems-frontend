import {useRoutes} from 'react-router-dom';
// layouts
import {MyAccountRoutes} from "../packages/MyAccounts/routes/MyAccountRoutes";
import {AuthRoutes} from "../packages/Auth/routes/AuthRoutes";
import {DashboardRoutes} from "../packages/Dashboard/routes/DashboardRoutes";
import {ApplicationRoutes} from "../packages/Applications/routes/ApplicationRoutes";
import {SettingRoutes} from "../packages/settings/routes/SettingRoutes";

// ----------------------------------------------------------------------


let systemRoutes;
//add auth routes
systemRoutes=MyAccountRoutes
//transaction routes
systemRoutes.push(...AuthRoutes)
//add dashboard routes
systemRoutes.push(...DashboardRoutes)
//apps
systemRoutes.push(...ApplicationRoutes)
//setting routes
systemRoutes.push(...SettingRoutes)
//export
export default function Router() {
  
  return useRoutes(systemRoutes);
}
