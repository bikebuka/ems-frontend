import CustomerAccounts from "../view/CustomerAccounts";
import DashboardLayout from "../../../shared/layouts/dashboard";
import AccountTransactions from "../components/AccountTransactions";
import {ProtectedRoute} from "../../../shared/protected";
import SendMoney from "../components/SendMoney";

export const MyAccountRoutes =[
    {
        path: '/dashboard',
        element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
        children: [
            {
                path:"/dashboard/my-accounts",
                element: <CustomerAccounts/>
            },
            {
                path:"/dashboard/my-accounts/transactions/:code",
                element: <AccountTransactions/>
            },
            {
                path:"/dashboard/my-accounts/transactions/:code/send-money",
                element: <SendMoney/>
            },
        ]
    },
];