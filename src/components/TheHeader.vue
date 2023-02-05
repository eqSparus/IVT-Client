<template>
  <header class="header mt-10">
    <nav class="header-content">

      <img src="@/assets/images/logo.svg" alt="Логотим" />

      <div class="header-menu">

        <div class="header-menu-links">
          <div class="link fs-24 mr-50">О кафедре</div>
          <div class="link fs-24 mr-50">Направления</div>
          <div class="link fs-24 mr-50">Абитуриенту</div>
          <div class="link fs-24 mr-50">Состав кафедры</div>
          <div class="link fs-24">Контакты</div>
        </div>

        <div class="ml-50 mr-50">
          <input type="button" value="ВОЙТИ" class="btn-standard-sm" />
        </div>

      </div>

    </nav>
  </header>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheHeader',
});
</script>

<style lang="scss" scoped>
$background-header-menu-color: #1A1A1A22;
$header-link-color: #ABAAB0;
$header-link-hover-color: #6162FF;

.header {
  position: fixed;
  width: 100%;
  z-index: 99999;

  .header-content {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;

    img {
      align-self: center;
      margin-left: 50px;
      width: 41px;
      height: 41px;
    }

    .header-menu {
      display: flex;
      flex-flow: row;
      align-items: center;

      .header-menu-links {

        background: $background-header-menu-color;
        border-radius: 143px;
        mix-blend-mode: difference;
        padding: 1.4rem 3rem;
        display: flex;
        flex-flow: row;
        justify-content: center;
        align-items: center;

        .link {
          font-weight: 400;
          font-style: normal;
          color: $header-link-color;

          &:hover {
            color: $header-link-hover-color;
            cursor: pointer;
          }
        }
      }
    }

  }
}
</style>
