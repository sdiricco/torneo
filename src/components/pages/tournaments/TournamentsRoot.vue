<template>
  <span class="p-input-icon-left w-full mb-4">
    <i class="pi pi-search" />
    <InputText v-model="searchTerm" placeholder="Es: Amatori/dilettanti..." class="w-full" />
  </span>
  <Dropdown v-model="selectedCategory" :options="categories" placeholder="" class="mb-4" />
  <div>
    <div
      v-for="tournament in tournamentsFiltered"
      :key="tournament.id"
      @click="onClickTournament(tournament)"
      class="surface-ground hover:surface-hover cursor-pointer w-full py-2 px-4 surface-border border-1 border-round mb-2">
      <div class="flex justify-content-between align-items-center gap-6">
        <div>
          <div class="font-bold mb-2">
            {{ tournament.location }}
          </div>
          <div class="flex align-items-center">
            <small>{{ tournament.name }}</small>
          </div>
        </div>
        <div>
          <i class="pi pi-arrow-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useStore } from "@/store/main";
import { groupBy } from "lodash";
import { storeToRefs } from "pinia";
import { watchDebounced } from "@vueuse/core";

const mainStore = useStore();
const { tournaments, torunamentsV2 } = storeToRefs(mainStore);
const emit = defineEmits<{
  (e: "select:tournament", id: number): void;
}>();

const searchTerm = ref("");
const searchTermDebounced = ref("");

const selectedCity = ref();

const selectedCategory = ref("CALCIO A 5");
const categories = ref(["CALCIO A 5", "CALCIO A 7", "CALCIO A 11"]);

watchDebounced(
  searchTerm,
  () => {
    searchTermDebounced.value = searchTerm.value;
  },
  { debounce: 200, maxWait: 1000 }
);

const tournamentsFiltered = computed(() =>
  torunamentsV2.value.filter((t) => t.category === selectedCategory.value && t.path.toLowerCase().includes(searchTermDebounced.value))
);

const tournamentsGrouped = computed(() => groupBy(tournaments.value, "location"));

function onClickTournament(t: any) {
  emit("select:tournament", t.id);
}
</script>

<style scoped></style>
