<template>
  <div class="surface-ground">
    <div v-if="firstTeam" class="p-3 mb-3 surface-card">
      <div
        class="flex border-bottom-1 surface-border justify-content-between align-items-end mb-2 pb-2"
      >
        <div class="text-2xl text-color">1° campionato</div>
      </div>
      <div class="border-bottom-1 surface-border mb-2 pb-2">
        <div class="text-xl text-color">{{ firstTeam.name }}</div>
        <div class="font-bold">{{ `punti: ${firstTeam.points}` }}</div>
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
    <div v-if="firstPlayer" class="p-3 surface-card mb-3">
      <div class="border-bottom-1 surface-border mb-2 pb-2">
        <div class="text-2xl text-color">1° marcatore</div>
      </div>
      <div class="border-bottom-1 surface-border mb-2 pb-2">
        <div class="text-xl text-color">
          {{ `${firstPlayer.firstName} ${firstPlayer.lastName}` }}
        </div>
        <div class="font-bold">{{ `goal: ${firstPlayer.goal}` }}</div>
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

    <div v-if="getLatestMatchResults.length" class="p-3 surface-card mb-3">
      <div class="text-2xl text-color border-bottom-1 surface-border pb-3">
        Ultimi risultati
      </div>

      <div
        v-for="item in getLatestMatchResults"
        class="border-bottom-1 surface-border p-2"
      >
        <div class="flex justify-content-between">
          <div class="text-color">
            {{ item.teamA }}
          </div>
          <div class="font-bold">
            {{ item.scoreA }}
          </div>
        </div>
        <div class="flex justify-content-between">
          <div class="text-color">
            {{ item.teamB }}
          </div>
          <div class="font-bold">
            {{ item.scoreB }}
          </div>
        </div>
        <small class="text-color-secondary">
          {{ `${formatData(item.dateUtc)}, ${item.location}` }}
        </small>
      </div>
    </div>

    <div v-if="getNextMatches.length" class="p-3 surface-card">
      <div class="text-2xl text-color border-bottom-1 surface-border pb-3">
        Prossime partite
      </div>

      <div
        v-for="item in getNextMatches"
        class="border-bottom-1 surface-border p-2"
      >
        <div class="flex justify-content-between">
          <div class="text-color">
            {{ item.teamA }}
          </div>
        </div>
        <div class="flex justify-content-between">
          <div class="text-color">
            {{ item.teamB }}
          </div>
        </div>
        <small class="text-color-secondary">
          {{ `${formatData(item.dateUtc)}, ${item.location}` }}
        </small>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useStore } from "@/store/main";
import { computed } from "vue";
import { maxBy } from "lodash";
import { DateTime } from "luxon";
import {IPlayerRanking, ITeamRanking} from "@/api/interfaces"


const {
  playersStats,
  getLatestMatchResults,
  getNextMatches,
  getTeamsRanking,
} = storeToRefs(useStore());

const emit = defineEmits<{
  (e: 'goToRankingPage'):void,
  (e: 'goToPlayersPage'):void,
}>()


const firstTeam = computed(() => maxBy<ITeamRanking>(getTeamsRanking.value, "points"));
const firstPlayer = computed(() => maxBy<IPlayerRanking>(playersStats.value, "goal"));


function formatData(dateUtc: string) {
  return DateTime.fromISO(dateUtc).setLocale('it').toFormat('EEE dd/MM HH:mm')
}

</script>
