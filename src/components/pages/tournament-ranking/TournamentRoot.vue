/* eslint-disable */

<template>
  <div class="card pb-4">
    <DataTable
      scrollable
      scrollHeight="flex"
      :class="`p-datatable-sm custom-table`"
      :value="getTeamsRanking"
      dataKey="name"
      stripedRows
    >
      <Column frozen>
        <template #body="{ index }">
          {{ index }}
        </template>
      </Column>
      <Column
        field="name"
        frozen
        sortable
        header="Squadra"
        style="width: 180px; max-width: 180px"
        class="white-space-nowrap overflow-x-hidden text-overflow-ellipsis"
      ></Column>
      <Column field="points" sortable header="PT" class="font-bold"></Column>
      <Column field="matches" sortable header="G"></Column>
      <Column field="won_matches" sortable header="V"></Column>
      <Column field="drawn_matches" sortable header="PA"></Column>
      <Column field="lost_matches" sortable header="PE"></Column>
      <Column field="goals_scored" sortable header="GF"></Column>
      <Column field="goals_conceded" sortable header="GS"></Column>
      <Column field="fair_play" sortable header="CD"></Column>
    </DataTable>
  </div>
  <div class="grid ml-1" v-for="(value, key) in standingsLegend" :key="key">
    <label for="firstname3" class="col-fixed" style="width: 40px"
      ><strong>{{ key }}</strong></label
    >
    <div class="col">
      {{ value }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "@/store/main";
import { standingsLegend } from "@/constants";
import { storeToRefs } from "pinia";

const { getTeamsRanking } = storeToRefs(useStore());
</script>

<style scoped>
.custom-table :deep(.p-datatable-tbody > tr > td) {
  padding: 6px;
}

.custom-table {
  width: 100%;
  height: min-content;
}

.card {
  display: flex;
  height: min-content;
}
</style>
