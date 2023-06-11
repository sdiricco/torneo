/* eslint-disable */

<template>
  <ion-page>
    <ion-header>
      <SearchToolbar />
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="card">
        <DataTable
        scrollable 
        scrollHeight="flex"
        :class="`p-datatable-sm custom-table`"
        :value="mainStore.teams"
        dataKey="name"
        stripedRows>
        <Column frozen>
          <template #body="{ index }">
            {{ index }}
          </template>
        </Column>
        <Column field="name" frozen sortable header="Name" style="width: 180px; max-width: 180px;" class="white-space-nowrap overflow-x-hidden text-overflow-ellipsis" ></Column>
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
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import SearchToolbar from "@/components/SearchToolbar.vue";
/* IONIC COMPONENTS */
import { IonContent, IonHeader, IonPage } from "@ionic/vue";
import { onMounted, ref } from "vue";
import { useStore } from "@/store/main";

const mainStore = useStore();

onMounted(async () => {
  await mainStore.fecthStandings();
});
</script>


<style scoped>

.custom-table :deep(.p-datatable-tbody > tr > td){
  padding: 6px;
}

.custom-table{
  width: 100%;
}

.card{
  display: flex;
  height: 100%;
}
</style>