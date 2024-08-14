<script setup lang="ts">
import CardView from "../components/CardView.vue";
import Footer from "../components/FooterView.vue";
import AuthorView from "../components/AuthorView.vue"
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
  <div class="m-50">
    <div class="b-green">Các Tác Giả</div>
    <AuthorView />
    <!-- <div class="border_bottom" /> -->
  </div>

  <!-- Book -->
  <div class="m-50">
    <div class="b-green">Các sách mới</div>
    <div class="mt-20 flex">
      <CardView />
    </div>
  </div>

  <!-- introduction -->
  <div class="m-50">
    <div class="b-green">Về Book Store</div>
    <div class="flex">
      <div class="text-banner">Nhã Nam, tên đầy đủ là Công ty Cổ phần Văn hóa và Truyền thông Nhã Nam, gia nhập thị trường sách Việt Nam vào tháng 2 năm 2005. Ngay từ cuốn sách đầu tiên, độc giả đã dành sự quan tâm và yêu mến cho một thương hiệu sách mới mẻ mang trong mình khát vọng góp phần tạo lập diện mạo mới cho xuất bản văn học tại Việt Nam.</div>
      <img src="../assets/images/banner.png"/>
    </div>
  </div>

  <Footer />
</template>

<style scoped>
/* Custom styles for the carousel if needed */
.carousel-inner img {
  width: 100%;
  height: 460px;
}
.m-50{
  margin-top: 50px;
  margin-left: 50px;
  margin-right: 50px;
}
.b-green{
  border-top: 3px solid green;
  padding-top: 10px;
  color: green;
  font-size: 30px;
  font-weight: 700;
}

.mt-20 {
  margin-left: 70px;
  margin-right: 70px;
  margin-top: 50px;
  margin-bottom: 50px;
}

.border_bottom{
  margin-top: 70px;
  border-bottom:3px solid green;
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
.text-banner{
  margin-right: 100px;
  margin-bottom: 250px;
  text-align: left;
  font-size: 17px;
}
</style>
