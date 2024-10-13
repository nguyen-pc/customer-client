<template>
  <div class="col-lg-12">
    <div class="row g-4">
      <div v-for="data in filteredData" :key="data.id" class="col-md-6 col-lg-4 pr-2">
        <div class="card" style="width: 18rem">
          <img
            :src="`http://localhost:3500/uploads/${data.cover}`"
            class="card-img-top"
            alt="card"
          />
          <div class="card-body">
            <h5 class="card-title">{{ data.name }}</h5>
            <!-- <h5 class="card-title">{{ data.cover }}</h5> -->
            <p class="card-text">Số lượng: {{ data.number }}</p>
            <div class="flex">
              <button class="btn btn-primary">Giá: {{ data.unitCost }}</button>
              <button @click="borrowBook(data)" class="btn btn-primary">
                Xem chi tiết
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { useBookStore } from "../../src/stores/book";

const router = useRouter();
const route = useRoute();
const bookStore = useBookStore();

// Fetch data on route query changes
const pageNumber = computed(() => Number(route.query.pageNumber) || 1);
const limit = 10;
const fetchBooks = async () => {
  try {
    await bookStore.getAllBooks(pageNumber.value - 1, limit);
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

onMounted(fetchBooks);
const filteredData = computed(() => {
  return (bookStore.allBooks as any).data;
});

const borrowBook = (book: any) => {
  router.push({ name: "Borrow", params: { id: book._id } });
};
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: space-around;
}
</style>
