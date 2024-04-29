<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useDigimonProductStore } from '@/stores/user/digimon'

import UserLayout from '@/layouts/UserLayout.vue'


import DigimonList from '@/components/DigimonList.vue'
import Loading from '@/components/Loading.vue'

const useDigimonStore = useDigimonProductStore()

const route = useRoute()
const router = useRouter()


const searchText = ref('')
const filterDigimon = ref([])

const isLoading = ref(false)

onMounted(async () =>{
   isLoading.value = true
   await useDigimonStore.loadlistdigimon()
   isLoading.value = false
   console.log(useDigimonStore.list);
 })

watch(() => route.query.q, (newSearchText) => {
  searchText.value = newSearchText
  filterDigimon.value = useDigimonStore.filterDigimonProducts(searchText.value)
}, { immediate: true })
</script>

<template>
  <UserLayout>
    <div class="m-10">
      <h1 class="text-3xl">Search: <span class="font-bold">{{ searchText }}</span></h1>
    </div>
    <div v-if="filterDigimon.length > 0">
      <DigimonList
        :DigimonList="filterDigimon"
      >
      </DigimonList>
    </div>
    
    <div class="m-10" v-else>
      <div class="text-center text-3xl">Digimon not found</div>
    </div>
    <Loading v-if="isLoading"></Loading>
  </UserLayout>
</template>