/* eslint-disable */

<template>
  <TournamentPageTemplate @refresh="onRefresh">
    <template #header>
      <PageHeader :title="tournamentName" :show-back-button="true"></PageHeader>
    </template>
    <div class="p-4 surface-ground">
      <div
        v-if="firstTeam"
        class="border-1 p-4 surface-border mb-4 surface-card"
      >
        <div
          class="flex border-bottom-1 surface-border justify-content-between align-items-end mb-4 pb-2"
        >
          <div class="text-4xl text-color">1° campionato</div>
          <Button
            icon="pi pi-arrow-right"
            iconPos="right"
            label="Classifica completa"
            link
          ></Button>
        </div>
        <div class="text-xl text-color">{{ firstTeam.name }}</div>
        <div class="font-bold">{{ `punti: ${firstTeam.points}` }}</div>
      </div>
      <div v-if="firstPlayer" class="border-1 p-4 surface-border surface-card mb-4" >
        <div
          class="flex border-bottom-1 surface-border justify-content-between align-items-end mb-4 pb-2"
        >
          <div class="text-4xl text-color">1° marcatore</div>
          <Button
            icon="pi pi-arrow-right"
            iconPos="right"
            label="Classifica marcatori"
            link
          ></Button>
        </div>
        <div class="text-xl text-color">
          {{ `${firstPlayer.firstName} ${firstPlayer.lastName}` }}
        </div>
        <div class="font-bold">{{ `goal: ${firstPlayer.goal}` }}</div>
      </div>

      <div v-if="results" class="border-1 p-4 surface-border surface-card">
        <div class="text-4xl text-color mb-4">Prossime partite</div>
        <DataTable
          scrollable
          scrollHeight="flex"
          :class="`p-datatable-sm custom-table`"
          :value="results.values"
          stripedRows
        >
          <Column field="Squadre" sortable header="Squadra"></Column>
          <Column field="col2" sortable header="Squadra"></Column>
          <Column
            field="Risultato"
            sortable
            header="Risultato"
            class="font-bold"
          ></Column>
          <Column
            field="Data"
            sortable
            header="Data"
            class="font-bold"
          ></Column>
          <Column field="Ora" sortable header="Ora" class="font-bold"></Column>
          <Column
            field="Luogo"
            sortable
            header="Luogo"
            class="font-bold"
          ></Column>
        </DataTable>
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
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { maxBy } from "lodash";

const store = useStore();
const { tournamentDetails, players, teams, results } = storeToRefs(useStore());

const id = useRoute().params.id as string;

const tournamentName = computed(
  () => tournamentDetails.value && tournamentDetails.value.name
);

const firstPlayer = computed(() => maxBy(players.value, "goal"));
const firstTeam = computed(() => maxBy(teams.value, "points"));

async function onRefresh() {
  await store.fecthStandings(id);
}

onMounted(async () => {
  await store.fecthStandings(id);
  await store.fetchPlayers(id);
  await store.fetchMatchResults(id);
});
</script>
