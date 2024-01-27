<template>
  <div v-for="item in matchList" class="border-bottom-1 surface-border p-2 mb-1">
    <div class="flex justify-content-between mb-1">
      <div class="flex align-items-center">
        <font-awesome-icon :icon="['fas', 'shirt']" class="mr-2" />
        <div class="text-color">
          {{ item.teamA }}
        </div>
      </div>
    </div>
    <div class="flex justify-content-between">
      <div class="flex align-items-center">
        <font-awesome-icon :icon="['fas', 'shirt']" class="mr-2" />
        <div class="text-color">
          {{ item.teamB }}
        </div>
      </div>
    </div>
    <small class="text-color-secondary">
      {{ `${formatDate(item.dateUtc)}, ${item.location}` }}
    </small>
  </div>
</template>

<script lang="ts" setup>
import { INextMatchResult } from "@/api/interfaces";
import { formatDate } from "@/utils/date";

interface Props {
  matchList: INextMatchResult[];
}

defineProps<Props>();
</script>
