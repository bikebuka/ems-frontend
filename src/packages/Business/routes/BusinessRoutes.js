import {ProtectedRoute} from "../../../shared/protected";
import DashboardLayout from "../../../shared/layouts/dashboard";
import Business from "../view/Business";
import BusinessCard from "../components/BusinessCard";

export const BusinessRoutes =[
    {
        path: '/admin/dashboard',
        element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
        children: [
            {
                path:"/admin/dashboard/business",
                element: <Business/>
            },
            {
                path:"/admin/dashboard/business/card",
                element: <BusinessCard/>
            },
        ]
    },
];