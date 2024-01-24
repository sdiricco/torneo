/* eslint-disable */

<template>
  <TournamentPageTemplate @refresh="onRefresh">
    <template #header>
      <PageHeader
        :title="getTournamentName"
        :show-back-button="true"
      ></PageHeader>
    </template>
    <DashoboardRoot
      @go-to-players-page="goToPlayersPage"
      @go-to-ranking-page="goToRankingPage"
    />
  </TournamentPageTemplate>
</template>

<script lang="ts" setup>
import TournamentPageTemplate from "@/components/layout/TournamentPageTemplate.vue";
import PageHeader from "@/components/PageHeader.vue";
import { storeToRefs } from "pinia";
import { useStore } from "@/store/main";
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import DashoboardRoot from "@/components/pages/dashboard/DashoboardRoot.vue";

const id = useRoute().params.id as string;

const store = useStore();
const { getTournamentName } = storeToRefs(useStore());

async function onRefresh() {
  await store.fecthTournamentDetails(id);
  await store.fetchPlayers(id);
}

function goToPlayersPage() {
  router.push({ name: "PlayersRankingPage", params: { id } });
}

function goToRankingPage() {
  router.push({ name: "TournamentRankingPage", params: { id } });
}

onBeforeMount(async () => {
  await store.fecthTournamentDetails(id);
  await store.fetchPlayers(id);
});
</script>
