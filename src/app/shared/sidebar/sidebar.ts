import { faTachometerAlt, faFileInvoiceDollar, faChartLine, faRoute, faMap, faLandmark } from '@fortawesome/free-solid-svg-icons';

export const sidebarMenu = [
    {
        id: 0,
        name: 'Dashboard',
        url: '/dashboard',
        icon: faTachometerAlt
    }, 
    {
        id: 1,
        name: 'Wydatki',
        url: '/expenses',
        icon: faFileInvoiceDollar
    },
    {
        id: 2,
        name: 'Przychody',
        url: '/incomes',
        icon: faChartLine
    },
    {
        id: 3,
        name: 'Paliwo',
        url: '/refill',
        icon: faRoute
    },
    {
        id: 4,
        name: 'Podróże',
        url: '/travel',
        icon: faMap
    },
    {
        id: 5,
        name: 'Kredyty',
        url: '/loan',
        icon: faLandmark
    }
];