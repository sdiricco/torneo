<template>
  <TournamentRoot />
</template>

<script lang="ts" setup>
import TournamentRoot from "@/components/pages/tournament-ranking/TournamentRoot.vue";
import { useStore } from "@/store/main";
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";

const store = useStore();

const id = useRoute().params.id as string;

onBeforeMount(async () => {
  await store.fecthTournamentDetails(id);
  await store.fetchPlayers(id);
});
</script>
