import { Module } from 'vuex';
import { AboutState, RootState } from '@/plugins/store/types';
import { AboutDepartment } from '@/types/site.types';
import requestUpdateAboutDepartment from '@/api/AboutDepartmentApi';

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
    async update({ commit }, about: AboutDepartment) {
      const data = await requestUpdateAboutDepartment(about);
      commit('updateAbout', data);
    },
  },
};

export default AboutDepartmentModule;
