import { FuseNavigationItem } from '@Components/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
  {
    id: 'dashboards',
    title: 'Dashboards',
    type: 'group',
    icon: 'heroicons_outline:home',
    children: [
      {
        id: 'dashboards.Dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:clipboard-check',
        link: '/dashboard',
      },
    ],
  },
  {
    id: 'Finance',
    title: 'Finance',
    type: 'group',
    icon: 'heroicons_outline:home',
    children: [
      {
        id: 'dashboards.Income',
        title: 'Income',
        type: 'basic',
        icon: 'heroicons_outline:clipboard-check',
        link: '/income',
      },
      {
        id: 'dashboards.Expense',
        title: 'Expense',
        type: 'basic',
        icon: 'heroicons_outline:clipboard-check',
        link: '/expense',
      },
      {
        id: 'dashboards.Investments',
        title: 'Investments',
        type: 'basic',
        icon: 'heroicons_outline:clipboard-check',
        link: '/investment',
      },
    ],
  },
  {
    id: 'Reports',
    title: 'Reports',
    type: 'group',
    icon: 'heroicons_outline:home',
    children: [
      {
        id: 'Reports.Reports',
        title: 'My Finance Reports',
        type: 'basic',
        icon: 'heroicons_outline:clipboard-check',
        link: '/report',
      },
    ],
  },
  {
    id: 'Profile',
    title: 'Profile',
    type: 'group',
    icon: 'heroicons_outline:home',
    children: [
      {
        id: 'dashboards.Account',
        title: 'My Account',
        type: 'basic',
        icon: 'heroicons_outline:clipboard-check',
        link: '/Account',
      },
    ],
  },
];
