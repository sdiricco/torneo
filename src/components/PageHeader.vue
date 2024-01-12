<template>
  <ion-toolbar color="primary">
    <ion-buttons slot="start">
      <i class="p-2 pl-4 pi pi-arrow-left cursor-pointer" @click="onBack"></i>
    </ion-buttons>
    <ion-title>
      <slot/>
    </ion-title>
    <ion-progress-bar type="indeterminate" v-if="store.httpRequestOnGoing" color="secondary"></ion-progress-bar>
  </ion-toolbar>
</template>

<script lang="ts" setup>
import { IonToolbar, IonProgressBar, IonButtons, IonMenuButton, IonTitle, IonBreadcrumb, IonBreadcrumbs} from "@ionic/vue";

import { useStore } from "@/store/main";
import router from "@/router";

const store = useStore();

function onBack(){
  router.push({name: 'TournamentsPage'})
}

</script>

<style scoped>
ion-icon {
  font-size: 24px;
}

ion-buttons {
  margin: auto;
}

ion-searchbar {
  --border-radius: 24px;
  padding-bottom: 0px;
  padding-top: 0px;
}

.pt64 {
  padding-top: 64px;
}

.pb16 {
  padding-bottom: 16px;
}

.pr16 {
  padding-right: 16px;
}
</style>
