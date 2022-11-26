import DashboardLayout from "../../../shared/layouts/dashboard";
import DashboardApp from "../view/DashboardApp";
import LogoOnlyLayout from "../../../shared/layouts/LogoOnlyLayout";
import {Navigate} from "react-router-dom";
import {ProtectedRoute} from "../../../shared/protected";
import Page404 from "../../../shared/components/NotFound/Page404";

export const DashboardRoutes =[
    {
        path: '/',
        element: <LogoOnlyLayout />,
        children: [
            { path: '/', element: <Navigate to="/dashboard/app" /> },
            { path: '404', element: <Page404/> },
            { path: '*', element: <Navigate to="/404" /> },
        ],
    },
    {
        path: '/dashboard',
        element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
        children: [
            { path: 'app', element: <DashboardApp /> },
        ],
    },
];