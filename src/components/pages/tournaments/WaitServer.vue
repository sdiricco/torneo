<template>
  <Dialog
    :visible="true"
    modal
    :show-header="false"
    :style="{ width: '25rem' }"
    :pt="{
      content: {
        class: 'border-round',
      },
    }">
    <div class="text-center mt-4">
      <div class="flex align-items-center justify-content-center mb-2">
        <div class="font-bold text-color-secondary mr-2">L'attesa stimata è di circa 30 secondi</div>
      </div>

      <div class="text-4xl text-color mb-6">Mi sto connettendo al server</div>

      <font-awesome-icon size="8x" :icon="['fas', 'futbol']" class="mb-6 text-color" spin />
    </div>
  </Dialog>
</template>

<script lang="ts" setup></script>

<style scoped></style>
