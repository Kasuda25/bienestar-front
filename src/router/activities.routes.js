export default [
    {
      path: '',
      name: 'activities-list',
      component: () => import('../components/activities/List.vue'),
    },
    {
      path: 'create',
      name: 'activities-create',
      component: () => import('../components/activities/Create.vue')
    },
    {
      path: ':id',
      name: 'activities-detail',
      component: () => import('../components/activities/Detail.vue')
    }
  ];