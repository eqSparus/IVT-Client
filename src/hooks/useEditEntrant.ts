import { ref } from 'vue';
import { Entrant } from '@/types/site.types';
import { required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { EditEntrant } from '@/types/edit.site.types';

const useEditEntrant = () => {
  const entrant = ref<EditEntrant>({
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
    clearingBlank,
  };
};

export default useEditEntrant;
