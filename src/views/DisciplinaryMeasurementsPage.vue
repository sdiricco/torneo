<template>
  <TournamentPageTemplate @refresh="onRefresh">
    <template #header>
      <PageHeader :title="tournamentName" :show-back-button="true"></PageHeader>
    </template>

    <div class=" flex align-items-center gap-3 justify-content-center p-4 text-color border-bottom-1 surface-border mb-4">
      <font-awesome-icon size="xl" :icon="['fas', 'note-sticky']" class="mb-1" />
      <div class="text-2xl text-color font-bold">
        Provvedimenti disciplinari
      </div>
    </div>

    <div v-if="warnings.length">
      <div class="text-xl text-color font-bold pl-2 mb-2">
        Ammonizioni
      </div>
      <DataTable
        scrollable
        scrollHeight="flex"
        :class="`p-datatable-sm custom-table`"
        :value="warnings"
        dataKey="team"
        stripedRows
      >
        <Column field="fullName" sortable header="Giocatore"></Column>
        <Column
          field="team"
          sortable
          header="Squadra"
          style="width: 180px; max-width: 180px"
          class="white-space-nowrap overflow-x-hidden text-overflow-ellipsis"
        ></Column>
        <Column
          field="number"
          sortable
          header="Amm."
          class="font-bold"
        ></Column>
      </DataTable>
    </div>
  </TournamentPageTemplate>
</template>

<script lang="ts" setup>
import TournamentPageTemplate from "@/components/layout/TournamentPageTemplate.vue";
import PageHeader from "@/components/PageHeader.vue";

import { storeToRefs } from "pinia";
import { useStore } from "@/store/main";
import { computed, onBeforeMount } from "vue";
import { useRoute } from "vue-router";

const store = useStore();
const { tournamentDetails, disciplinaryMeasurements } = storeToRefs(store);

const id = useRoute().params.id as string;

const tournamentName = computed(
  () => tournamentDetails.value && tournamentDetails.value.name
);

const warnings = computed<any[]>(() => {
  const warnings =
    (disciplinaryMeasurements.value &&
      disciplinaryMeasurements.value.warnings) ||
    [];
  return warnings.map((item: any) => {
    return {
      ...item,
      fullName: `${item.firstName} ${item.lastName}`,
    };
  });
});

async function onRefresh() {
  await store.fetchDisciplinaryMeasurements(id);
}

onBeforeMount(async () => {
  await store.fetchDisciplinaryMeasurements(id);
});
</script>
