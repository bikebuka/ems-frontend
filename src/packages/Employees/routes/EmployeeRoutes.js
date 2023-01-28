import Clients from "../view/Clients";
import DashboardLayout from "../../../shared/layouts/dashboard";
import EmployeeCard from "../components/EmployeeCard";

export const EmployeeRoutes =[
    {
        path: '/admin/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                path:"employees",
                element: <Clients/>
            },
            {
                path:"employees/card",
                element: <EmployeeCard/>
            },
        ]
    },
];
