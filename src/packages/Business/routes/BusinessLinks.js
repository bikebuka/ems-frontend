import Iconify from "../../../shared/components/Iconify";
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export const BusinessLinks=[
    {
        title: 'Properties',
        path: '/admin/dashboard/business',
        icon: getIcon('material-symbols:add-business'),
    },
]
