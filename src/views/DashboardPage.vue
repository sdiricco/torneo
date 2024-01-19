/* eslint-disable */

<template>
  <TournamentPageTemplate @refresh="onRefresh">
    <template #header>
      <PageHeader :title="tournamentName" :show-back-button="true"></PageHeader>
    </template>
    <div class="p-3 surface-ground">
      <div
        v-if="firstTeam"
        class="border-1 p-3 surface-border mb-3 surface-card"
      >
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
          @click="clickGoToRankingPage('TournamentRankingPage')"
        ></Button>
      </div>
      <div
        v-if="firstPlayer"
        class="border-1 p-3 surface-border surface-card mb-3"
      >
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
          @click="clickGoToPlayersPage('PlayersRankingPage')"
        ></Button>
      </div>

      <div v-if="latestMatchResults.length" class="border-1 p-3 surface-border surface-card mb-3">
        <div class="text-2xl text-color border-bottom-1 surface-border pb-3">Ultimi risultati</div>

        <div v-for="item in latestMatchResults" class="border-bottom-1 surface-border p-2">
          <div class="flex justify-content-between">
            <div class="text-color">
              {{ item.teamA }}
            </div>
            <div class="font-bold">
              {{ item.matchCompleted && item.scoreA || '-' }}
            </div>
          </div>
          <div class="flex justify-content-between">
            <div class="text-color">
              {{ item.teamB }}
            </div>
            <div class="font-bold">
              {{ item.matchCompleted && item.scoreB || '-' }}
            </div>
          </div>
          <small class="text-color-secondary">
            {{ `${formatData(item.dateUtc)}, ${item.location}` }}
          </small>
        </div>
      </div>


      <div v-if="nextMatches.length" class="border-1 p-3 surface-border surface-card">
        <div class="text-2xl text-color border-bottom-1 surface-border pb-3">Prossime partite</div>

        <div v-for="item in nextMatches" class="border-bottom-1 surface-border p-2">
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
  </TournamentPageTemplate>
</template>

<script lang="ts" setup>
import TournamentPageTemplate from "@/components/layout/TournamentPageTemplate.vue";
import TournamentRoot from "@/components/pages/tournament-ranking/TournamentRoot.vue";
import PageHeader from "@/components/PageHeader.vue";
import { storeToRefs } from "pinia";
import { useStore } from "@/store/main";
import { computed, onMounted, onBeforeMount } from "vue";
import { maxBy } from "lodash";
import moment from "moment";
import { useRoute } from "vue-router";
import router from "@/router";


const store = useStore();
const { tournamentDetails, players, teams, results, latestMatchResults, nextMatches } = storeToRefs(useStore());

const id = useRoute().params.id as string;

const tournamentName = computed(
  () => tournamentDetails.value && tournamentDetails.value.name
);

const firstPlayer = computed(() => maxBy(players.value, "goal"));
const firstTeam = computed(() => maxBy(teams.value, "points"));

async function onRefresh() {
  await store.fecthStandings(id);
}

function formatData(dateUtc: string) {
  return moment(dateUtc).locale('it').format("ddd DD/MM HH:mm");
}

function clickGoToPlayersPage(name:string){
  router.push({ name, params: { id } });
}

function clickGoToRankingPage(name:string){
  router.push({ name, params: { id } });
}

onBeforeMount(async () => {
  await store.fecthStandings(id);
  await store.fetchPlayers(id);
  await store.fetchMatchResults(id);
  await store.fetchLatestMatchResults(id);
  await store.fetchNextMatches(id);
});
</script>
