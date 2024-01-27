<template>
  <Dropdown
    @update:modelValue="onUpdateWeek"
    :modelValue="selectedWeek"
    :options="weekOptionList"
    optionLabel="label"
    placeholder="Seleziona una giornata"
    class="m-3" />
  <DataTable scrollable scrollHeight="100%" :class="`w-full`" :value="getTournamentCalendarValues" dataKey="team" stripedRows>
    <Column field="dateUtc" sortable header="Data" class="font-bold white-space-nowrap">
      <template #body="{ data }">
        {{ (data.dateUtc && formatDate(data.dateUtc)) || "-" }}
      </template>
    </Column>
    <Column field="teamA" header="Squadra" class="white-space-nowrap"></Column>
    <Column field="teamB" header="Squadra" class="white-space-nowrap"></Column>
    <Column field="score" header="Risultato" class="font-bold"></Column>
    <Column field="location" header="Luogo" class="white-space-nowrap"></Column>
    <template #footer>
      <div class="flex align-items-center justify-content-center gap-3">
        <Button icon="pi pi-angle-left" text rounded severity="secondary" :disabled="getIsLoading || week <= 1" @click="onPrevWeek" />
        <div>{{ `Giornata ${week}` }}</div>
        <Button icon="pi pi-angle-right" text rounded severity="secondary" :disabled="getIsLoading || week >= weekCount" @click="onNextWeek" />
      </div>
    </template>
  </DataTable>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import { useStore } from "@/store/main";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { formatDate } from "@/utils/date";
import { generateWeekList } from "@/utils/tournament-calendar";

const id = useRoute().params.id as string;

const store = useStore();
const { getTournamentCalendarValues, tournamentCalendar, getIsLoading } = storeToRefs(store);

const week = computed(() => tournamentCalendar.value?.week || 0);
const weekCount = computed(() => tournamentCalendar.value?.weekCount || 0);

const weekOptionList = computed(() => generateWeekList(weekCount.value));
const selectedWeek = computed(() => weekOptionList.value.find((w) => w.week === week.value));

async function onPrevWeek() {
  const prevWeek = week.value - 1;
  await store.fetchTournamentCalendar(id, prevWeek);
}

async function onNextWeek() {
  const nextWeek = week.value + 1;
  await store.fetchTournamentCalendar(id, nextWeek);
}

async function onUpdateWeek(weekOption: { label: string; week: number }) {
  await store.fetchTournamentCalendar(id, weekOption.week);
}
</script>

<style scoped>
.custom-table {
  width: 100%;
}
</style>
