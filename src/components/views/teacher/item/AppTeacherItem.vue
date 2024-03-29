<template>
  <div :class="{'item-container': !isMain}">
    <div class="edit-entrant-item-container">

      <img :src="teacher.urlImg" :class="[isMain ? 'img-size-main' : 'img-size']" alt="Фотография преподавателя"/>

      <div class="item-content ml-30">

        <div class="block-main-left" v-if="isMain">
          <span class="span-new-line header-container fs-32">{{ teacher.lastName }}</span>
          <span class="fs-32 header-container">{{ `${teacher.firstName} ${teacher.middleName}` }}</span>
          <span class="fs-20 post span-new-line mt-10">{{ teacher.postDepartment }}</span>
          <span class="fs-20 content span-new-line mt-10">{{ teacher.postTeacher }}</span>
          <span class="fs-20 content span-new-line mt-10">{{ teacher.postAdditional }}</span>
        </div>
        <div v-else class="block-secondary-left">
          <span class="span-new-line header-container fs-32">{{ teacher.lastName }}</span>
          <span class="fs-32 header-container">{{ `${teacher.firstName} ${teacher.middleName}` }}</span>
        </div>

        <div class="block-main-right" v-if="isMain">
          <slot></slot>
        </div>
        <div v-else class="block-secondary-right">
            <span v-if="teacher.postDepartment" class="fs-20 post span-new-line mt-10">{{
                teacher.postDepartment
              }}</span>
          <span class="fs-20 content span-new-line mt-10">{{ teacher.postTeacher }}</span>
          <span class="fs-20 content span-new-line mt-10">{{ teacher.postAdditional }}</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Teacher } from '@/types/site.types';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  icon: 'AppTeacherItem',
  props: {
    teacher: {
      type: Object as PropType<Teacher>,
      required: true,
    },
    isMain: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;
@use '@/assets/scss/utils.scss';

.item-container {
  border-left: 1rem prop.$primary-color solid;
  padding-left: 3rem;

  @include utils.phone-style {
    border-left: 0;
    padding-left: 0;
  }
}

.edit-entrant-item-container {
  display: grid;
  grid-template-columns: auto 4fr;
  background: prop.$main-second-color;
  border-radius: 4px;

  .img-size {
    width: 30rem;
    height: auto;
    align-self: center;
  }

  .img-size-main {
    width: 36.8rem;
    height: auto;
    align-self: center;
  }

  .item-content {
    display: grid;
    align-content: center;
    padding: 1rem 0 1rem 0;
    grid-template-columns: 1fr 1fr;

    .block-main-left {
      display: flex;
      flex-flow: column;
    }

    .block-main-right {
      justify-self: start;
      display: flex;
      flex-flow: column;
      width: auto;
    }

    .block-secondary-left {
      align-self: center;
    }

    .block-secondary-right {
      width: 90%;
      justify-self: start;
      align-self: center;
    }
  }

  .post {
    @include utils.font-style($color: prop.$primary-color);
  }

  .content {
    @include utils.font-style($color: prop.$main-first-color);
    word-wrap: break-word;
  }

  .header-container {
    @include utils.font-style($weight: 500,
    $color: prop.$main-first-color);
  }

  .additional {
    @include utils.font-style($color: prop.$main-first-transparent-color);
  }

  .span-new-line {
    display: block;
  }

  @include utils.phone-style {
    .img-size {
      width: 120px;
      border-bottom-left-radius: 4px;
      border-top-left-radius: 4px;
    }

    .img-size-main {
      width: 120px;
      border-bottom-left-radius: 4px;
      border-top-left-radius: 4px;
    }

    .item-content {
      grid-template-columns: 1fr;

      .block-main-right {
        display: none;
      }
    }
  }
}
</style>
