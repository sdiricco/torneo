/* eslint-disable */

<template>
  <ion-page>
    <ion-header>
      <SearchToolbar />
    </ion-header>

    <ion-content :fullscreen="true">
      <table class="table table-sm mb-5">
        <thead class="table-light">
          <tr>
            <th scope="col"></th>
            <th scope="col">Squadra</th>
            <th scope="col">PT</th>
            <th scope="col">GF</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="team in teams" :key="team.id" @click="onClickRow(team)">
            <th scope="row">{{ team.id }}</th>
            <td>{{ team.name }}</td>
            <td>{{ team.points }}</td>
            <td>{{ team.goals }}</td>
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
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import SearchToolbar from "@/components/SearchToolbar.vue";

/* IONIC COMPONENTS */
import { IonContent, IonHeader, IonPage } from "@ionic/vue";
import { ref } from "vue";
const teams = ref([
  { id: 1, name: "Bombonera", points: 36, goals: 25 },
  { id: 2, name: "Verciano", points: 12, goals: 30 },
  { id: 3, name: "Atletico una volta", points: 11, goals: 28 },
]);

const legend = ref([
  {id: 1, name: 'PT', description: 'Punti totali' },
  {id: 2, name: 'G', description: 'Partite giocate' },
  {id: 3, name: 'V', description: 'Partite vinte' },
  {id: 4, name: 'P', description: 'Partite perse' },
])

function onClickRow(team: any) {
  console.log("team", team);
}
</script>
