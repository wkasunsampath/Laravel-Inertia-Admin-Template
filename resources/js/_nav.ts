export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: 'dashboard', //Route name
    icon: 'cil-speedometer',
    badge: {
      color: 'primary',
      text: 'NEW',
    },
  },
  {
    component: 'CNavTitle',
    name: 'Settings',
  },
  {
    component: 'CNavGroup',
    name: 'Account',
    to: '',
    icon: 'cil-puzzle',
    items: [
      {
        component: 'CNavItem',
        name: 'Profile',
        to: 'profile.edit',
      },
    ],
  },
]
