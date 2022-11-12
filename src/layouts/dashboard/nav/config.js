// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Business Permit',
    path: '/business_permit/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Department',
    path: '/dashboard/departments',
    icon: icon('ic_user'),
  },

  {
    title: 'Add Roles',
    path: '/dashboard/roles',
    icon: icon('ic_user'),
  },
  
  
  {
    title: 'Add User',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },

  {
    title: 'Chart of Accounts',
    path: '/dashboard/chart-of-accounts',
    icon: icon('ic_user'),
  },
  // {
  //   title: 'Login',
  //   path: '/login',
  //   icon: icon('ic_user'),
  // },
 
 
];

export default navConfig;
