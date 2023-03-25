import { Module } from 'vuex';
import { DepartmentState, RootState } from '@/plugins/store/types';
import { Department } from '@/types/SiteContentTypes';

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
};

export default DepartmentModule;
