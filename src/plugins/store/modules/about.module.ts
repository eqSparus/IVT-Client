import { Module } from 'vuex';
import { AboutState, RootState } from '@/plugins/store/store.types';
import { AboutDepartment } from '@/types/site.types';
import requestUpdateAboutDepartment from '@/http/HttpAboutDepartment';
import { EditAboutDepartment } from '@/types/edit.site.types';

const AboutDepartmentModule: Module<AboutState, RootState> = {
  namespaced: true,
  state() {
    return {
      abouts: [] as Array<AboutDepartment>,
    };
  },
  mutations: {
    setAbout(state: AboutState, about: AboutDepartment[]) {
      state.abouts.push(...about);
    },
    updateAbout(state: AboutState, about: AboutDepartment) {
      const indexUpdate = state.abouts.findIndex((a) => a.id === about.id);
      state.abouts[indexUpdate] = about;
    },
  },
  getters: {
    getAboutInfo(state: AboutState) {
      return state.abouts;
    },
  },
  actions: {
    async update({ commit }, args: {
      about: EditAboutDepartment,
      id: string,
    }) {
      const data = await requestUpdateAboutDepartment(args.about, args.id);
      commit('updateAbout', data);
    },
  },
};

export default AboutDepartmentModule;
