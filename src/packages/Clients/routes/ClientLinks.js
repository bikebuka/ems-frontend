import Iconify from "../../../shared/components/Iconify";
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export const ClientLinks=[
    {
        title: 'Employees',
        path: '/admin/dashboard/employees',
        icon: getIcon('mdi:users-check'),
    },
]
