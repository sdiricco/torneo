/* eslint-disable */

<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="p-4">
        <Accordion :activeIndex="0">
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
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
/* IONIC COMPONENTS */
import { computed } from "vue";
import { IonContent, IonPage } from "@ionic/vue";
import { onMounted, ref } from "vue";
import { useStore } from "@/store/main";
import { groupBy } from "lodash";
import { storeToRefs } from "pinia";
import  router  from "@/router";

const mainStore = useStore();

const { tournaments } = storeToRefs(mainStore);

const tournamentsGrouped = computed(() =>
  groupBy(tournaments.value, "location")
);

function onClickTournament(t:any){
    router.push({name: 'StandingsPage', params: {id: t.id}})
}
onMounted(async () => {
  await mainStore.fecthTournaments();
});
</script>

<style scoped></style>
