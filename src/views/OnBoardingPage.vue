<template>
      <div class="p-4 flex justify-content-center align-items-center h-full text-center z-5">
        <div class="flex flex-column align-items-center justify-content-center">
          <Img :src="image" style="width: 65%" />
      
        </div>
      </div>

</template>

<script setup lang="ts">
import { onMounted } from "vue";
import router from "@/router";
const image = "assets/logo_aicslucca.png";
const imageBg = "assets/Group.png";

onMounted(() => {
  setTimeout(() => {
    router.push({ name: "TournamentsPage" });
  }, 3000);
});
</script>

<style scoped>

</style>
