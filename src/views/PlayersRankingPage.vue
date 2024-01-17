<template>
  <TournamentPageTemplate @refresh="onRefresh">
    <template #header>
      <PageHeader :title="tournamentName" :show-back-button="true"></PageHeader>
    </template>
    <PlayersRoot />
  </TournamentPageTemplate>
</template>

<script lang="ts" setup>
import TournamentPageTemplate from "@/components/layout/TournamentPageTemplate.vue";
import PlayersRoot from '@/components/pages/players-ranking/PlayersRoot.vue';
import PageHeader from "@/components/PageHeader.vue";

import { storeToRefs } from "pinia";
import { useStore } from "@/store/main";
import { computed, onBeforeMount } from "vue";
import { useRoute } from "vue-router";

const store = useStore();
const { tournamentDetails } = storeToRefs(store);

const id = useRoute().params.id as string

const tournamentName = computed(
  () => tournamentDetails.value && tournamentDetails.value.name
);

async function onRefresh(){
  await store.fetchPlayers(id)
}

onBeforeMount(async()=> {
  await store.fetchPlayers(id)
})
</script>

