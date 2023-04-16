<template>
  <div class="item">

    <the-modal-edit-entrant :is-show="isShow"
                            @close="toggleModal"
                            :modal-title="`Изменить раздел &quot${entrant.title}&quot`"
                            :entrant="entrant"/>

    <div class="item-title">
      <h3 class="fs-32 ml-20">{{ entrant.title }}</h3>

      <button v-if="isAuth"
              class="btn-standard-icon ml-20"
              @click="toggleModal">
        <img :src="refreshIcon"
             alt="assets/images/icon/refresh.svg">
      </button>
      <button v-if="isAuth"
              class="btn-warning-icon ml-10"
              @click="deleteEntrant">
        <img :src="trashcanIcon"
             alt="assets/images/icon/trashcan.svg">
      </button>
    </div>

    <div v-for="(item, index) in entrant.items" :key="item"
         :class="[index === 0 ? 'mt-10' : 'mt-30', 'item-content']">

      <h5 class="fs-24 ml-20">{{ item.name }}</h5>

      <ul>
        <li class="fs-24" v-for="point in item.points" :key="point">{{ point.point }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">

import { Entrant } from '@/types/site.types';
import { computed, defineComponent, PropType } from 'vue';
import refreshIcon from '@/assets/images/icons/refresh.svg';
import trashcanIcon from '@/assets/images/icons/trashcan.svg';
import { useStore } from 'vuex';
import useShowModal from '@/hooks/useShowModal';
import TheModalEditEntrant from '@/components/views/entrant/modal/TheModalEditEntrant.vue';
import useEditEntrant from '@/hooks/useEditEntrant';
import useAlerts from '@/hooks/useAlerts';

export default defineComponent({
  components: { TheModalEditEntrant },
  icon: 'AppEntrantScreenItem',
  props: {
    entrant: {
      type: Object as PropType<Entrant>,
      required: true,
    },
  },
  setup(props) {
    const { alerts } = useAlerts();
    const store = useStore();

    const {
      isShow,
      toggleModal,
    } = useShowModal();

    const { remove } = useEditEntrant();

    const deleteEntrant = async () => {
      try {
        await remove(props.entrant.id as string);
        alerts.value.push({
          type: 'info',
          message: 'Успешное удаление',
        });
      } catch (e) {
        alerts.value.push({
          type: 'warning',
          message: 'Не удалось удалить',
        });
      }
    };

    return {
      isShow,
      isAuth: computed(() => store.getters['auth/isAuth']),
      toggleModal,
      deleteEntrant,
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
    @include utils.fontStyle($weight: 500, $color: prop.$main-first-dark-color);
  }

  .item-content {

    h5 {
      text-align: justify;
      @include utils.fontStyle($weight: 600, $color: prop.$main-first-color);
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        text-align: justify;
        @include utils.fontStyle($color: prop.$main-first-elevate-color);

        &:before {
          content: "·";
          font-size: 3rem;
          padding-right: 1rem;
          line-height: 2rem;
        }
      }

    }
  }
}
</style>
