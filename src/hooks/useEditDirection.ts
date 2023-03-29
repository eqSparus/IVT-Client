import { Direction } from '@/types/SiteContentTypes';
import { ref, toRefs } from 'vue';
import { maxValue, minValue, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import {
  requestCreateDirection,
  requestDeleteDirection,
  requestSwapPosition,
  requestUpdateDirection,
} from '@/api/DirectionApi';
import { useStore } from 'vuex';

const defaultDirection = {
  title: '',
  degree: '',
  form: '',
  duration: 0,
};

export type EditDirection = Omit<Direction, 'position'>;

const useEditDirection = (customDir: EditDirection = defaultDirection) => {
  const store = useStore();
  const direction = ref<EditDirection>(customDir);

  const rules = {
    title: {
      required,
    },
    degree: {
      required,
    },
    form: {
      required,
    },
    duration: {
      required,
      minValue: minValue(1),
      maxValue: maxValue(10),
    },
  };

  const valid = useVuelidate(rules, toRefs(direction.value));

  const add = async (dir: EditDirection) => {
    const data = await requestCreateDirection(dir);
    store.commit('direction/addDirection', data);
  };

  const update = async (dir: EditDirection) => {
    const data = await requestUpdateDirection(dir);
    store.commit('direction/updateDirection', data);
  };

  const remove = async (id: string) => {
    await requestDeleteDirection(id);
    store.commit('direction/removeDirection', id);
  };

  const directionUp = async (id: string, position: number) => {
    const dirUp = store.getters['direction/getDirections'].find((d: Direction) => d.position > position);
    if (dirUp) {
      const data = await requestSwapPosition(id, dirUp.id as string);
      data.forEach((dir: Direction) => store.commit('direction/updateDirection', dir));
    }
  };

  const directionDown = async (id: string, position: number) => {
    const dirDown = store.getters['direction/getDirections'].reverse()
      .find((d: Direction) => d.position < position);

    if (dirDown) {
      const data = await requestSwapPosition(id, dirDown.id as string);
      data.forEach((dir: Direction) => store.commit('direction/updateDirection', dir));
    }
  };

  return {
    direction,
    valid,
    add,
    update,
    remove,
    directionUp,
    directionDown,
  };
};

export default useEditDirection;
