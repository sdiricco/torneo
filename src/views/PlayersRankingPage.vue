<template>
  <TournamentPageTemplate>
    <template #header>
      <PageHeader />
    </template>
    <PlayersRoot />
  </TournamentPageTemplate>
</template>

<script lang="ts" setup>
import TournamentPageTemplate from "@/components/layout/TournamentPageTemplate.vue";
import PlayersRoot from '@/components/pages/players-ranking/PlayersRoot.vue';
import PageHeader from "@/components/PageHeader.vue";
</script>

