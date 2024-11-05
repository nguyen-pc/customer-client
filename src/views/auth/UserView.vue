<template>
  <div id="user">
    <div class="container">
      <Suspense>
        <template #default>
          <div v-if="user" class="card card-body mt-4">
            <h2>Thông tin tài khoản</h2>
            <h5 class="card-subtitle mb-3 text-muted">Username: {{ user.username }}</h5>
            <h6 class="card-subtitle mb-3 text-muted">Email: {{ user.email }}</h6>
            <h6 class="card-subtitle mb-3 text-muted">
              First Name: {{ user.first_name }}
            </h6>
            <h6 class="card-subtitle mb-3 text-muted">Last Name: {{ user.last_name }}</h6>
            <h6 class="card-subtitle mb-3 text-muted">Full Name: {{ user.full_name }}</h6>
            <button @click="editUser(user)" class="btn btn-success">Chỉnh sửa</button>
          </div>
        </template>

        <template #fallback>
          <p>Loading...</p>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { computed, onMounted } from "vue";
const router = useRouter();
const authStore = useAuthStore();

const user = computed(() => {
  console.log(authStore.userDetail);
  return authStore.userDetail;
});

console.log(user.value.id);

async function getUser() {
  await authStore.getUser();
}

const editUser = (user: any) => {
  router.push({ name: "editUser", params: { id: user.id } });
};
onMounted(async () => {
  await getUser();
});
</script>

<style scoped>
#user .card {
  max-width: 40vw;
  margin: auto;
}
</style>
