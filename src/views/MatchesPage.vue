<template>
  <ion-page>
    <ion-header>
      <SearchToolbar />
    </ion-header>
    <ion-content>
      <ul class="list-group">
        <li class="list-group-item" v-for="m in matches" :key="m.id">
          <div class="container">
            <div class="row align-items-start pb-2">
                <div class="col text-start">
                    <sub class="fw-bold">{{ `${getDateFormatted(m.date)} - ${getTimeFormatted(m.date)}` }}</sub>
                </div>
            </div>
            <div class="row align-items-end">
              <div class="col text-start">{{ m.homeTeam.name }}</div>
              <div class="col text-end">
                <strong>{{ m.homeTeam.score }}</strong>
              </div>
            </div>
            <div class="row align-items-end">
              <div class="col text-start">{{ m.awayTeam.name }}</div>
              <div class="col text-end">
                <strong>{{ m.awayTeam.score }}</strong>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </ion-content>
  </ion-page>
</template>
<script lang="ts" setup>
import { IonContent, IonHeader, IonPage } from "@ionic/vue";
import SearchToolbar from "@/components/SearchToolbar.vue";
import { onMounted, ref } from "vue";

import moment from "moment";
// Importa il locale italiano
import "moment/locale/it";

// Imposta il locale italiano come predefinito
moment.locale("it");

function getDateFormatted(d: string) {
  return moment(d).format("ddd DD MMM");
}

function getTimeFormatted(d: string) {
  return moment(d).format("HH:mm");
}

const matches = ref([
  {
    id: 1,
    homeTeam: { id: "bombonera", name: "Bombonera", score: 0 },
    awayTeam: { id: "verciano", name: "Verciano", score: 2 },
    date: "2023-06-02T20:30:00",
  },
  {
    id: 2,
    homeTeam: { id: "atalanta", name: "Atalanta", score: 1 },
    awayTeam: { id: "juventus", name: "Juventus", score: 1 },
    date: "2023-06-03T19:00:00",
  },
  {
    id: 3,
    homeTeam: { id: "liverpool", name: "Liverpool", score: 3 },
    awayTeam: { id: "manchester", name: "Manchester United", score: 2 },
    date: "2023-06-04T15:30:00",
  },
  {
    id: 4,
    homeTeam: { id: "real-madrid", name: "Real Madrid", score: 2 },
    awayTeam: { id: "barcelona", name: "Barcelona", score: 2 },
    date: "2023-06-05T21:15:00",
  },
  {
    id: 5,
    homeTeam: { id: "bayern-munich", name: "Bayern Munich", score: 4 },
    awayTeam: { id: "borussia-dortmund", name: "Borussia Dortmund", score: 1 },
    date: "2023-06-06T18:45:00",
  },
]);

onMounted(() => {});
</script>
