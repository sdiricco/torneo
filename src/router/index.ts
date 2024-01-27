import { createRouter,  createWebHashHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const tournamentsPage = () => import('@/views/TournamentsPage.vue')
const tournamentHomePage = () => import('@/views/TournamentHome.vue')
const tournamentDashboardPage = () => import('@/views/TournamentDashboardPage.vue')
const tournamentRankingsPage = () => import('@/views/TournamentRankingPage.vue')
const playersStatsPage = () => import('@/views/PlayersStatsPage.vue')
const tournamentCalendarPage = () => import('@/views/TournamentCalendarPage.vue')
const OnBoardingPage = () => import('@/views/OnBoardingPage.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'RootPage',
    redirect: '/onboarding'
  },
  {
    path: '/onboarding',
    name: 'OnBoardingPage',
    component: OnBoardingPage
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
        component: tournamentDashboardPage,
      },
      {
        path: 'tournament-ranking',
        name: 'TournamentRankingPage',
        component: tournamentRankingsPage,
      },
      {
        path: 'players',
        name: 'PlayersStatsPage',
        component: playersStatsPage,
      },
      {
        path: 'calendar',
        name: 'CalendarPage',
        component: tournamentCalendarPage,
      },
    ]
  },
]


//standings
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
