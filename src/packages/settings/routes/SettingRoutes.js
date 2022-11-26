import DashboardLayout from "../../../shared/layouts/dashboard";
import {ProtectedRoute} from "../../../shared/protected";
import Account from "../view/Account";

export const SettingRoutes =[
    {
        path: '/dashboard',
        element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
        children: [
            {
                path:"/dashboard/settings/profile",
                element: <Account/>
            },
        ]
    },
];