import Applications from "../view/Applications";
import DashboardLayout from "../../../shared/layouts/dashboard";
import ApplicationCard from "../components/ApplicationCard";
import {ProtectedRoute} from "../../../shared/protected";

export const ApplicationRoutes =[
    {
        path: '/dashboard',
        element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
        children: [
            // {
            //     path:"/dashboard/applications",
            //     element: <Applications/>
            // },
            {
                path:"/dashboard/applications",
                element: <ApplicationCard/>
            },
            {
                path:"/dashboard/applications/card/:code",
                element: <ApplicationCard/>
            },
        ]
    },
];