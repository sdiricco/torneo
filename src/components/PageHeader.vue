<template>
  <div class="p-3">
    <div class="flex" style="align-items: baseline">
      <i
        v-if="showBackButton"
        class="pr-2 pi pi-arrow-left cursor-pointer"
        @click="onBack"
      ></i>
      <div
        class="text-color text-xl text-overflow-ellipsis overflow-x-hidden white-space-nowrap px-3"
      >
        {{ title }}
      </div>
      <Button
        v-if="false"
        text
        rounded
        type="button"
        icon="pi pi-ellipsis-v"
        @click="toggle"
        aria-haspopup="true"
        aria-controls="overlay_menu"
      />
      <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
    </div>
  </div>
  <ion-progress-bar
    type="indeterminate"
    v-if="store.httpRequestOnGoing"
    color="secondary"
  ></ion-progress-bar>
</template>

<script lang="ts" setup>
import {ref} from "vue"
import {
  IonToolbar,
  IonProgressBar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonBreadcrumb,
  IonBreadcrumbs,
} from "@ionic/vue";

import { useStore } from "@/store/main";
import router from "@/router";

defineProps(["title", "showBackButton"]);

const store = useStore();

function onBack() {
  router.push({ name: "TournamentsPage" });
}

const menu = ref();
const items = ref([
    {
        label: 'Options',
        items: [
            {
                label: 'Refresh',
                icon: 'pi pi-refresh'
            },
            {
                label: 'Export',
                icon: 'pi pi-upload'
            }
        ]
    }
]);

const toggle = (event:any) => {
    menu.value.toggle(event);
};
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
