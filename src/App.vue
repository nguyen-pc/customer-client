<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "./components/NavbarView.vue";
import FooterView from "./components/FooterView.vue";
</script>

<template>
  <div id="app">
    <NavBar />
    <RouterView />
    <FooterView />
  </div>
</template>
