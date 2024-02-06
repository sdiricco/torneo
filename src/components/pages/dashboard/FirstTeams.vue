<template>
  <AppCard>
    <div class="grid grid-nogutter surface-border border-bottom-1 pb-4">
      <div class="col-1"></div>
      <div class="col-10">
        <div class="font-bold">Squadra</div>
      </div>
      <div class="col-1">
        <div class="font-bold">PT</div>
      </div>
    </div>
    <div class="grid grid-nogutter pt-4" v-for="(t, idx) in teamsFiltered" :key="t.name">
      <div class="col-1">{{ idx + 1 }}</div>
      <div class="col-10">{{ t.name }}</div>
      <div class="col-1">{{ t.points }}</div>
    </div>
    <div class="flex justify-content-end">
      <Button
        class="px-0 pb-0 mt-4 text-primary"
        icon="pi pi-arrow-right"
        iconPos="right"
        label="Classifica completa"
        link
        @click="emit('goToRankingPage')"></Button>
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import { ITeamRanking } from "@/api/interfaces";
import AppCard from "@/components/shared/AppCard.vue";
interface Props {
  teams: ITeamRanking[];
  maxTeamsVisible: number;
}

const props = defineProps<Props>();

const teamsFiltered = props.teams.filter((t, idx) => idx < props.maxTeamsVisible);

const emit = defineEmits(["goToRankingPage"]);
</script>
