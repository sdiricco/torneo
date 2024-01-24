<template>
    <div class="p-3 surface-card mb-3">
      <div class="border-bottom-1 surface-border mb-2 pb-2">
        <div class="text-2xl text-color">1° marcatore</div>
      </div>
      <div class="border-bottom-1 surface-border mb-2 pb-2">
        <div class="text-xl text-color">
          {{ `${player.firstName} ${player.lastName}` }}
        </div>
        <div class="font-bold">{{ `goal: ${player.goal}` }}</div>
      </div>
      <Button
        class="px-0 pb-0"
        icon="pi pi-arrow-right"
        iconPos="right"
        label="Vai alla classifica marcatori"
        link
        @click="emit('goToPlayersPage')"
      ></Button>
    </div>
</template>

<script setup lang="ts">
import { IPlayerRanking } from "@/api/interfaces";
interface Props {
  player: IPlayerRanking;
}

const props = defineProps<Props>();

const emit = defineEmits(["goToPlayersPage"]);
</script>
