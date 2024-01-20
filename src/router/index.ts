import { createRouter,  createWebHashHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const tournamentsPage = () => import('@/views/TournamentsPage.vue')
const tournamentHomePage = () => import('@/views/TournamentHome.vue')
const tournamentDashboard = () => import('@/views/DashboardPage.vue')
const tournamentRankingsPage = () => import('@/views/TournamentRankingPage.vue')
const playersRankingPage = () => import('@/views/PlayersRankingPage.vue')
const DisciplinaryMeasurementsPage = () => import('@/views/DisciplinaryMeasurementsPage.vue')

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
        path: 'tournament-ranking',
        name: 'TournamentRankingPage',
        component: tournamentRankingsPage,
      },
      {
        path: 'players-ranking',
        name: 'PlayersRankingPage',
        component: playersRankingPage,
      },
      {
        path: 'disciplinary-measurements',
        name: 'DisciplinaryMeasurementsPage',
        component: DisciplinaryMeasurementsPage,
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
