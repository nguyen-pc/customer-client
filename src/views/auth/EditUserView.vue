<template>
  <div id="user">
    <div class="container">
      <div v-if="user" class="card card-body mt-4">
        <form @submit.prevent="submit">
          <p v-if="errorMessage" class="text-red-500 mb-4">
            {{ errorMessage }}
          </p>
          <div class="mb-4">
            <label for="username" class="form-label">Username</label>
            <input
              v-model="formData.username"
              type="text"
              class="form-control"
              id="username"
              autocomplete="off"
            />
          </div>
          <div class="mb-4">
            <label for="first_name" class="form-label">First Name</label>
            <input
              v-model="formData.first_name"
              type="text"
              class="form-control"
              id="first_name"
              autocomplete="off"
            />
          </div>
          <div class="mb-4">
            <label for="last_name" class="form-label">Last Name</label>
            <input
              v-model="formData.last_name"
              type="text"
              class="form-control"
              id="last_name"
              autocomplete="off"
            />
          </div>
          <div class="mb-4">
            <label for="email" class="form-label">Email address</label>
            <input
              v-model="formData.email"
              type="email"
              class="form-control"
              id="email"
              autocomplete="off"
            />
          </div>
          <button type="submit" class="btn btn-success w-[30%]">Cập nhật</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useAuthStore, type EditData } from "../../stores/auth";
import { computed, onMounted, reactive, ref } from "vue";

const route = useRoute();
const router = useRouter()
const authStore = useAuthStore();

const errorMessage = ref<string>("");

const formData = reactive<EditData>({
  username: "",
  email: "",
  first_name: "",
  last_name: "",
});

onMounted(async () => {

    const user = await authStore.getUserById(route.params.id);
    formData.username = user.username;
    formData.email = user.email;
    formData.first_name = user.first_name;
    formData.last_name = user.last_name;

});

async function submit() {
  try {

      await authStore.updateUser(route.params.id, formData);

    router.push({ name:"user" });
  } catch (err:any) {
    errorMessage.value = err.message;
  }
}

const user = computed(() => {
  console.log(authStore.userDetail);
  return authStore.userDetail;
});

async function getUser() {
  await authStore.getUser();
}

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
