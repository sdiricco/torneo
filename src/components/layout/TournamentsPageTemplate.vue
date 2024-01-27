<template>
  <ion-page>
    <ion-header>
      <slot name="header" />
    </ion-header>
    <ion-content :fullscreen="true">
      <WaitServer v-if="longLoading" />
      <slot />
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonContent, IonPage, IonHeader } from "@ionic/vue";
import WaitServer from "@/components/pages/tournaments/WaitServer.vue"
import { useStore } from "@/store/main";
import { storeToRefs } from "pinia";
const {longLoading } = storeToRefs(useStore());
</script>
