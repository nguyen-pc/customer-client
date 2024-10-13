<template>
  <div class="slider_container">
    <div class="slider">
      <div v-for="data in filteredData" :key="data.id" class="slider-item">
        <div class="item">
          <img src="../assets/images/author.png" class="img" />
          <div class="author_item">{{ data.name }}</div>
        </div>
      </div>
    </div>
    <button class="prev" @click="slide(-1)">&#10094;</button>
    <button class="next" @click="slide(1)">&#10095;</button>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { useAuthorStore } from "../../src/stores/author";

const route = useRoute();
const router = useRouter();
const authorStore = useAuthorStore();
const currentIndex = ref(0);

const pageNumber = computed(() => Number(route.query.pageNumber) || 1);
const limit = 10;

const fetchBooks = async () => {
  try {
    await authorStore.getAllAuthor(pageNumber.value - 1, limit);
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

onMounted(fetchBooks);
const filteredData = computed(() => {
  return (authorStore.allAuthor as any).data;
});

console.log(filteredData.value);

const slide = (direction: number) => {
  const totalItems = filteredData.value.length;
  currentIndex.value = (currentIndex.value + direction + totalItems) % totalItems;
};

// const borrowBook = (book: any) => {
//   router.push({ name: "Borrow", params: { id: book._id } });
// };
</script>

<style scoped>
.slider_container {
  position: relative;
  width: 100%;
  overflow: hidden;
  margin: auto;
}
.slider {
  display: flex;
  transition: transform 0.5s ease-in-out;
  /* transform: translateX(-100%); */
}
.slider-item {
  flex: 0 0 33.33%;
  max-width: 33.33%;
  box-sizing: border-box;
  padding: 20px;
  text-align: center;
}
.containers {
  display: flex;
  flex: row;
}

.img {
  width: 160px;
  height: 160px;
  border-radius: 50%;
}
.item {
  margin-top: 30px;
  margin-right: 80px;
  align-items: center;
  justify-content: center;
}
.author_item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  margin-top: -22px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border: 1px solid white;
  border-radius: 0 3px 3px 0;
  user-select: none;
  background-color: rgba(0, 0, 0, 0.1);
}

.next {
  right: 0;
  border-radius: 3px 3px 3px 3px;
}

.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
