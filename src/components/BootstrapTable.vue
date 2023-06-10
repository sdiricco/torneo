<template>
  <ion-page>
    <ion-header>
      <SearchToolbar />
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="table-container">
        <table class="table table-sm mb-5">
          <thead class="table-light sticky-top">
            <tr>
              <th scope="col"></th>
              <th scope="col">Nome</th>
              <th scope="col">Cognome</th>
              <th scope="col">Squadra</th>
              <th scope="col">G</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(player, id) in players" :key="id" @click="onClickRow(player)">
              <th scope="row">{{ id + 1 }}</th>
              <td class="text-truncate" style="max-width: 150px">{{ player.firstName }}</td>
              <td class="text-truncate" style="max-width: 150px">{{ player.lastName }}</td>
              <td class="text-truncate" style="max-width: 150px">{{ player.team }}</td>
              <td>
                <strong>{{ player.goal }}</strong>
              </td>
            </tr>
          </tbody>
        </table>
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
.table-container {
  height: 50vh;
  overflow: auto;
}
</style>
