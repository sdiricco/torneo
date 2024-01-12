<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom" >
        <ion-tab-button
          v-for="tab in tabs"
          :key="tab.name"
          @click="onClickTab(tab.name)"
          :selected="route.name === tab.name"
        >
          <font-awesome-icon size="2x" :icon="tab.icon" />
          <ion-label>{{ tab.label }}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  IonApp,
  IonRouterOutlet,
  IonPage,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonTabs,
} from "@ionic/vue";
import { useRoute } from "vue-router";
import router from "@/router";

const route = useRoute();
const id = route.params.id;

const tabs = [
  {
    name: "TournamentRankingPage",
    label: "Classifica",
    icon: ["fas", "trophy"],
  },
  {
    name: "PlayersRankingPage",
    label: "Marcatori",
    icon: ["fas", "people-group"],
  },
];


function onClickTab(name: string) {
  router.push({ name, params: { id } });
}
</script>
