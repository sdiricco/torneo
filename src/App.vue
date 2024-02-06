<template>
  <RouterView></RouterView>
  <AppDialog :visible="longLoading" fullscreen :show-header="false">
    <div class="p-4 flex justify-content-center align-items-center h-full text-center z-5">
      <div class="flex flex-column align-items-center justify-content-center">
        <img :src="image" style="width: 100%" class="mb-4" />
        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="4" />
      </div>
    </div>
  </AppDialog>
</template>

<script setup lang="ts">
import { watch, ref } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "@/store/main";
import { watchDebounced } from "@vueuse/core";
import AppDialog from "@/components/shared/AppDialog.vue";
const image = "assets/logo_aicslucca.png";

const { getIsLoading, isLoadingDebounced, longLoading } = storeToRefs(useStore());

watchDebounced(
  getIsLoading,
  (value) => {
    isLoadingDebounced.value = value;
  },
  { debounce: 500 }
);

let intervalId: any = null;

watch(getIsLoading, (value) => {
  if (value) {
    if (intervalId) {
      clearInterval(intervalId);
    }
    intervalId = setTimeout(() => (longLoading.value = true), 8000);
  } else {
    longLoading.value = false;
    clearInterval(intervalId);
    intervalId = null;
  }
});
</script>
