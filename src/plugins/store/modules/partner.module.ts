import { Module } from 'vuex';
import { PartnerState, RootState } from '@/plugins/store/store.types';
import { Partner } from '@/types/site.types';
import {
  requestCreatePartner,
  requestDeletePartner,
  requestUpdatePartner,
  requestUpdatePartnerImg,
} from '@/http/HttpPartnerApi';
import { EditPartner } from '@/types/edit.site.types';

const PartnerModule: Module<PartnerState, RootState> = {
  namespaced: true,
  state() {
    return {
      partners: [] as Array<Partner>,
    };
  },
  mutations: {
    setPartners(state: PartnerState, partners: Partner[]) {
      state.partners.push(...partners);
    },
    addPartner(state: PartnerState, partner: Partner) {
      state.partners.push(partner);
    },
    updatePartner(state: PartnerState, partner: Partner) {
      const indexUpdate = state.partners.findIndex((p) => p.id === partner.id);
      state.partners[indexUpdate] = partner;
    },
    removePartner(state: PartnerState, id: string) {
      const deleteIndex = state.partners.findIndex((p) => p.id === id);
      state.partners.splice(deleteIndex, 1);
    },
    updateImgPartner(state: PartnerState, data: {
      path: string,
      id: string
    }) {
      const indexUpdate = state.partners.findIndex((p) => p.id === data.id);
      state.partners[indexUpdate].urlImg = `${data.path}?range=${Date.now()}`;
    },
  },
  getters: {
    getPartners(state: PartnerState) {
      return state.partners;
    },
  },
  actions: {
    async add({ commit }, args: {
      partner: EditPartner,
      image: Blob,
    }) {
      const formData = new FormData();
      formData.append('img', args.image, 'partner.png');
      formData.append('data', new Blob([JSON.stringify(args.partner)], {
        type: 'application/json',
      }));
      const data = await requestCreatePartner(formData);
      commit('addPartner', data);
    },
    async update({ commit }, args:{
      partner: EditPartner,
      id: string
    }) {
      const data = await requestUpdatePartner(args.partner, args.id);
      commit('updatePartner', data);
    },
    async remove({ commit }, id: string) {
      await requestDeletePartner(id);
      commit('removePartner', id);
    },
    async updateImg({ commit }, args: {
      id: string,
      image: Blob,
    }) {
      const formData = new FormData();
      formData.append('img', args.image, 'partner.png');
      const data = await requestUpdatePartnerImg(formData, args.id);
      commit('updateImgPartner', {
        path: data.url,
        id: args.id,
      });
    },
  },
};

export default PartnerModule;
