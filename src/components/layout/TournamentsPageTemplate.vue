<template>
  <PageTemplate>
    <template #header>
      <slot name="header" />
    </template>
    <WaitServer v-if="longLoading" />
    <slot />
  </PageTemplate>
</template>

<script lang="ts" setup>
import WaitServer from "@/components/pages/tournaments/WaitServer.vue";
import { useStore } from "@/store/main";
import { storeToRefs } from "pinia";
import PageTemplate from "./PageTemplate.vue";
const { longLoading } = storeToRefs(useStore());
</script>
