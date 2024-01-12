<template>
  <TournamentPageTemplate>
    <template #header>
      <SearchToolbar />
    </template>
    <PlayersRoot />
  </TournamentPageTemplate>
</template>

<script lang="ts" setup>
import TournamentPageTemplate from "@/components/layout/TournamentPageTemplate.vue";
import PlayersRoot from '@/components/pages/players-ranking/PlayersRoot.vue';
import SearchToolbar from "@/components/SearchToolbar.vue";
</script>

