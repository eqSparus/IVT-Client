import { ref } from 'vue';
import { Partner } from '@/types/site.types';
import { required, url } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import {
  requestCreatePartner,
  requestDeletePartner,
  requestUpdatePartner,
  requestUpdatePartnerImg,
} from '@/api/PartnerApi';
import { useStore } from 'vuex';

export type EditPartner = Omit<Partner, 'urlImg'>

const defaultPartner = {
  href: '',
};

const useEditPartner = (customPartner: EditPartner = defaultPartner) => {
  const store = useStore();
  const partner = ref<EditPartner>(customPartner);

  const rules = {
    href: {
      required,
      url,
    },
  };

  const valid = useVuelidate(rules, partner);

  const add = async (addPartner: EditPartner, img: Blob) => {
    const formData = new FormData();
    formData.append('img', img, 'partner.png');
    formData.append('data', new Blob([JSON.stringify(addPartner)], {
      type: 'application/json',
    }));
    const data = await requestCreatePartner(formData);
    store.commit('partner/setPartner', data);
  };

  const update = async () => {
    const data = await requestUpdatePartner(partner.value);
    store.commit('partner/updatePartner', data);
  };

  const remove = async (id: string) => {
    await requestDeletePartner(id);
    store.commit('partner/removePartner', id);
  };

  const updateImg = async (img: Blob, id: string) => {
    const formData = new FormData();
    formData.append('img', img, 'partner.png');
    const data = await requestUpdatePartnerImg(formData, id);
    store.commit('partner/updateImgPartner', {
      path: data.url,
      id,
    });
  };

  return {
    partner,
    valid,
    add,
    update,
    remove,
    updateImg,
  };
};

export default useEditPartner;
