<template>
  <TournamentsPageTemplate>
    <template #header>
      <PageHeader title="AICS Lucca - Campionati di calcio a 5"/>
    </template>
    <div class="p-4">
      <WaitServer v-if="!tournaments.length" />
      <TournamentsRoot v-else @select:tournament="onSelectTournament" />
    </div>
  </TournamentsPageTemplate>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useStore } from "@/store/main";
import { storeToRefs } from "pinia";
import router from "@/router";
import TournamentsPageTemplate from "@/components/layout/TournamentsPageTemplate.vue";
import WaitServer from "@/components/pages/tournaments/WaitServer.vue";
import PageHeader from "@/components/PageHeader.vue"
import TournamentsRoot from "@/components/pages/tournaments/TournamentsRoot.vue";

const mainStore = useStore();
const { tournaments } = storeToRefs(mainStore);

function onSelectTournament(id:number){
  router.push({ name: "TournamentHome", params: { id } });
}

onMounted(async () => {
  await mainStore.fecthTournaments();
});
</script>

<style scoped></style>
