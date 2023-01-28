import Clients from "../view/Clients";
import DashboardLayout from "../../../shared/layouts/dashboard";
import ClientCard from "../components/ClientCard";

export const ClientRoutes =[
    {
        path: '/admin/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                path:"/admin/dashboard/employees",
                element: <Clients/>
            },
            {
                path:"/admin/dashboard/clients/card",
                element: <ClientCard/>
            },
        ]
    },
];
