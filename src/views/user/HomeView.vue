<script setup>
import { onMounted, ref, computed } from "vue";
import UserLayout from "../../layouts/UserLayout.vue";
import CardDogimonList from "@/components/DigimonList.vue";
import { useDigimonProductStore } from "@/stores/user/digimon";
import Loading from "@/components/Loading.vue";

const DigimonStore = useDigimonProductStore();
const isLoading = ref(false);

// Pagination state
const currentPage = ref(1);
const itemsPerPage = 10;

// Load the data on mount
onMounted(async () => {
  isLoading.value = true;
  await DigimonStore.loadlistdigimon();
  setTimeout(() => {
    isLoading.value = false;
  }, 5000);
});

// Compute paginated list
const paginatedDigimonList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return DigimonStore.list.slice(start, end);
});

// Total pages
const totalPages = computed(() =>
  Math.ceil(DigimonStore.list.length / itemsPerPage)
);

// Methods to change page
const goToPage = async (page) => {
  isLoading.value = true;
  currentPage.value = page;

  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
};
</script>

<template>
  <UserLayout v-if="isLoading != true">
    <div class="hero h-96 bg-base-200">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Prot Patawat</h1>
          <p class="text-2xl py-3">tailwindcss + daisyui</p>
          <p class="py-6">Front-End Developer</p>
        </div>
      </div>
    </div>
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">Digimon List</a>
      </div>
    </div>

    <div v-if="isLoading" class="flex items-center justify-center">
      <span class="loading loading-dots loading-lg"></span>
    </div>
    <!-- list digimon -->
    <CardDogimonList v-else :DigimonList="paginatedDigimonList" />

    <!-- Pagination controls -->
    <div class="flex justify-center py-4">
      <button
        class="btn btn-outline"
        :class="{ 'btn-disabled': currentPage === 1 }"
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
      >
        «
      </button>

      <div class="btn-group">
        <button
          v-for="page in totalPages"
          :key="page"
          class="btn"
          :class="{ 'btn-active': page === currentPage }"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
      </div>

      <button
        class="btn btn-outline"
        :class="{ 'btn-disabled': currentPage === totalPages }"
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
      >
        »
      </button>
    </div>
  </UserLayout>
  <UserLayout v-else>
    <div class="flex items-center justify-center">
      <span class="loading loading-dots loading-lg"></span>
    </div>
  </UserLayout>
</template>
