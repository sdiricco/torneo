/* eslint-disable */

<template>
  <TournamentPageTemplate>
    <template #header>
      <SearchToolbar />
    </template>
    <TournamentRoot />
  </TournamentPageTemplate>
</template>

<script lang="ts" setup>
import TournamentPageTemplate from "@/components/layout/TournamentPageTemplate.vue";
import TournamentRoot from '@/components/pages/tournament-ranking/TournamentRoot.vue';
import SearchToolbar from "@/components/SearchToolbar.vue";
</script>

