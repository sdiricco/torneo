<template>
    <HomeLayout/>
</template>
<script setup lang="ts">
import {onBeforeMount,} from "vue"
import HomeLayout from "@/components/layout/HomeLayout.vue" 
import {useStore} from "@/store/main"
import {useRoute} from "vue-router"

const id = useRoute().params.id as string

const store = useStore()

onBeforeMount(async()=> {
    await store.fecthTournamentDetails(id)
})
</script>