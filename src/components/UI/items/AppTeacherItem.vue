<template>
    <div class="item">

        <img :src="teacher.image" :class="[isMain ? 'img-size-main' : 'img-size']" alt="Фотография преподователя" />

        <div class="item-container">

            <div class="block-main-left" v-if="isMain">
                <span class="span-new-line header fs-32">{{ teacher.lastName }}</span>
                <span class="fs-32 header">{{ `${teacher.firstName} ${teacher.middleName}` }}</span>
                <span class="fs-20 post span-new-line mt-10">{{ teacher.post }}</span>
                <span class="fs-20 content span-new-line mt-10">{{ teacher.scientificDegree }}</span>
            </div>
            <div v-else class="block-secondary-left">
                <span class="span-new-line header fs-32">{{ teacher.lastName }}</span>
                <span class="fs-32 header">{{ `${teacher.firstName} ${teacher.middleName}` }}</span>
            </div>

            <div class="block-main-right" v-if="isMain">
                <slot></slot>
            </div>
            <div v-else class="block-secondary-right">
                <span v-if="teacher.post" class="fs-20 post span-new-line mt-10">{{ teacher.post }}</span>
                <span class="fs-20 content span-new-line mt-10">{{ teacher.scientificDegree }}</span>
            </div>

        </div>
    </div>
</template>

<script lang="ts">

import { Teacher } from '@/api/model/ModelTypes';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'AppTeacherItem',
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
@use '@/assets/scss/utils.scss' as utils;

.item {
    display: grid;
    grid-template-columns: 1fr 4fr;
    background: prop.$teacher-item-background-color;

    .img-size {
        height: auto;
    }

    .img-size-main {
        height: auto;
    }

    @media screen and (min-width: 1500px) {

        .img-size {
            width: 300px;
        }

        .img-size-main {
            width: 368px;
        }
    }

    @media screen and (max-width: 1500px) {

        .img-size {
            width: 190px;
        }

        .img-size-main {
            width: 250px;
        }
    }

    .item-container {
        display: grid;
        grid-template-columns: 1.5fr 1fr;
        width: 93%;
        margin: auto auto;

        .block-main-left {
            display: flex;
            flex-flow: column;
        }

        .block-main-right {
            display: flex;
            flex-flow: column;
            width: auto;
        }

        .block-secondary-left {
            align-self: center;
        }

        .block-secondary-right {
            align-self: center;
        }
    }

    .post {
        @include utils.fontStyle($color: prop.$teacher-item-selection-color);
    }

    .content {
        @include utils.fontStyle($color: prop.$teacher-item-main-color);
    }

    .header {
        @include utils.fontStyle($weight: 500,
            $color: prop.$teacher-item-main-color);
    }

    .additional {
        @include utils.fontStyle($color: prop.$teacher-item-additional-color);
    }

    .span-new-line {
        display: block;
    }
}
</style>
