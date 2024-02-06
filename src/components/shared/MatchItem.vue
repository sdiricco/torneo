<template>
  <div>
    <div class="flex justify-content-between mb-2">
      <div class="flex align-items-center">
        <font-awesome-icon :icon="['fas', 'shirt']" class="mr-2" />
        <div class="text-color">
          {{ match.teamA }}
        </div>
      </div>
      <div class="font-bold">
        {{ ("scoreA" in match && match.scoreA) || "-" }}
      </div>
    </div>
    <div class="flex justify-content-between mb-4">
      <div class="flex align-items-center">
        <font-awesome-icon :icon="['fas', 'shirt']" class="mr-2" />
        <div class="text-color">
          {{ match.teamB }}
        </div>
      </div>
      <div class="font-bold">
        {{ ("scoreB" in match && match.scoreB) || "-" }}
      </div>
    </div>
    <small class="text-color-secondary">
      {{ `${formatDate(match.dateUtc)}, ${match.location}` }}
    </small>
  </div>
</template>

<script lang="ts" setup>
import { ILatestMatchResult, INextMatchResult } from "@/api/interfaces";
import { formatDate } from "@/utils/date";

interface Props {
  match: ILatestMatchResult | INextMatchResult;
}

defineProps<Props>();
</script>
