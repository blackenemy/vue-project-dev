<script setup>

import { defineProps } from 'vue'



defineProps({
  DigimonList: Array,
  addToCart: Function
})
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-10">
    <div v-for="(digimon, index) in DigimonList" class="card w-full bg-base-100 shadow-xl" :key="index">
      <figure>
        <img class="w-full" :src="digimon.img"  />
      </figure>
      <div class="card-body">
        <h2 class="text-center uppercase font-bold">{{ digimon.name }}</h2>
        <p class="text-center ">{{ digimon.level }}</p>
        
      </div>
    </div>
  </div>
</template>