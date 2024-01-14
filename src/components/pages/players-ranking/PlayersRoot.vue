<template>
  <div class="card">
    <DataTable
      scrollable
      scrollHeight="flex"
      :class="`p-datatable-sm custom-table`"
      :value="players"
      dataKey="team"
      stripedRows
    >
      <Column frozen>
        <template #body="{ index }">
          {{ index }}
        </template>
      </Column>
      <Column field="firstName" sortable header="Nome"></Column>
      <Column field="lastName" sortable header="Cognome"></Column>
      <Column field="goal" sortable header="G" class="font-bold"></Column>
      <Column
        field="team"
        sortable
        header="Squadra"
        style="width: 180px; max-width: 180px"
        class="white-space-nowrap overflow-x-hidden text-overflow-ellipsis"
      ></Column>
    </DataTable>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from "@/store/main";
import {storeToRefs} from "pinia"

const {players} =storeToRefs(useStore())
</script>

<style scoped>
.custom-table :deep(.p-datatable-tbody > tr > td) {
  padding: 6px;
}

.custom-table {
  width: 100%;
}

.card {
  display: flex;
  height: 100%;
}
</style>
