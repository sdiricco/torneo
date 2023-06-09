/* eslint-disable */

<template>
  <ion-page>
    <ion-header>
      <SearchToolbar />
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="table-container">
        <table class="table table-sm mb-4">
          <thead class="table-light sticky-top" @click="onClickHead">
            <tr>
              <th></th>
              <th>Squadra</th>
              <th>PT</th>
              <th>G</th>
              <th>V</th>
              <th>PA</th>
              <th>PE</th>
              <th>GF</th>
              <th>GS</th>
              <th>CD</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(team, id) in teams" :key="id" @click="onClickRow(team)">
              <th scope="row">{{ id }}</th>
              <td class="text-truncate" style="max-width: 150px">{{ team.name }}</td>
              <td>
                <strong>{{ team.points }}</strong>
              </td>
              <td>{{ team.matches }}</td>
              <td>{{ team.won_matches }}</td>
              <td>{{ team.drawn_matches }}</td>
              <td>{{ team.lost_matches }}</td>
              <td>{{ team.goals_scored }}</td>
              <td>{{ team.goals_conceded }}</td>
              <td>{{ team.fair_play }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="container-fluid ps-2">
        <div class="row g-1" v-for="l in legend" :key="l.id">
          <div class="col-2">
            <strong>{{ l.name }}</strong>
          </div>
          <div class="col">{{ l.description }}</div>
        </div>
      </div>
      <Modal v-if="modal"></Modal>
      
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import SearchToolbar from "@/components/SearchToolbar.vue";
import Modal from "@/components/Modal.vue"
/* IONIC COMPONENTS */
import { IonContent, IonHeader, IonPage, IonFabButton, IonIcon } from "@ionic/vue";
import { onMounted, ref } from "vue";
import { getStandingsFromAICSWebPage } from "@/services/scraper";
import { useStore } from "@/store/main";

let teams = ref<any>([]);

let modal = ref(false)

const legend = ref([
  { id: 1, name: "PT", description: "Punti totali" },
  { id: 2, name: "G", description: "Partite giocate" },
  { id: 3, name: "V", description: "Partite vinte" },
  { id: 4, name: "PA", description: "Partite pareggiate" },
  { id: 5, name: "PE", description: "Partite perse" },
  { id: 6, name: "GF", description: "Gol fatti" },
  { id: 7, name: "GS", description: "Gol subiti" },
  { id: 8, name: "CD", description: "Coppa Disciplina" },
]);

function onClickRow(team: any) {
  console.log("team", team);
}

function onClickHead(){
  modal.value = !modal.value;
  console.log('modal.value', modal.value);

}

onMounted(async () => {
  useStore().httpRequestOnGoing = true;
  const response = await getStandingsFromAICSWebPage();
  teams.value = response.data.data;
  useStore().httpRequestOnGoing = false;

});
</script>

<style scoped>
.table-container {
  height: 50vh;
  overflow: auto;
}
</style>
