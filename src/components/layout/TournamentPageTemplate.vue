<template>
  <ion-page>
    <ion-header>
      <slot name="header" />
    </ion-header>
    <ion-content :fullscreen="true">
      <slot />
      <ion-refresher slot="fixed">
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
</script>
