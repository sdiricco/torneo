/* eslint-disable */

<template>
  <TournamentPageTemplate @refresh="onRefresh">
    <template #header>
      <PageHeader :title="getTournamentName" :show-back-button="true"></PageHeader>
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
import { computed, onBeforeMount } from "vue";
import { useRoute } from "vue-router";


const store = useStore();
const { getTournamentName } = storeToRefs(useStore());

const id = useRoute().params.id as string


async function onRefresh(){
  await store.fecthTournamentDetails(id)
}

</script>
