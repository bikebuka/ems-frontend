import DashboardLayout from "../../../shared/layouts/dashboard";
import DashboardApp from "../view/DashboardApp";
import LogoOnlyLayout from "../../../shared/layouts/LogoOnlyLayout";
import {Navigate} from "react-router-dom";
import Page404 from "../../NotFound/Page404";
import {ProtectedRoute} from "../../../shared/protected";

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