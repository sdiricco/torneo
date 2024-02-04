<template>
  <AppCard>
    <div class="grid grid-nogutter surface-border border-bottom-1 pb-3">
      <div class="col-1"></div>
      <div class="col-10">
        <div class="font-bold">Giocatore</div>
      </div>
      <div class="col-1">
        <div class="font-bold">Goal</div>
      </div>
    </div>
    <div class="grid grid-nogutter pt-3" v-for="(p, idx) in playersFiltered" :key="idx">
      <div class="col-1">{{ idx + 1 }}</div>
      <div class="col-10">{{ `${p.firstName} ${p.lastName}` }}</div>
      <div class="col-1">{{ p.goal }}</div>
    </div>
    <div class="flex justify-content-end">
      <Button
        class="px-0 pb-0 mt-3 text-primary"
        icon="pi pi-arrow-right"
        iconPos="right"
        label="Classifica completa"
        link
        @click="emit('goToRankingPage')"></Button>
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import { IPlayerRanking } from "@/api/interfaces";
import AppCard from "@/components/shared/AppCard.vue";
interface Props {
  players: IPlayerRanking[];
  maxPlayersVisible: number;
}

const props = defineProps<Props>();

const playersFiltered = props.players.filter((t, idx) => idx < props.maxPlayersVisible);

const emit = defineEmits(["goToRankingPage"]);
</script>
