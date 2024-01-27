<template>
  <ion-app>
    <ion-router-outlet></ion-router-outlet>
  </ion-app>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import {useStore} from "@/store/main"
import { watchDebounced } from '@vueuse/core'

const {getIsLoading, isLoadingDebounced} = storeToRefs(useStore())

watchDebounced(getIsLoading, (value)=> {
  isLoadingDebounced.value = value
}, { debounce: 500})

import { IonApp, IonRouterOutlet } from "@ionic/vue";
</script>
