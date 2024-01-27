<template>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "@/store/main";
import { watchDebounced } from "@vueuse/core";

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
    intervalId = setTimeout(() => (longLoading.value = true), 5000);
  } else {
    longLoading.value = false;
    clearInterval(intervalId);
    intervalId = null;
  }
});
</script>
