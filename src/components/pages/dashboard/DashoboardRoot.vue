<template>
  <div class="surface-ground text-color">
    <template v-if="isLoadingDebounced">
      <SkeletonCard v-for="i in 6" :key="i" />
    </template>
    <template v-else>
      <div class="text-xl font-bold px-3 pt-3 flex align-items-center">
        <font-awesome-icon icon="fa-solid fa-trophy" class="mr-3"></font-awesome-icon>
        <div class="">Classifica</div>
      </div>
      <FirstTeams :teams="getTeamsRanking" :max-teams-visible="3" class="m-3" @goToRankingPage="emit('goToRankingPage')" />
      <div class="text-xl font-bold px-3 pt-3 flex align-items-center">
        <font-awesome-icon icon="fa-solid fa-people-group" class="mr-3"></font-awesome-icon>
        <div>Classifica marcatori</div>
      </div>
      <FirstPlayers :players="playersStats" :max-players-visible="3" class="m-3" @go-to-ranking-page="emit('goToPlayersPage')" />
      <div v-if="getLatestMatchResults.length" class="p-3 surface-card mb-3">
        <div class="text-2xl font-bold text-color border-bottom-1 surface-border pb-3 mb-1">Ultimi risultati</div>
        <LatestMatchResult :match-list="getLatestMatchResults" />
      </div>
      <div v-if="getNextMatches.length" class="p-3 surface-card">
        <div class="text-2xl font-bold text-color border-bottom-1 surface-border pb-3 mb-1">Prossime partite</div>
        <NextMatchList :match-list="getNextMatches" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useStore } from "@/store/main";
import { computed } from "vue";
import { maxBy } from "lodash";
import { IPlayerRanking, ITeamRanking } from "@/api/interfaces";
import FirstPlayerSection from "./FirstPlayerSection.vue";
import FirstTeamSection from "./FirstTeamSection.vue";
import FirstPlayers from "./FirstPlayers.vue";
import SkeletonCard from "@/components/shared/SkeletonCard.vue";
import LatestMatchResult from "./LatestMatchResult.vue";
import NextMatchList from "./NextMatchList.vue";
import FirstTeams from "./FirstTeams.vue";

const { playersStats, getLatestMatchResults, getNextMatches, getTeamsRanking, isLoadingDebounced } = storeToRefs(useStore());

const emit = defineEmits<{
  (e: "goToRankingPage"): void;
  (e: "goToPlayersPage"): void;
}>();

const firstTeam = computed(() => maxBy<ITeamRanking>(getTeamsRanking.value, "points"));
const firstPlayer = computed(() => maxBy<IPlayerRanking>(playersStats.value, "goal"));
</script>
