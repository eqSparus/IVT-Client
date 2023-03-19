<template>
  <div class="item">

    <the-modal-add-entrant :is-show="isShow"
                           @close="changeShowModal"
                           :title-modal="`Изменить раздел &quot${entrant.title}&quot`"
                           :entrant="entrant"/>

    <div class="item-title">
      <h3 class="fs-32 ml-20">{{ entrant.title }}</h3>

      <button v-if="isAuth"
              class="btn-standard-icon ml-20"
              @click="changeShowModal">
        <img :src="refreshIcon"
             alt="assets/images/icon/refresh.svg">
      </button>
      <button v-if="isAuth"
              class="btn-warning-icon ml-10"
              @click="deleteEntrantEvent">
        <img :src="trashcanIcon"
             alt="assets/images/icon/trashcan.svg">
      </button>
    </div>

    <div v-for="(item, index) in entrant.items" :key="item.itemId"
         :class="[index === 0 ? 'mt-10' : 'mt-30', 'item-content']">

      <h5 class="fs-24 ml-20">{{ item.name }}</h5>

      <ul>
        <li class="fs-24" v-for="point in item.points" :key="point.pointId">{{ point.point }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">

import { Entrant } from '@/api/model/ModelTypes';
import { computed, defineComponent, PropType } from 'vue';
import refreshIcon from '@/assets/images/icons/refresh.svg';
import trashcanIcon from '@/assets/images/icons/trashcan.svg';
import { useStore } from 'vuex';
import useShowModal from '@/hooks/useShowModal';
import { deleteEntrant } from '@/api/EntrantApi';
import TheModalAddEntrant from '@/components/modals/entrant/TheModalChangeEntrant.vue';

export default defineComponent({
  components: { TheModalAddEntrant },
  icon: 'AppEntrantScreenItem',
  props: {
    entrant: {
      type: Object as PropType<Entrant>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    const {
      isShow,
      changeShowModal,
    } = useShowModal();

    const deleteEntrantEvent = async () => {
      await deleteEntrant(props.entrant.id as string);
      store.commit('entrant/removeEntrant', props.entrant.id);
    };

    return {
      isShow,
      isAuth: computed(() => store.getters['auth/isAuth']),
      changeShowModal,
      deleteEntrantEvent,
      refreshIcon,
      trashcanIcon,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;
@use '@/assets/scss/utils.scss' as utils;

.item {

  .item-title {
    display: flex;
    flex-flow: row;
  }

  h3 {
    text-align: justify;
    @include utils.fontStyle($weight: 500,
    $color: prop.$entrant-item-title-color);
  }

  .item-content {

    h5 {
      text-align: justify;
      @include utils.fontStyle($weight: 600,
      $color: prop.$entrant-item-title-content-color);
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        text-align: justify;
        @include utils.fontStyle($color: prop.$entrant-item-content-color);

        &:before {
          content: "·";
          font-size: 30px;
          padding-right: 10px;
          line-height: 20px;
        }
      }

    }
  }
}
</style>
