import { ref } from 'vue';
import { Entrant } from '@/types/site.types';
import { required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { requestCreateEntrant, requestDeleteEntrant, requestUpdateEntrant } from '@/api/EntrantApi';
import { useStore } from 'vuex';

const useEditEntrant = () => {
  const store = useStore();
  const entrant = ref<Entrant>({
    title: '',
    items: [],
  });

  const rules = {
    title: {
      required,
    },
  };

  const valid = useVuelidate(rules, entrant.value);

  const setEntrant = (ent: Entrant) => {
    entrant.value.id = ent.id;
    entrant.value.title = ent.title;
    entrant.value.items = ent.items.map((value) => ({
      name: value.name,
      points: value.points.map((p) => ({
        point: p.point,
      })),
    }));
  };

  const addItem = () => {
    entrant.value.items.push({
      name: '',
      points: [],
    });
  };

  const add = async () => {
    const data = await requestCreateEntrant(entrant.value);
    store.commit('entrant/setEntrant', data);
  };

  const update = async () => {
    const data = await requestUpdateEntrant(entrant.value);
    store.commit('entrant/updateEntrant', data);
  };

  const remove = async (id: string) => {
    await requestDeleteEntrant(id);
    store.commit('entrant/removeEntrant', id);
  };

  const clearingBlank = () => {
    entrant.value.items = entrant.value.items.filter((item) => item.name)
      .map((item) => {
        const filterItem = item;
        filterItem.points = item.points.filter((point) => point.point);
        return filterItem;
      });
  };

  return {
    entrant,
    valid,
    setEntrant,
    addItem,
    add,
    update,
    remove,
    clearingBlank,
  };
};

export default useEditEntrant;
