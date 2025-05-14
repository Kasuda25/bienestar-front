export default [
    {
        path: '',
        name: 'instructors-list',
        component: () => import('@/components/instructors/List.vue'),
    },
    {
        path: 'create',
        name: 'instructors-create',
        component: () => import('@/components/instructors/Create.vue'),
    },
    {
        path: ':id',
        name: 'instructors-detail',
        component: () => import('@/components/instructors/Detail.vue'),
        props: true,
    },
];
