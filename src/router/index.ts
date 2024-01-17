import { createRouter,  createWebHashHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const tournamentsPage = () => import('@/views/TournamentsPage.vue')
const tournamentHomePage = () => import('@/views/TournamentHome.vue')
const tournamentDashboard = () => import('@/views/DashboardPage.vue')
const tournamentRankingsPage = () => import('@/views/TournamentRankingPage.vue')
const playersRankingPage = () => import('@/views/PlayersRankingPage.vue')

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
    path: '/tournaments/:id',
    name: 'TournamentHome',
    component: tournamentHomePage,
    redirect: to => ({ name: 'TournamentDashboard', params: { id: to.params.id } }),
    children: [
      {
        path: 'dashboard',
        name: 'TournamentDashboard',
        component: tournamentDashboard,
      },
      {
        path: 'standings',
        name: 'TournamentRankingPage',
        component: tournamentRankingsPage,
      },
      {
        path: 'players',
        name: 'PlayersRankingPage',
        component: playersRankingPage,
      }
    ]
  },
]


//standings
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
