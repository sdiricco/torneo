<template>
  <ion-app>
    <!-- <ion-menu content-id="main-content">
      <sider-bar></sider-bar>
    </ion-menu> -->
    <ion-page id="main-content">
      <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">

        <!-- <ion-tab-button tab="matches" href="/matches">
          <font-awesome-icon size="2x" :icon="['fas', 'futbol']" />
          <ion-label>Partite</ion-label>
        </ion-tab-button> -->

        <ion-tab-button tab="ranking" href="/standings">
          <font-awesome-icon size="2x" :icon="['fas', 'trophy']" />
          <ion-label>Classifica</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="players" href="/players">
          <font-awesome-icon size="2x" :icon="['fas', 'people-group']" />
          <ion-label>Marcatori</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
    </ion-page>
  </ion-app>
</template>

<script lang="ts" setup>
import { IonApp, IonRouterOutlet, IonPage, IonMenu, IonTabBar, IonTabButton, IonLabel, IonIcon, IonTabs } from "@ionic/vue";
// import  SiderBar from './components/SideBar.vue'
import { onMounted } from "vue";
import { useStore } from "@/store/main";


const store = useStore();
onMounted(async () => {
  await store.loadApp();
  store.$subscribe(async (_mutations, state) => {
    await store.savePreferences(state.preferences);
  });
});
</script>

<style>
@import './main.css'
</style>
