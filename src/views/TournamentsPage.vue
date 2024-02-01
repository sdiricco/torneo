<template>
  <TournamentsPageTemplate>
    <TournamentsRoot @select:tournament="onSelectTournament" />
  </TournamentsPageTemplate>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useStore } from "@/store/main";
import router from "@/router";
import TournamentsPageTemplate from "@/components/layout/TournamentsPageTemplate.vue";
import PageHeader from "@/components/PageHeader.vue";
import TournamentsRoot from "@/components/pages/tournaments/TournamentsRoot.vue";

const mainStore = useStore();

function onSelectTournament(id: number) {
  router.push({ name: "TournamentHome", params: { id } });
}

onMounted(async () => {
  await mainStore.fecthTournaments();
  await mainStore.fecthTournamentsV2();
});
</script>

<style scoped></style>
