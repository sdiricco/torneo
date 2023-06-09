<template>
  <ion-page>
    <ion-header>
      <SearchToolbar />
    </ion-header>
    <ion-content :fullscreen="true">
        <table class="table table-sm mb-5">
          <thead class="table-light sticky-top">
            <tr>
              <th scope="col"></th>
              <th scope="col">Giocatore</th>
              <th scope="col">Squadra</th>
              <th scope="col">G</th>
              <th scope="col">P</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="player in players" :key="player.id" @click="onClickRow(player)">
              <th scope="row">{{ player.id }}</th>
              <td class="text-truncate" style="max-width: 150px">{{ player.name }}</td>
              <td class="text-truncate" style="max-width: 150px">{{ player.team }}</td>
              <td>
                <strong>{{ player.goals }}</strong>
              </td>
              <td>{{ player.attendance }}</td>
            </tr>
          </tbody>
        </table>
    </ion-content>
  </ion-page>
</template>
<script lang="ts" setup>
import { IonContent, IonHeader, IonPage } from "@ionic/vue";
import SearchToolbar from "@/components/SearchToolbar.vue";
import { ref } from "vue";

const players = ref([
  { id: 1, name: "Simone Di Ricco", team: "Bombonera", goals: 20, attendance: 12 },
  { id: 2, name: "Marco Rossi", team: "Verciano", goals: 15, attendance: 10 },
  { id: 3, name: "Luca Bianchi", team: "Atletico una volta", goals: 10, attendance: 8 },
  { id: 4, name: "Alessio Russo", team: "Belli fighi", goals: 8, attendance: 6 },
  { id: 5, name: "Giulia Esposito", team: "Patetico madrid", goals: 5, attendance: 4 },
  { id: 6, name: "Fabio De Luca", team: "Atletico ma non troppo", goals: 5, attendance: 4 },
  { id: 7, name: "Lorenzo Ferrari", team: "Tagetic", goals: 5, attendance: 4 },
  { id: 8, name: "Martina Russo", team: "Neapolis", goals: 3, attendance: 2 },
  { id: 9, name: "Francesco Moretti", team: "Bombonera", goals: 18, attendance: 10 },
  { id: 10, name: "Sara Esposito", team: "Verciano", goals: 12, attendance: 8 },
  { id: 11, name: "Giovanni Rizzo", team: "Atletico una volta", goals: 6, attendance: 5 },
  { id: 12, name: "Laura Rossi", team: "Belli fighi", goals: 4, attendance: 3 },
  { id: 13, name: "Andrea Bianchi", team: "Patetico madrid", goals: 2, attendance: 2 },
  { id: 14, name: "Federica Ricci", team: "Atletico ma non troppo", goals: 1, attendance: 1 },
  { id: 15, name: "Paolo Ferrari", team: "Tagetic", goals: 3, attendance: 3 },
  { id: 16, name: "Giacomo Esposito", team: "Neapolis", goals: 9, attendance: 7 },
  { id: 17, name: "Elisa Russo", team: "Bombonera", goals: 14, attendance: 9 },
  { id: 18, name: "Davide Moretti", team: "Verciano", goals: 7, attendance: 6 },
  { id: 19, name: "Federico Rizzo", team: "Atletico una volta", goals: 3, attendance: 3 },
  { id: 20, name: "Chiara Ferrari", team: "Belli fighi", goals: 2, attendance: 2 },
]);

function onClickRow(player: any) {
  console.log(player);
}
</script>
