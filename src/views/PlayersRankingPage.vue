<template>
  <TournamentPageTemplate @refresh="onRefresh">
    <template #header>
      <PageHeader :title="getTournamentName" :show-back-button="true"></PageHeader>
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
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";

const store = useStore();
const {getTournamentName } = storeToRefs(store);

const id = useRoute().params.id as string


async function onRefresh(){
  await store.fetchPlayers(id)
}

onBeforeMount(async()=> {
  await store.fetchPlayers(id)
})
</script>

