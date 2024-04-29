<script setup>
 
 import {onMounted,ref} from 'vue' 
 import UserLayout from '../../layouts/UserLayout.vue';
 import CardDogimonList from '@/components/DigimonList.vue'
 import { useDigimonProductStore } from '@/stores/user/digimon'; 
 import Loading from '@/components/Loading.vue'

 const DigimonStore = useDigimonProductStore()
 const isLoading = ref(false)

 onMounted(async () =>{
   isLoading.value = true
   await DigimonStore.loadlistdigimon()
   isLoading.value = false
   console.log(DigimonStore.list);
 })
</script>

<template>
     <UserLayout>
      <div class="hero h-96 bg-base-200">
         <div class="hero-content text-center">
            <div class="max-w-md">
               <h1 class="text-5xl font-bold">Prot Patawat</h1>
               <p class="text-2xl py-3">tailwindcss + daisyui</p>
               <p class="py-6">CnxDevSoft Junior Assignment</p>
            </div>
         </div>
      </div>
      <!-- list digimon -->
      <CardDogimonList 
      :DigimonList = "DigimonStore.list">
      </CardDogimonList>
      <Loading v-if="isLoading"></Loading>
     </UserLayout>
</template>

