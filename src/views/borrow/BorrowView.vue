<template>
  <div class="container">
    <div v-if="book" class="book-details flex">
      <div>
        <img
          :src="`http://localhost:3500/uploads/${book.cover}`"
          alt="Book Cover"
          class="book-cover"
        />
      </div>
      <div class="ml-20">
        <h1 class="book-title">{{ book.name }}</h1>
        <p class="book-info">
          Số quyển còn lại: <span>{{ book.number }}</span>
        </p>
        <p class="book-info">
          Giá: <span>{{ book.unitCost }}</span>
        </p>
        <button @click="handleBorrow" class="btn btn-success">Đăng kí mượn</button>
      </div>
    </div>
    <div v-else class="loading">
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBookStore } from "../../stores/book";
import { useBorrowStore } from "../../stores/borrow";
import { useAuthStore } from "../../stores/auth";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const bookStore = useBookStore();
const borrowStore = useBorrowStore();
const authStore = useAuthStore();
const book = ref(null);
const auth = ref(null);

const handleBorrow = async () => {
  try {
    const borrowData = {
      user: auth.value._id, // Thay thế bằng ID người dùng hiện tại
      book: book.value._id,
      borrowedDay: new Date(),
      estimatedReturnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 ngày sau
    };
    await borrowStore.createBorrow(borrowData);
    alert("Đăng kí mượn sách thành công!");
    if (book.value.number > 0) {
      book.value.number -= 1;
    }
  } catch (error) {
    console.error("Error creating borrow:", error);
    alert("Có lỗi xảy ra khi đăng kí mượn sách.");
  }
};
const fetchBooks = async () => {
  try {
    await bookStore.getAllBooks();
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

onMounted(fetchBooks);

onMounted(async () => {
  try {
    const bookId = route.params.id;
    const fetchedBook = await bookStore.getBookById(bookId);
    const fetchAuth = await authStore.getUser();
    book.value = fetchedBook;
    auth.value = fetchAuth;
    console.log(book.value, auth.value);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #fff;
}

.book-details {
  text-align: left;
}

.book-title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
}

.book-cover {
  width: 100%;
  height: auto;
  max-height: 300px;
  margin-bottom: 20px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.book-info {
  font-size: 1.2rem;
  margin: 10px 0;
  color: #555;
}

.book-info span {
  font-weight: bold;
  color: #000;
}

.flex {
  display: flex;
}

.ml-20 {
  margin-left: 40px;
}

.loading {
  text-align: center;
  font-size: 1.5rem;
  color: #777;
}
</style>
