<template>
  <div class="item item-size">

    <div class="item-icon ml-20">
      <div class="circle">
        <img :src="icons[iconIndex]" alt="Иконка" />
      </div>
    </div>

    <div class="item-title">
      <h4 class="title fs-48">{{ aboutInfo.title }}</h4>
    </div>

    <div class="item-description">
      <p class="description fs-32">{{ aboutInfo.description }}</p>
    </div>

  </div>
</template>

<script lang="ts">
import { InformationFaculty } from '@/api/model/ModelTypes';
import { defineComponent, PropType } from 'vue';
import humanSvg from '@/assets/images/icons/human.svg';
import bookSvg from '@/assets/images/icons/book.svg';
import suitcaseSvg from '@/assets/images/icons/suitcase.svg';

export default defineComponent({
  name: 'AppAboutScreenItem',
  props: {
    aboutInfo: {
      type: Object as PropType<InformationFaculty>,
      required: true,
    },
    iconIndex: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const icons = [humanSvg, bookSvg, suitcaseSvg];

    return {
      icons,
    };
  },
});
</script>

<style lang="scss" scoped>
$circle-color: #E5E3FF;
$title-text-color: #111111;
$description-text-color: #7B7A83;

@media screen and (min-width: 1500px) {
  .item-size {
    width: 415px;
    height: auto;
  }

}

@media screen and (max-width: 1500px) {
  .item-size {
    width: 300px;
    height: auto;
  }

}

.item {

  display: flex;
  flex-flow: column;

  .item-icon {
    width: 78px;
    height: 78px;

    .circle {
      position: relative;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: $circle-color;

      img {
        position: absolute;
        top: 25%;
        right: 25%;
        width: 64px;
        height: 64px;
      }
    }

  }

  .item-title {
    margin-top: 1.5rem;

    .title {
      color: $title-text-color;
      font-weight: 500;
      font-style: normal;
    }
  }

  .item-description {
    margin-top: 1.5rem;

    .description {
      font-weight: 400;
      font-style: normal;
      color: $description-text-color;
      line-height: 99%;
    }
  }

}
</style>
