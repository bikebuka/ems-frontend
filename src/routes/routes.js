import {useRoutes} from 'react-router-dom';
// layouts
import {EmployeeRoutes} from "../packages/Employees/routes/EmployeeRoutes";
import {AuthRoutes} from "../packages/Auth/routes/AuthRoutes";
import {DashboardRoutes} from "../packages/Dashboard/routes/DashboardRoutes";

// ----------------------------------------------------------------------


let systemRoutes;
//add auth routes
systemRoutes=EmployeeRoutes
//transaction routes
systemRoutes.push(...AuthRoutes)
//add dashboard routes
systemRoutes.push(...DashboardRoutes)
//apps
//export
export default function Router() {
  
  return useRoutes(systemRoutes);
}
