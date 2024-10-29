<template>
  <div class="container">
    <div v-if="author">
      <div class="author-details flex">
        <div>
          <img
            src="../../assets/images/author.png"
            alt="Book Cover"
            class="author-cover"
          />
        </div>
        <div class="ml-20">
          <h1 class="author-title">{{ author.name }}</h1>
          <p class="detail">
            <span class="">{{ author.detail }}</span>
          </p>
        </div>
      </div>
    </div>

    <div v-else class="loading">
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useRoute } from "vue-router";
import { ref, onMounted, computed,reactive } from "vue";
import { toast, type ToastOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useAuthorStore } from "@/stores/author";
const route = useRoute();
const authorStore = useAuthorStore();
const author = ref(null);


const fetchAuthorData = async () => {
  try {
    const authorId = route.params.id;
    console.log(authorId)
    const fetchedAuthor = await authorStore.getAuthorById(authorId)

    author.value = fetchedAuthor;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

console.log(author)


onMounted(() => {
  fetchAuthorData();
});
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #fff;
}

.author-details {
  text-align: left;
}

.author-title {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #228b22;
}
.author-author {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
}

.author-cover {
  max-width: 100%;
  width: auto !important;
  height: unset !important;
  margin-bottom: 20px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.detail {
  max-width: 1000px;
  min-width: 700px;
}

.flex {
  display: flex;
}

.ml-20 {
  margin-left: 100px;
}

.loading {
  text-align: center;
  font-size: 1.5rem;
  color: #777;
}
</style>
