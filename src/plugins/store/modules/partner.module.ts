import { Module } from 'vuex';
import { PartnerState, RootState } from '@/plugins/store/types';
import { Partner } from '@/types/SiteContentTypes';

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
    setPartner(state: PartnerState, partner: Partner) {
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
    getPartners(state) {
      return state.partners;
    },
  },
};

export default PartnerModule;
