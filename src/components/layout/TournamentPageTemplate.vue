<template>
  <ion-page>
    <ion-header mode="md">
      <slot name="header" />
    </ion-header>
    <ion-content :fullscreen="true">
      <WaitServer v-if="longLoading" />
      <slot />
      <ion-refresher slot="fixed" @ion-refresh="onRefresh">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonContent,
  IonPage,
  IonHeader,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/vue";

import WaitServer from "@/components/pages/tournaments/WaitServer.vue"
import { useStore } from "@/store/main";
import { storeToRefs } from "pinia";
const {longLoading } = storeToRefs(useStore());

const emit = defineEmits(["refresh"]);

function onRefresh(evt: any) {
  emit("refresh");
  evt.target.complete();
}
</script>
