import { createRouter,  createWebHashHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const tournamentsPage = () => import('@/views/TournamentsPage.vue')
const standingsPage = () => import('@/views/StandingsPage.vue')
const matchesPage = () => import('@/views/MatchesPage.vue')
const playersPage = () => import('@/views/PlayersPage.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'RootPage',
    redirect: '/tournaments'
  },
  {
    path: '/tournaments',
    name: 'TournamentsPage',
    component: tournamentsPage
  },
  {
    path: '/standings/:id',
    name: 'StandingsPage',
    component: standingsPage,
  },
  {
    path: '/matches',
    name: 'MatchesPage',
    component: matchesPage,
  },
  {
    path: '/players',
    name: 'PlayersPage',
    component: playersPage,
  }
]


//standings
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
