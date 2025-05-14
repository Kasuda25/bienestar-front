export default [
    {
        path: '',
        name: 'locations-list',
        component: () => import('@/components/locations/List.vue'),
    },
    {
        path: 'create',
        name: 'locations-create',
        component: () => import('@/components/locations/Create.vue'),
    },
    {
        path: ':id',
        name: 'locations-detail',
        component: () => import('@/components/locations/Detail.vue'),
        props: true,
    },
];
