<template>
  <div class="surface-ground text-color">
    <FirstTeamSection v-if="firstTeam" :team="firstTeam" @goToRankingPage="emit('goToRankingPage')" />
    <SkeletonCard v-else />
    <FirstPlayerSection v-if="firstPlayer" :player="firstPlayer" @goToPlayersPage="emit('goToPlayersPage')" />
    <SkeletonCard v-else />

    <div v-if="getLatestMatchResults.length" class="p-3 surface-card mb-3">
      <div class="text-2xl text-color border-bottom-1 surface-border pb-3 mb-1">Ultimi risultati</div>

      <div v-for="item in getLatestMatchResults" class="border-bottom-1 surface-border p-2 mb-1">
        <div class="flex justify-content-between mb-1">
          <div class="flex align-items-center">
            <font-awesome-icon :icon="['fas', 'shirt']" class="mr-2" />
            <div class="text-color">
              {{ item.teamA }}
            </div>
          </div>
          <div class="font-bold">
            {{ item.scoreA }}
          </div>
        </div>
        <div class="flex justify-content-between mb-1">
          <div class="flex align-items-center">
            <font-awesome-icon :icon="['fas', 'shirt']" class="mr-2" />
            <div class="text-color">
              {{ item.teamB }}
            </div>
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
      <div class="text-2xl text-color border-bottom-1 surface-border pb-3 mb-1">Prossime partite</div>

      <div v-for="item in getNextMatches" class="border-bottom-1 surface-border p-2 mb-1">
        <div class="flex justify-content-between mb-1">
          <div class="flex align-items-center">
            <font-awesome-icon :icon="['fas', 'shirt']" class="mr-2" />
            <div class="text-color">
              {{ item.teamA }}
            </div>
          </div>
        </div>
        <div class="flex justify-content-between">
          <div class="flex align-items-center">
            <font-awesome-icon :icon="['fas', 'shirt']" class="mr-2" />
            <div class="text-color">
              {{ item.teamB }}
            </div>
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
import { IPlayerRanking, ITeamRanking } from "@/api/interfaces";
import FirstPlayerSection from "./FirstPlayerSection.vue";
import FirstTeamSection from "./FirstTeamSection.vue";
import SkeletonCard from "@/components/shared/SkeletonCard.vue";

const { httpRequestOnGoing, playersStats, getLatestMatchResults, getNextMatches, getTeamsRanking } = storeToRefs(useStore());

const emit = defineEmits<{
  (e: "goToRankingPage"): void;
  (e: "goToPlayersPage"): void;
}>();

const firstTeam = computed(() => maxBy<ITeamRanking>(getTeamsRanking.value, "points"));
const firstPlayer = computed(() => maxBy<IPlayerRanking>(playersStats.value, "goal"));

function formatData(dateUtc: string) {
  return DateTime.fromISO(dateUtc).setLocale("it").toFormat("EEE dd/MM HH:mm");
}
</script>
