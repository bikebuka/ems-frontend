import {useRoutes} from 'react-router-dom';
// layouts
import {ClientRoutes} from "../packages/Clients/routes/ClientRoutes";
import {AuthRoutes} from "../packages/Auth/routes/AuthRoutes";
import {DashboardRoutes} from "../packages/Dashboard/routes/DashboardRoutes";
import {SettingRoutes} from "../packages/settings/routes/SettingRoutes";
import {BusinessRoutes} from "../packages/Business/routes/BusinessRoutes";

// ----------------------------------------------------------------------


let systemRoutes;
//add auth routes
systemRoutes=ClientRoutes
//transaction routes
systemRoutes.push(...AuthRoutes)
//add dashboard routes
systemRoutes.push(...DashboardRoutes)
//apps
systemRoutes.push(...BusinessRoutes)
//setting routes
systemRoutes.push(...SettingRoutes)
//export
export default function Router() {
  
  return useRoutes(systemRoutes);
}
