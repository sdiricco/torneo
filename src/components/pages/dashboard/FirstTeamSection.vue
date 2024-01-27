<template>
  <div class="p-3 mb-3 surface-card">
    <div
      class="flex border-bottom-1 surface-border justify-content-between align-items-end mb-2 pb-2"
    >
      <div class="text-2xl text-color">1° campionato</div>
    </div>
    <div class="border-bottom-1 surface-border mb-2 pb-2">
      <div class="text-xl text-color">{{ team.name }}</div>
      <div class="font-bold">{{ `punti: ${team.points}` }}</div>
    </div>
    <Button
      class="px-0 pb-0"
      icon="pi pi-arrow-right"
      iconPos="right"
      label="Vai alla classifica completa"
      link
      @click="emit('goToRankingPage')"
    ></Button>
  </div>
</template>

<script setup lang="ts">
import { ITeamRanking} from "@/api/interfaces"
interface Props {
  team: ITeamRanking;
}

defineProps<Props>()

const emit = defineEmits(['goToRankingPage'])
</script>
