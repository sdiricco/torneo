import { createRouter,  createWebHashHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/standings'
  },
  {
    path: '/standings',
    name: 'StandingsPage',
    component: () => import('@/views/StandingsPage.vue'),
  },
  {
    path: '/matches',
    name: 'MatchesPage',
    component: () => import('@/views/MatchesPage.vue'),
  },
  {
    path: '/players',
    name: 'PlayersPage',
    component: () => import('@/views/PlayersPage.vue'),
  }
]


//standings
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
