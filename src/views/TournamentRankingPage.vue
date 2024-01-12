/* eslint-disable */

<template>
  <TournamentPageTemplate>
    <template #header>
      <PageHeader />
    </template>
    <TournamentRoot />
  </TournamentPageTemplate>
</template>

<script lang="ts" setup>
import TournamentPageTemplate from "@/components/layout/TournamentPageTemplate.vue";
import TournamentRoot from '@/components/pages/tournament-ranking/TournamentRoot.vue';
import PageHeader from "@/components/PageHeader.vue";
</script>

