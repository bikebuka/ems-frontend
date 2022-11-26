import Iconify from "../../../components/Iconify";
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export const DashboardLinks=[
    {
        title: 'Dashboard',
        path: '/dashboard/app',
        icon: getIcon('bxs:dashboard'),
    },
]
