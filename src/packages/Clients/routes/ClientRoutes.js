import Clients from "../view/Clients";
import DashboardLayout from "../../../shared/layouts/dashboard";
import {ProtectedRoute} from "../../../shared/protected";
import ClientCard from "../components/ClientCard";

export const ClientRoutes =[
    {
        path: '/admin/dashboard',
        element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
        children: [
            {
                path:"/admin/dashboard/clients",
                element: <Clients/>
            },
            {
                path:"/admin/dashboard/clients/card",
                element: <ClientCard/>
            },
        ]
    },
];