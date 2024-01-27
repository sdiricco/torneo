<template>
  <div class="h-screen overflow-hidden">
    <div ref="elRefHeader" class="border-bottom-2 surface-border">
      <slot name="header" />
    </div>
    <div class="overflow-y-auto" :style="{height: contentHeight}">
      <slot />
    </div>
    <div ref="elRefFooter" class="sticky bottom-0">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useElementSize } from '@vueuse/core';

// Variables
const elRefHeader = ref<HTMLElement | null>(null);
const elRefFooter = ref<HTMLElement | null>(null);

const { height: headerHeight } = useElementSize(elRefHeader);
const { height: footerHeight } = useElementSize(elRefFooter);

const contentHeight = computed(() => `calc(100vh - ${headerHeight.value}px - ${footerHeight.value}px)`)
</script>
