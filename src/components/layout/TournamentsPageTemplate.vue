<template>
  <ion-page>
    <ion-header>
      <slot name="header" />
    </ion-header>
    <ion-content :fullscreen="true">
      <slot />
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonContent, IonPage, IonHeader } from "@ionic/vue";
</script>
