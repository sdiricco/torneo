<template>
  <TournamentsPageTemplate>
    <template #header>
      <PageHeader title="AICS Lucca - Campionati di calcio a 5"/>
    </template>
    <div class="p-4">
      <WaitServer v-if="!tournaments.length" />
      <div v-else>
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
      </div>
    </div>
  </TournamentsPageTemplate>
</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useStore } from "@/store/main";
import { groupBy } from "lodash";
import { storeToRefs } from "pinia";
import router from "@/router";
import TournamentsPageTemplate from "@/components/layout/TournamentsPageTemplate.vue";
import WaitServer from "@/components/pages/tournaments/WaitServer.vue";
import PageHeader from "@/components/PageHeader.vue"

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
