<template>
  <ion-page>
    <ion-header>
      <SearchToolbar />
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="card">
        <DataTable scrollable scrollHeight="flex" :class="`p-datatable-sm custom-table`" :value="players" dataKey="team" stripedRows>
          <Column frozen>
            <template #body="{ index }">
              {{ index }}
            </template>
          </Column>
          <Column field="firstName" sortable header="Nome"></Column>
          <Column field="lastName" sortable header="Cognome"></Column>
          <Column field="goal" sortable header="G" class="font-bold"></Column>
          <Column field="team" sortable header="Squadra" style="width: 180px; max-width: 180px;" class="white-space-nowrap overflow-x-hidden text-overflow-ellipsis"  ></Column>
        </DataTable>
      </div>
    </ion-content>
  </ion-page>
</template>
<script lang="ts" setup>
import { IonContent, IonHeader, IonPage } from "@ionic/vue";
import SearchToolbar from "@/components/SearchToolbar.vue";
import { onMounted, ref } from "vue";
import { getPlayersFromAICSWebPage } from "@/services/scraper";
import { useStore } from "@/store/main";

let players = ref<any>([]);

function onClickRow(player: any) {
  console.log(player);
}

onMounted(async () => {
  useStore().httpRequestOnGoing = true;
  const response = await getPlayersFromAICSWebPage();
  players.value = response.data.data;
  useStore().httpRequestOnGoing = false;
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
