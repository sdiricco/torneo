<template>
  <PlayersRoot />
</template>

<script lang="ts" setup>
import PlayersRoot from "@/components/pages/players-ranking/PlayersRoot.vue";

import { useStore } from "@/store/main";
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";

const store = useStore();

const id = useRoute().params.id as string;

onBeforeMount(async () => {
  await store.fetchPlayers(id);
});
</script>
