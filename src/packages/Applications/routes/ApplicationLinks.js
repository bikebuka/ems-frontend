import Iconify from "../../../shared/components/Iconify";
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export const ApplicationLinks=[
    {
        title: 'My Applications',
        path: '/dashboard/applications',
        icon: getIcon('cil:apps'),
    },
]
