<template>
    <div class="item item-size">

      <div class="item-drawing">
        <img :src="drawings[index]" alt="Рисунок" />
      </div>

      <div class="item-content-container">
        <div class="item-content">

          <h3 class="title fs-26">{{ info.title }}</h3>

          <span class="fs-24 mt-20">{{ info.degree }}</span>

          <span class="fs-24 mt-10">{{ info.formTraining }}</span>

          <span class="fs-24 mt-10">{{ info.durationTraining }}</span>

        </div>
      </div>

    </div>
</template>

<script lang="ts">
import { InformationDirection } from '@/api/model/ModelTypes';
import { defineComponent, PropType, computed } from 'vue';
import typeOne from '@/assets/images/draws/type1.svg';
import typeTwo from '@/assets/images/draws/type2.svg';
import typeThree from '@/assets/images/draws/type3.svg';

export default defineComponent({
  name: 'AppDirectionItem',
  props: {
    info: {
      type: Object as PropType<InformationDirection>,
      required: true,
    },
    indexDrawing: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    const drawings = [typeOne, typeTwo, typeThree];

    const index = computed(() => props.indexDrawing - (drawings.length * (Math.floor(props.indexDrawing / drawings.length))));

    return {
      drawings,
      index,
    };
  },
});
</script>

<style lang="scss" scoped>
$item-background-color: #282828;
$title-color: #FFFFFF;
$text-color: rgba(255, 255, 255, 0.5);

@media screen and (min-width: 1500px) {
  .item-size {
    width: 415px;
    height: 750px;
  }

  img {
    width: 415px;
  }
}

@media screen and (max-width: 1500px) {
  .item-size {
    width: 300px;
    height: 500px;
  }

  img {
    width: 300px;
  }
}

.item {
  display: flex;
  flex-flow: column;
  border-radius: 8px;
  background: $item-background-color;

  .item-drawing {
    display: flex;
    justify-content: flex-end;

    img {
      border-radius: 8px 8px 0 0;
    }
  }

  .item-content-container {
    height: 100%;
    display: flex;
    flex-flow: row;

    .item-content {
      align-self: flex-end;
      padding: 0 0 11% 5%;

      .title {
        color: $title-color;
        font-weight: 700;
        font-style: normal;
      }

      span {
        display: block;
        color: $text-color;
        font-weight: 400;
        font-style: normal;
      }
    }
  }
}
</style>
