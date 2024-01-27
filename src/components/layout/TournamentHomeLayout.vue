<template>
  <PageTemplate>
    <template #header>
      <slot name="header" />
    </template>
    <RouterView></RouterView>
    <template #footer>
      <Tabs :items="items" @update:item="onChangeTab" />
    </template>
  </PageTemplate>
</template>

<script lang="ts" setup>
import { IonRouterOutlet, IonPage } from "@ionic/vue";
import PageTemplate from "@/components/layout/PageTemplate.vue";
import { useRoute } from "vue-router";
import router from "@/router";
import WaitServer from "@/components/pages/tournaments/WaitServer.vue";
import { useStore } from "@/store/main";
import { storeToRefs } from "pinia";
import Tabs from "../shared/Tabs.vue";
import type { MenuItem } from 'primevue/menuitem';
const { longLoading } = storeToRefs(useStore());

const route = useRoute();
const id = route.params.id;

const items: MenuItem[] = [
  { label: "Dashboard", icon: "fa-solid fa-home", key: "TournamentDashboard"  },
  { label: "Classifica", icon: "fa-solid fa-trophy", key: "TournamentRankingPage"  },
  { label: "Giocatori", icon: "fa-solid fa-people-group", key: "PlayersStatsPage"  },
  { label: "Giornate", icon: "fa-solid fa-calendar", key: "CalendarPage"  },
];

function onChangeTab(item: MenuItem){
  router.push({ name: item.key, params: { id } });

}

</script>
