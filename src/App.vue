<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "./components/NavbarView.vue";
</script>

<template>
  <div id="app">
    <NavBar />
    <RouterView />
  </div>
</template>
