<template>
  <TournamentCalendarRoot />
</template>

<script lang="ts" setup>
import { useStore } from "@/store/main";
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import TournamentCalendarRoot from "@/components/pages/tournament-calendar/TournamentCalendarRoot.vue";

const store = useStore();

const id = useRoute().params.id as string;

onBeforeMount(async () => {
  await store.fecthTournamentDetails(id);
  await store.fetchTournamentCalendar(id);
});
</script>
