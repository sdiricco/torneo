<template>
  <TournamentsPageTemplate>
    <div class="p-4">
      <div v-if="!tournaments.length" class="text-center mt-6">
        <div class="flex align-items-center justify-content-center">
          <div class="font-bold text-color-secondary mr-2">
            E' necessario aspettare fino a un minuto
          </div>
          <i class="pi pi-exclamation-circle text-color-secondary"></i>
        </div>

        <div class="text-4xl text-color mb-6">Mi sto connettendo al server</div>
        <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
      </div>
      <Accordion :activeIndex="0" v-else>
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
    </div>
  </TournamentsPageTemplate>
</template>

<script lang="ts" setup>
/* IONIC COMPONENTS */
import { computed } from "vue";
import { onMounted } from "vue";
import { useStore } from "@/store/main";
import { groupBy } from "lodash";
import { storeToRefs } from "pinia";
import router from "@/router";
import TournamentsPageTemplate from "@/components/layout/TournamentsPageTemplate.vue";

const mainStore = useStore();

const { tournaments } = storeToRefs(mainStore);

const tournamentsGrouped = computed(() =>
  groupBy(tournaments.value, "location")
);

function onClickTournament(t: any) {
  router.push({ name: "TournamentHome", params: { id: t.id } });
}
onMounted(async () => {
  await mainStore.fecthTournaments();
});
</script>

<style scoped></style>
