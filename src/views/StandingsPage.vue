/* eslint-disable */

<template>
  <ion-page>
    <ion-header>
      <SearchToolbar />
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="overflow-auto">
        <table class="table table-sm mb-5">
          <thead class="table-light sticky-top">
            <tr>
              <th scope="col"></th>
              <th scope="col">Squadra</th>
              <th scope="col">PT</th>
              <th scope="col">G</th>
              <th scope="col">V</th>
              <th scope="col">P</th>
              <th scope="col">GF</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="team in teams" :key="team.id" @click="onClickRow(team)">
              <th scope="row">{{ team.id }}</th>
              <td class="text-truncate" style="max-width: 150px">{{ team.name }}</td>
              <td>
                <strong>{{ team.points }}</strong>
              </td>
              <td>{{ team.matchPlayed }}</td>
              <td>{{ team.matchWon }}</td>
              <td>{{ team.matchLost }}</td>
              <td>{{ team.goals }}</td>
              <td>
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </td>
            </tr>
          </tbody>
        </table>

        <table class="table table-sm table-borderless">
          <tbody>
            <tr v-for="l in legend" :key="l.id">
              <th scope="row">{{ l.name }}</th>
              <td>{{ l.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import SearchToolbar from "@/components/SearchToolbar.vue";

/* IONIC COMPONENTS */
import { IonContent, IonHeader, IonPage, IonFabButton, IonIcon } from "@ionic/vue";
import { onMounted, ref } from "vue";
import {getStandingsFromAICSWebPage} from "@/services/scraper"
const teams = ref([
  { id: 1, name: "Bombonera", points: 36, goals: 25, matchPlayed: 9, matchWon: 4, matchLost: 5 },
  { id: 2, name: "Verciano", points: 12, goals: 30, matchPlayed: 10, matchWon: 1, matchLost: 9 },
  { id: 3, name: "Atletico una volta", points: 11, goals: 28, matchPlayed: 9, matchWon: 1, matchLost: 8 },
  { id: 4, name: "Belli fighi", points: 10, goals: 27, matchPlayed: 10, matchWon: 1, matchLost: 9 },
  { id: 5, name: "Patetico madrid", points: 7, goals: 18, matchPlayed: 9, matchWon: 0, matchLost: 9 },
  { id: 6, name: "Atletico ma non troppo", points: 7, goals: 14, matchPlayed: 10, matchWon: 0, matchLost: 10 },
  { id: 7, name: "Tagetic", points: 7, goals: 12, matchPlayed: 9, matchWon: 0, matchLost: 9 },
  { id: 8, name: "Neapolis", points: 6, goals: 9, matchPlayed: 10, matchWon: 0, matchLost: 10 },
  { id: 9, name: "Rapid City", points: 5, goals: 15, matchPlayed: 9, matchWon: 0, matchLost: 9 },
  { id: 10, name: "FC Splendido", points: 4, goals: 11, matchPlayed: 10, matchWon: 0, matchLost: 10 },
]);

const legend = ref([
  { id: 1, name: "PT", description: "Punti totali" },
  { id: 2, name: "G", description: "Partite giocate" },
  { id: 3, name: "V", description: "Partite vinte" },
  { id: 4, name: "P", description: "Partite perse" },
  { id: 4, name: "GF", description: "Gol fatti" },
]);

function onClickRow(team: any) {
  console.log("team", team);
}

onMounted(async() => {
  const response = await getStandingsFromAICSWebPage()
  console.log('response', response.data) 
})
</script>
