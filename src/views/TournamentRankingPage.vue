/* eslint-disable */

<template>
  <TournamentPageTemplate @refresh="onRefresh">
    <template #header>
      <PageHeader :title="tournamentName" :show-back-button="true"></PageHeader>
    </template>
    <TournamentRoot />
  </TournamentPageTemplate>
</template>

<script lang="ts" setup>
import TournamentPageTemplate from "@/components/layout/TournamentPageTemplate.vue";
import TournamentRoot from "@/components/pages/tournament-ranking/TournamentRoot.vue";
import PageHeader from "@/components/PageHeader.vue";
import { storeToRefs } from "pinia";
import { useStore } from "@/store/main";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";


const store = useStore();
const { tournamentDetails } = storeToRefs(useStore());

const id = useRoute().params.id as string

const tournamentName = computed(
  () => tournamentDetails.value && tournamentDetails.value.name
);


async function onRefresh(){
  await store.fecthStandings(id)
}

onMounted(async()=> {
  await store.fecthStandings(id)
})

</script>
