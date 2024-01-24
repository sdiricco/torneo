<template>
  <Accordion :multiple="true">
    <AccordionTab
      v-for="(tournamentsFiltered, key) in tournamentsGrouped"
      :key="key"
      :header="String(key)"
    >
      <div
        @click="onClickTournament(t)"
        v-for="t in tournamentsFiltered"
        class="font-bold p-3 mb-2 border-1 surface-border border-round surface-ground flex justify-content-between hover:surface-hover cursor-pointer"
      >
        <div>{{ t.name }}</div>
        <i class="pi pi-arrow-right"></i>
      </div>
    </AccordionTab>
  </Accordion>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "@/store/main";
import { groupBy } from "lodash";
import { storeToRefs } from "pinia";

const mainStore = useStore();
const { tournaments } = storeToRefs(mainStore);
const emit = defineEmits<{
  (e: 'select:tournament', id: number): void
}>()

const tournamentsGrouped = computed(() =>
  groupBy(tournaments.value, "location")
);

function onClickTournament(t: any) {
  emit('select:tournament', t.id)
}
</script>

<style scoped></style>
