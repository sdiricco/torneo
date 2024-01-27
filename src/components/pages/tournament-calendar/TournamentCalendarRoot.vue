<template>
    <DataTable scrollable scrollHeight="100%" :class="`w-full`" :value="getTournamentCalendarValues" dataKey="team" stripedRows>
      <Column field="dateUtc" sortable header="Data" class="font-bold white-space-nowrap">
        <template #body="{ data }">
          {{ formatData(data.dateUtc) }}
        </template>
      </Column>
      <Column field="teamA" header="Squadra" class="white-space-nowrap"></Column>
      <Column field="teamB" header="Squadra" class="white-space-nowrap"></Column>
      <Column field="score" header="Risultato" class="font-bold"></Column>
      <Column field="location" header="Luogo" class="white-space-nowrap"></Column>

      <template #footer>
        <div class="flex align-items-center justify-content-center gap-3">
          <Button icon="pi pi-angle-left" text rounded severity="secondary" :disabled="week <= 1" @click="onPrevWeek" />
          <div>{{ `Giornata ${ week }` }}</div>
          <Button icon="pi pi-angle-right" text rounded severity="secondary" :disabled="week >= weekCount" @click="onNextWeek" />
        </div>
      </template>
    </DataTable>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "@/store/main";
import { storeToRefs } from "pinia";
import { DateTime } from "luxon";
import { useRoute } from "vue-router";

const id = useRoute().params.id as string;

const store = useStore()
const { getTournamentCalendarValues, tournamentCalendar } = storeToRefs(store);

function formatData(dateUtc: string) {
  return DateTime.fromISO(dateUtc).setLocale("it").toFormat("dd/MM");
}

const week = computed(() => tournamentCalendar.value?.week || 0);
const weekCount = computed(() => (tournamentCalendar.value?.weekCount || 0));

function onPrevWeek(){
  const prevWeek = week.value - 1;
  store.fetchTournamentCalendar(id, prevWeek)
}

function onNextWeek(){
  const nextWeek = week.value + 1;
  store.fetchTournamentCalendar(id, nextWeek)
}
</script>

<style scoped>


.custom-table {
  width: 100%;
}
</style>
