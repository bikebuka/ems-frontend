import Iconify from "../../../components/Iconify";
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export const SettingLinks=[
    {
        title: 'Settings',
        path: '/dashboard/settings/profile',
        icon: getIcon('bxs:cog'),
    },
]
