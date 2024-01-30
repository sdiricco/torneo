<template>
  <PageTemplate>
    <template #header>
      <PageHeader :title="getTournamentName" :show-back-button="true" :show-menu-button="true" @on-back="router.push({ name: 'TournamentsPage' })"></PageHeader>
    </template>
    <WaitServer v-if="longLoading"></WaitServer>
    <RouterView></RouterView>
    <template #footer>
      <Tabs :items="items" :active-item-idx="activeItemIdx" @tab:change="onChangeTab" />
    </template>
  </PageTemplate>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount } from "vue";
import PageTemplate from "@/components/layout/PageTemplate.vue";
import { useRoute } from "vue-router";
import router from "@/router";
import WaitServer from "@/components/pages/tournaments/WaitServer.vue";
import { useStore } from "@/store/main";
import { storeToRefs } from "pinia";
import Tabs from "@/components/shared/Tabs.vue";
import PageHeader from "@/components/PageHeader.vue";
import type { MenuItem } from "primevue/menuitem";

const store = useStore();
const { longLoading, getTournamentName } = storeToRefs(store);

const route = useRoute();
const id = route.params.id as string;

const items: MenuItem[] = [
  { label: "Dashboard", icon: "fa-solid fa-home", key: "TournamentDashboard" },
  { label: "Classifica", icon: "fa-solid fa-trophy", key: "TournamentRankingPage" },
  { label: "Giocatori", icon: "fa-solid fa-people-group", key: "PlayersStatsPage" },
  { label: "Giornate", icon: "fa-solid fa-calendar", key: "CalendarPage" },
];

const activeItemIdx = computed(() => items.findIndex((i) => i.key === route.name));

function onChangeTab(item: MenuItem) {
  router.push({ name: item.key, params: { id } });
}

onBeforeMount(async () => {
  await store.fecthTournamentDetails(id);
});
</script>
