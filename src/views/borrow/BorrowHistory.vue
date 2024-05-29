<template>
  <div class="p-4 mt-10">
    <!-- <router-link :to="{ name: 'book:create' }" class="no-underline">
        <div class="bg-blue-500 p-2 text-white rounded-lg text-center no-underline">
          <font-awesome-icon :icon="faUserPlus" />
          Tạo sách
        </div>
      </router-link> -->
  </div>
  <div>
    <template v-if="!filteredData.length">
      <div>Không có mượn quyển sách nào</div>
    </template>
    <template v-else>
      <table class="min-w-full border-collapse block md:table">
        <thead class="block md:table-header-group">
          <tr
            class="border border-gray-300 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative"
          >
            <th
              v-for="column in columns"
              :key="column.key"
              class="bg-gray-200 p-2 text-gray-600 font-bold block md:table-cell"
            >
              {{ column.title }}
            </th>
            <th class="bg-gray-200 p-2 text-gray-600 font-bold block md:table-cell">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody class="block md:table-row-group">
          <tr
            v-for="row in filteredData"
            :key="row.id"
            class="bg-gray-100 border border-gray-300 md:border-none block md:table-row"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              class="p-2 text-gray-800 block md:table-cell"
            >
              {{ renderCell(row, column) }}
            </td>
            <td class="p-2 text-gray-800 block md:table-cell">
              <button @click="returnBook(row)" class="text-blue-500">Trả sách</button>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { useBorrowStore } from "../../stores/borrow";
import { useAuthStore } from "@/stores/auth";
import { useBookStore } from "@/stores/book";

const route = useRoute();
const bookStore = useBookStore();
const borrowStore = useBorrowStore();
const authStore = useAuthStore();
const book = ref(null);
const auth = ref(null);

const query = ref("");

const columns = [
  { title: "Tên sách", dataIndex: "book.name", key: "book" },
  { title: "Ngày mượn", dataIndex: "borrowedDay", key: "borrowedDay" },
  { title: "Hạn trả", dataIndex: "estimatedReturnDate", key: "estimatedReturnDate" },
  { title: "Ngày đã trả", dataIndex: "actualReturnDate", key: "actualReturnDate" },
];

const fetchBorrow = async () => {
  try {
    await borrowStore.getUserBorrow("6650c259a20403717fa623c4");
    // return borrowData;
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

onMounted(fetchBorrow);
console.log(borrowStore.allBorrows);

// onMounted(async () => {
//   try {
//     const bookId = route.params.id;
//     const fetchedBook = await bookStore.getBookById(bookId);
//     const fetchAuth = await authStore.getUser();
//     book.value = fetchedBook;
//     auth.value = fetchAuth;
//     console.log(book.value, auth.value);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// });

const filteredData = computed(() => {
  if (!query.value) {
    return borrowStore.allBorrows;
  }
  return borrowStore.allBorrows.filter((item: any) => {
    return Object.values(item).some((value) =>
      String(value).toLowerCase().includes(query.value.toLowerCase())
    );
  });
});

const renderCell = (row: any, column: any) => {
  const keys = column.dataIndex.split(".");
  let value = row;
  try {
    keys.forEach((key: any) => {
      value = value[key];
    });
  } catch (error) {
    console.error("Error accessing value for column:", column, "row:", row);
    value = ""; // Hoặc giá trị mặc định nào đó nếu cần thiết
  }
  return value !== undefined && value !== null ? value : "";
};

const returnBook = async (row: any) => {
  try {
    // Gọi API để trả sách và cập nhật thông tin trả sách
    await borrowStore.returnBook(row.id);

    // Cập nhật lại danh sách borrow và số lượng sách sau khi trả sách
    await fetchBorrow();
    await bookStore.getAllBooks();
    alert("Trả sách thành công");
  } catch (error) {
    console.error("Error returning book:", error);
    alert("Có lỗi xảy ra khi trả sách");
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid black;
  padding: 8px;
}
th {
  background-color: #f4f4f4;
}
</style>
