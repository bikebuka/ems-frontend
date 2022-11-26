import Iconify from "../../../shared/components/Iconify";
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export const MyAccountLinks=[
    {
        title: 'My Accounts',
        path: '/dashboard/my-accounts',
        icon: getIcon('bxs:user'),
    },
]
