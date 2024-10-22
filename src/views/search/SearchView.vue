<template>
  <div class="container_search">
    <h1>Kết quả tìm kiếm cho "{{ searchQuery }}"</h1>
    <div class="flex_container" v-if="results.length > 0">
      <div class="" v-for="data in results" :key="data.id">
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
    <div v-else>
      <p>Không tìm thấy kết quả nào.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBookStore } from "@/stores/book";

const route = useRoute();
const router = useRouter();

const searchQuery = ref(route.query.q || "");
const results = ref([]);
const bookStore = useBookStore();

const pageNumber = computed(() => Number(route.query.pageNumber) || 1);
const limit = 10;
const fetchBooks = async () => {
  try {
    await bookStore.getAllBooks(pageNumber.value - 1, limit);
    console.log("bookStore.allBooks:", bookStore.allBooks);
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

onMounted(fetchBooks);

// Fetch all books once when the component is mounted
// const fetchBooks = async () => {
//   try {
//     await bookStore.getAllBooks(); // Assuming this action fetches books and stores them in the store
//   } catch (error) {
//     console.error("Error fetching books:", error);
//   }
// };

// Compute filtered results based on the search query
const filteredResults = computed(() => {
  let books = [];
  if (typeof bookStore.allBooks === "object" && bookStore.allBooks !== null) {
    if (Array.isArray(bookStore.allBooks)) {
      books = bookStore.allBooks;
    } else if (Array.isArray(bookStore.allBooks.data)) {
      books = bookStore.allBooks.data;
    } else {
      console.error("Unexpected structure of bookStore.allBooks:", bookStore.allBooks);
      return [];
    }
  } else {
    console.error("bookStore.allBooks is not an object:", bookStore.allBooks);
    return [];
  }

  return books.filter((book: any) =>
    book.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Watch for changes in the search query and update the results
watch(
  () => route.query.q,
  (newQuery) => {
    searchQuery.value = newQuery || "";
    results.value = filteredResults.value;
  }
);
onMounted(() => {
  fetchBooks();
  results.value = filteredResults.value; // Initial search when the component loads
});

const borrowBook = (book: any) => {
  router.push({ name: "Borrow", params: { id: book._id } });
};
console.log(results);
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: space-around;
}

.container_search {
  margin: 50px 50px 50px 50px;
}
.flex_container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>
