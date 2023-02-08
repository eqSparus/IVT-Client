<template>
    <div class="item">

        <img :src="teacher.image" :class="[isMain ? 'img-size-main' : 'img-size']" alt="Заведующий кафедры" />

        <div class="item-container">

            <div class="block-main-left" v-if="isMain">
                <span class="span-new-line span-header fs-32">{{ teacher.lastName }}</span>
                <span class="fs-32 span-header">{{ `${teacher.firstName} ${teacher.middleName}` }}</span>
                <span class="fs-20 span-post span-new-line mt-10">{{ teacher.post }}</span>
                <span class="fs-20 span-content span-new-line mt-10">{{ teacher.scientificDegree }}</span>
            </div>
            <div v-else class="block-secondary-left">
                <span class="span-new-line span-header fs-32">{{ teacher.lastName }}</span>
                <span class="fs-32 span-header">{{ `${teacher.firstName} ${teacher.middleName}` }}</span>
            </div>

            <div class="block-main-right" v-if="isMain">
                <slot></slot>
            </div>
            <div v-else class="block-secondary-right">
                <span v-if="teacher.post" class="fs-20 span-post span-new-line mt-10">{{ teacher.post }}</span>
                <span class="fs-20 span-content span-new-line mt-10">{{ teacher.scientificDegree }}</span>
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
$background-item: #FFFFFF;
$text-color-main: #111111;
$text-color-selection: #6162FF;
$text-color-additional: #11111180;

@media screen and (min-width: 1500px) {

    .img-size {
        width: 300px;
        height: auto;
    }

    .img-size-main {
        width: 368px;
        height: auto;
    }
}

@media screen and (max-width: 1500px) {

    .img-size {
        width: 190px;
        height: auto;
    }

    .img-size-main {
        width: 250px;
        height: auto;
    }
}

.item {
    display: grid;
    grid-template-columns: 1fr 4fr;
    background: $background-item;

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

    .span-post {
        color: $text-color-selection;
        font-weight: 400;
        font-style: normal;
    }

    .span-content {
        color: $text-color-main;
        font-weight: 400;
        font-style: normal;
    }

    .span-header {
        color: $text-color-main;
        font-weight: 500;
        font-style: normal;
    }

    .span-additional {
        color: $text-color-additional;
        font-weight: 400;
        font-style: normal;
    }

    .span-new-line {
        display: block;
    }
}
</style>
