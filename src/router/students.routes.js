export default [
    {
        path: '',
        name: 'students-list',
        component: () => import('@/components/students/List.vue'),
    },
    {
        path: 'create',
        name: 'students-create',
        component: () => import('@/components/students/Create.vue'),
    },
    {
        path: ':id',
        name: 'students-detail',
        component: () => import('@/components/students/Detail.vue'),
        props: true,
    },
];