<template>
    <div class="item">

        <img :src="teacher.image" :class="[isMain ? 'img-size-main' : 'img-size']" alt="Заведующий кафедры" />

        <div class="item-container">

            <div class="block-main-right" v-if="isMain">
                <span class="span-new-line span-header fs-32">{{ teacher.lastName }}</span>
                <span class="fs-32 span-header">{{ `${teacher.firstName} ${teacher.middleName}` }}</span>
                <span class="fs-20 span-post span-new-line mt-10">{{ teacher.post }}</span>
                <span class="fs-20 span-content span-new-line mt-10">{{ teacher.scientificDegree }}</span>

                <div class="mt-80">
                    <app-link-icon class="mr-20" v-for="link in teacher.links" :key="link.id" :href="link.link"
                        :name="link.logo" :alt="`Иконака ${link.logo}`" />
                </div>
            </div>
            <div v-else class="block-secondary-right">
                <span class="span-new-line span-header fs-32">{{ teacher.lastName }}</span>
                <span class="fs-32 span-header">{{ `${teacher.firstName} ${teacher.middleName}` }}</span>
            </div>

            <div class="block-main-left" v-if="isMain">
                <div>
                    <span class="span-additional fs-20">Адрес</span>
                    <span class="fs-20 span-new-line span-content">{{ teacher.address }}</span>
                </div>
                <div class="block-footer mt-40">
                    <div>
                        <span class="span-additional fs-20">Телефон</span>
                        <span class="fs-20 span-new-line span-content">{{ teacher.phone }}</span>
                    </div>

                    <div>
                        <span class="span-additional fs-20">Почта</span>
                        <span class="fs-20 span-new-line span-content">{{ teacher.email }}</span>
                    </div>
                </div>
            </div>
            <div v-else class="block-secondary-left">
                <span v-if="teacher.post" class="fs-20 span-post span-new-line mt-10">{{ teacher.post }}</span>
                <span class="fs-20 span-content span-new-line mt-10">{{ teacher.scientificDegree }}</span>
            </div>

        </div>
    </div>
</template>

<script lang="ts">

import { Teacher } from '@/api/model/ModelTypes';
import { defineComponent, PropType } from 'vue';
import AppLinkIcon from './AppLinkIcon.vue';

export default defineComponent({
  components: { AppLinkIcon },
  name: 'AppTeacherItem',
  props: {
    teacher: {
      type: Object as PropType<Teacher>,
      required: true,
    },
    isMain: {
      type: Boolean,
      required: false,
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

        .block-main-right {
            display: flex;
            flex-flow: column;
            align-content: space-between;
        }

        .block-main-left {
            display: flex;
            flex-flow: column;
            width: auto;

            .block-footer {
                display: flex;
                flex-flow: row;
                justify-content: space-between;
            }
        }

        .block-secondary-right {
            align-self: center;
        }

        .block-secondary-left {
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
