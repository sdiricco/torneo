<template>
  <div class="surface-ground p-4 h-full flex align-items-center justify-content-center">
    <div class="flex align-items-center justify-content-center">
      <Card>
        <template #content>
          <div class="flex align-items-center justify-content-center p-4">
            <Image :src="image" alt="logo" style="width: 100%" />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import router from "@/router";
const image = "assets/logo_aicslucca.png";

onMounted(() => {
  setTimeout(() => {
    router.push({ name: "TournamentsPage" });
  }, 2000);
});
</script>
