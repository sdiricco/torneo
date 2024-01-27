<template>
  <div class="surface-ground">
    <div class="flex" style="align-items: baseline">
      <Button v-if="showBackButton" icon="pi pi-arrow-left" text rounded severity="secondary" @click="onBack" class="ml-4" />
      <div class="p-4 text-color text-xl text-overflow-ellipsis overflow-x-hidden white-space-nowrap px-3">
        {{ title || '-' }}
      </div>
      <Button v-if="false" text rounded type="button" icon="pi pi-ellipsis-v" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
      <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
    </div>
    <ProgressBar v-if="store.isLoadingDebounced" mode="indeterminate" style="height: 5px" class="border-noround sticky bottom-0"></ProgressBar>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

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
    label: "Options",
    items: [
      {
        label: "Refresh",
        icon: "pi pi-refresh",
      },
      {
        label: "Export",
        icon: "pi pi-upload",
      },
    ],
  },
]);

const toggle = (event: any) => {
  menu.value.toggle(event);
};
</script>

<style scoped></style>
