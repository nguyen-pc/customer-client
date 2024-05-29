<script setup lang="ts">
import CardView from "../components/CardView.vue";
import Footer from "../components/FooterView.vue";
</script>

<template>
  <div
    id="carouselExampleIndicators"
    class="carousel slide bg-secondary"
    data-bs-ride="carousel"
  >
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img class="d-block" src="@/assets/images/img-03.png" alt="First slide" />
      </div>
      <div class="carousel-item">
        <img class="d-block w-70" src="@/assets/images/img-03.png" alt="Second slide" />
      </div>
      <div class="carousel-item">
        <img class="d-block w-70" src="@/assets/images/img-03.png" alt="Third slide" />
      </div>
    </div>
    <a
      class="carousel-control-prev"
      href="#carouselExampleIndicators"
      role="button"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </a>
    <a
      class="carousel-control-next"
      href="#carouselExampleIndicators"
      role="button"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </a>
  </div>
  <div class="mt-20 flex">
    <CardView />
  </div>
  <Footer />
</template>

<style scoped>
/* Custom styles for the carousel if needed */
.carousel-inner img {
  width: 100%;
  height: 460px;
}
.mt-20 {
  margin-left: 70px;
  margin-right: 70px;
  margin-top: 50px;
}
.flex {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.center {
  align-items: center;
  justify-content: center;
}
.with {
  width: 70%;
  height: 70%;
}
</style>
