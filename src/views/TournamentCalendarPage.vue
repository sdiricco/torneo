<template>
  <TournamentPageTemplate @refresh="onRefresh">
    <template #header>
      <PageHeader :title="getTournamentName" :show-back-button="true"></PageHeader>
    </template>
    <TournamentCalendarRoot />
  </TournamentPageTemplate>
</template>

<script lang="ts" setup>
import TournamentPageTemplate from "@/components/layout/TournamentPageTemplate.vue";
import PageHeader from "@/components/PageHeader.vue";
import TournamentCalendarRoot from "@/components/pages/tournament-calendar/TournamentCalendarRoot.vue"

import { storeToRefs } from "pinia";
import { useStore } from "@/store/main";
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";

const store = useStore();
const { getTournamentName } = storeToRefs(store);

const id = useRoute().params.id as string;

async function onRefresh() {
  await store.fetchTournamentCalendar(id)
}

onBeforeMount(async () => {
  await store.fetchTournamentCalendar(id)
});
</script>
