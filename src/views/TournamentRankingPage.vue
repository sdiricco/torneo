/* eslint-disable */

<template>
  <TournamentPageTemplate>
    <template #header>
      <PageHeader>
        {{ tournamentName }}
      </PageHeader>
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
import { computed } from "vue";

const { tournamentDetails } = storeToRefs(useStore());

const tournamentName = computed(
  () => tournamentDetails.value && tournamentDetails.value.name
);
</script>
