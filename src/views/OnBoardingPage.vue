<template>
  <div class="p-4 h-full flex justify-content-center bg-container">
    <img class="bg-image" :src="imageBg" alt="background" />
    <div class="flex h-13rem justify-content-center">
      <Image :src="image" alt="logo" style="width: 70%" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import router from "@/router";
const image = "assets/logo_aicslucca.png";
const imageBg = "assets/icon/bg-image.png"

// onMounted(() => {
//   setTimeout(() => {
//     router.push({ name: "TournamentsPage" });
//   }, 2000);
// });
</script>

<style scoped>
.bg-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.1;
}

.bg-color {
  background: linear-gradient(to bottom, #4c65abbb, #4c65ab);
}
</style>
