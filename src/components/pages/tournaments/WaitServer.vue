<template>
  <div class="text-center p-6">
    <div class="flex align-items-center justify-content-center mb-2">
      <div class="font-bold text-color-secondary mr-2">
        L'attesa stimata è di circa 30 secondi
      </div>
      <i class="pi pi-exclamation-circle text-color-secondary"></i>
    </div>

    <div class="text-4xl text-color mb-6">Mi sto connettendo al server</div>
    <ProgressBar :value="progressBarValue" :mode="mode" style="height: 32px"></ProgressBar>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";

let intervalId: any = null;
let progressBarValue = ref(0);
let indeterminate = ref(false);

const mode = computed(() => indeterminate.value ? 'indeterminate' : 'determinate')

onMounted(() => {
  intervalId = setInterval(() => {
    progressBarValue.value = progressBarValue.value < 100 ? progressBarValue.value + 1 : 100;
    indeterminate.value = progressBarValue.value >= 100 ? true : false;
  }, 500);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
  progressBarValue.value = 0;
});
</script>

<style scoped></style>
