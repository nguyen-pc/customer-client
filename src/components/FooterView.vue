<template>
  <div class="footer">
      <div class="mb-20">
        <div class="footer_container">
          <img class="logo_img" src="../assets/images/logo.png"/>
          <div class="footer_title_logo">Bởi vì sách là thế giới</div>
        </div>
        <div class="footer_container">
          <img class="footer_img" src="../assets/images/address.webp"/>
          <span class="footer_text">Khu II, Đ. 3 Tháng 2, Xuân Khánh,<br> Ninh Kiều, Cần Thơ </span>
        </div>
        <div class="footer_container">
          <img class="footer_img" src="../assets/images/email.png"/>
          <div class="footer_text">nguyenb2203516@gmail.com</div>
        </div>
        <div class="footer_container">
          <img class="footer_img" src="../assets/images/phone.png"/>
          <div class="footer_text">0788812970</div>
        </div>
      </div>
      <div class="ml">
        <div class="footer_title">Giới thiệu</div>
        <div class="footer_text">Về BookStore</div>
        <div class="footer_text">Hệ thống hiệu sách</div>
        <div class="footer_text">Liên hệ chúng tôi</div>
      </div>
      <div class="ml">
        <div class="footer_title">Chính Sách</div>
        <div class="footer_text">Chính sách bảo mật</div>
        <div class="footer_text">Chính sách mượn/trả sách</div>
        <div class="footer_text">Chính sách vận chuyển</div>
      </div>
      <div class="ml">
        <div class="footer_title">Bản đồ</div>
        <div style="width: 100%"><iframe width="100%" height="200" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=300&amp;hl=en&amp;q=%C4%90%E1%BA%A1i%20h%E1%BB%8Dc%20C%E1%BA%A7n%20Th%C6%A1,%20Xu%C3%A2n%20Kh%C3%A1nh,Ninh%20ki%E1%BB%81u,%20C%E1%BA%A7n%20Th%C6%A1+(BookStore)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps devices</a></iframe></div>
      </div>
  </div>
  <diV>
  </diV>
</template>

<script setup lang="ts">

</script>
<style scoped>
.footer {
  display: flex;
  justify-content: space-around;
  width: 100;
  padding: 40px 0;
  margin-top: 40px;
  background-color: #e9f4ea;
}
.logo_img{
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.footer_container{
  display: flex;
  margin-top: 20px;

}
.footer_title_logo{
  margin-top: 35px;
  margin-left: 10px;
  font-size: 20px;
  font-weight: 400;
  font-style: italic;
  color: #228B22;
}
.footer_img{
  width: 20px;
  height: 20px;
  margin-right: 5px
}

.footer_title{
  font-size: 25px;
  font-weight: 600;
  color: #228B22;
  margin-bottom: 30px
}

.footer_text{
  margin-bottom: 20px;
}
.mb-20{
  margin-top: -35px;
}
/* .ml{
  margin-left: -200px;
} */

</style>
