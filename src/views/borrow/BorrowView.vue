<template>
  <div class="container">
    <div v-if="book">
      <div class="book-details flex">
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
      <div class="comments-container">
        <div class="comments-header">Bình luận của bạn:</div>
        <!-- Ô nhập bình luận -->
        <div class="comment-input-container">
          <input
            v-model="formData.text"
            placeholder="Nhập bình luận của bạn..."
            class="comment-input"
          />
          <button @click="submitComment" class="btn btn-primary">Gửi bình luận</button>
          <!--v-model="newComment"  @click="submitComment" -->
        </div>
        <ul class="comment-list" v-if="userComments.length">
          <li class="comment-item" v-for="comment in userComments" :key="comment._id">
            <div class="comment-author">{{ comment.user.username }}</div>
            <div class="comment-text">{{ comment.text }}</div>
            <div class="comment-date">
              {{ new Date(comment.createdAt).toLocaleString() }}
            </div>
          </li>
        </ul>
        <p v-else>Không có bình luận nào.</p>
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
import { useCommentStore, type Comment} from "../../stores/comment";
import { useRoute } from "vue-router";
import { ref, onMounted, computed,reactive } from "vue";

const route = useRoute();
const bookStore = useBookStore();
const borrowStore = useBorrowStore();
const authStore = useAuthStore();
const commentStore = useCommentStore();
const book = ref(null);
const auth = ref(null);
const comments = ref([]);

const formData = reactive<Comment>({
  id:"",
  user:'',
  book:"",
  text:""
});

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

const fetchBookData = async () => {
  try {
    const bookId = route.params.id;
    const fetchedBook = await bookStore.getBookById(bookId);
    const fetchedComments = await commentStore.getAllComment();
    const fetchedAuth = await authStore.getUser();

    book.value = fetchedBook;
    auth.value = fetchedAuth;
    comments.value = fetchedComments;
    formData.book = fetchedBook
    formData.user = fetchedAuth

    // Lọc các bình luận cho người dùng hiện tại và sách hiện tại
    comments.value = fetchedComments.filter((fetchedComment: any) => {
      return (
        fetchedComment.book === book.value._id
      );
    });

    comments.value = comments.value.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    console.log(comments.value);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

console.log(formData)

async function submitComment() {
  try{
    const newComment =  await commentStore.createComment(formData)
    formData.text = "";
    comments.value.unshift(newComment)
    fetchBookData()
  }catch(e){
    console.log(e)
  }
}

onMounted(() => {
  fetchBookData();
});

const userComments = computed(() => comments.value);
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

/* comment */

/* Bình luận */
.comments-container {
  margin-top: 20px;
}

.comments-header {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
  border-bottom: 2px solid #eee;
  padding-bottom: 5px;
}

.comment-list {
  list-style: none;
  padding: 0;
}

.comment-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.comment-item:last-child {
  border-bottom: none;
}

.comment-text {
  font-size: 1rem;
  color: #555;
}

.comment-date {
  font-size: 0.8rem;
  color: #999;
  margin-top: 5px;
  text-align: right;
}

.comment-author {
  font-size: 0.9rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

/* Ô nhập bình luận */
.comment-input-container {
  margin-top: 20px;
}

.comment-input {
  width: 100%;
  height: 50px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  resize: none;
}

.btn {
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-success {
  background-color: #28a745;
}

.btn-success:hover {
  background-color: #218838;
}
.loading {
  text-align: center;
  font-size: 1.5rem;
  color: #777;
}
</style>
