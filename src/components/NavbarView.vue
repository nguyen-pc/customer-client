<template>
  <div class="bg-nav">
    <nav class="navbar navbar-expand-lg bg-info bg-white m-50">
      <div class="container-fluid">
        <router-link class="navbar-brand" :to="{ name: 'home' }"
          ><img class="logo" src="../assets/images/logo.png"
        /></router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#appNavbar"
          aria-controls="appNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="appNavbar">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link :to="{ name: 'home' }" class="nav-link" aria-current="page"
                >Trang chủ</router-link
              >
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'home' }" class="nav-link" aria-current="page"
                >Tin Sách</router-link
              >
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'home' }" class="nav-link" aria-current="page"
                >Tác giả</router-link
              >
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'home' }" class="nav-link" aria-current="page"
                >Liên hệ</router-link
              >
            </li>
          </ul>
          <div class="search">
            <input
              v-model="searchQuery"
              @keyup.enter="performSearch"
              placeholder="Tìm kiếm ..."
              class="nav-input"
            />
            <div class="btn-search">
              <img class="img-search" src="../assets/images/search.png" />
            </div>
          </div>
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li v-if="isAuthenticated" class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src="../assets/images/user.png" class="img" />
                {{ user.username }}
              </a>
              <ul class="dropdown-menu ml-20">
                <li>
                  <router-link
                    :to="{ name: 'BorrowHistory' }"
                    class="dropdown-item mr-20"
                    style="border-bottom: 1px solid #ccc; padding-bottom: 10px"
                    >Lịch sử mượn sách
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'user' }" class="dropdown-item"
                    >Profile
                  </router-link>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <button @click="logout" class="dropdown-item btn btn-danger">
                    Logout
                  </button>
                </li>
              </ul>
            </li>
            <template v-else>
              <li class="nav-item">
                <router-link :to="{ name: 'login' }" class="nav-link" aria-current="page"
                  >Login</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  :to="{ name: 'register' }"
                  class="nav-link"
                  aria-current="page"
                  >Register</router-link
                >
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "../stores/auth";
import { ref } from "vue";
import { computed } from "vue";
import { useRouter } from "vue-router";

const authStore = useAuthStore();

const router = useRouter();

const user = computed(() => {
  return authStore.user;
});

const searchQuery = ref("");

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: "search", query: { q: searchQuery.value } });
    searchQuery.value = "";
  }
};
const isAuthenticated = computed(() => {
  return authStore.isAuthenticated;
});

async function logout() {
  await authStore
    .logout()
    .then((res) => {
      router.replace({ name: "home" });
    })
    .catch((err) => {
      console.log(err.message);
    });
}
</script>

<style scoped>
.logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.nav-link {
  font-weight: 600;
  font-size: 17px;
}
.m-50 {
  margin-left: 50px;
  margin-right: 50px;
}
.bg-white {
  background-color: #e9f4ea !important;
}
.bg-nav {
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #e9f4ea !important;
  border-bottom: 2px solid green;
}

.bg-white {
  background-color: #e9f4ea !important;
}

.ml-20 {
  left: -130px !important;
}
.img {
  background-color: #e9f4ea;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.search {
  margin-right: 20px;
  display: flex;
}
.nav-input {
  padding: 10px;
  border-radius: 20px;
  border: 1px solid gray;
  width: 260px;
  height: 40px;
}
.btn-search {
  cursor: pointer;
  margin-top: 5px;
  margin-left: -30px;
}

.img-search {
  width: 15px;
  height: 15px;
}
</style>
