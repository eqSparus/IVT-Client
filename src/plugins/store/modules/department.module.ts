import { Module } from 'vuex';
import { DepartmentState, RootState } from '@/plugins/store/store.types';
import { Department } from '@/types/site.types';
import requestUpdateDepartment from '@/http/HttpDepartmentApi';

const DepartmentModule: Module<DepartmentState, RootState> = {
  namespaced: true,
  state() {
    return {
      department: {
        title: '',
        slogan: '',
        phone: '',
        email: '',
        address: '',
        leaderId: '',
      },
    };
  },
  mutations: {
    setDepartment(state: DepartmentState, department: Department) {
      state.department = department;
    },
  },
  getters: {
    getDepartment(state: DepartmentState) {
      return state.department;
    },
  },
  actions: {
    async update({ commit }, department: Department) {
      const data = await requestUpdateDepartment(department);
      commit('setDepartment', data);
    },
  },
};

export default DepartmentModule;
