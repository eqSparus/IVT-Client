import { Module } from 'vuex';
import { DepartmentState, RootState } from '@/plugins/store/types';
import { InformationDepartment } from '@/api/model/ModelTypes';

const DepartmentModule: Module<DepartmentState, RootState> = {
  namespaced: true,
  state() {
    return {
      title: '',
      slogan: '',
      phone: '',
      email: '',
      address: '',
      leaderId: '',
    };
  },
  mutations: {
    setDepartment(state: DepartmentState, department: InformationDepartment) {
      state.title = department.title;
      state.slogan = department.slogan;
      state.phone = department.phone;
      state.email = department.email;
      state.address = department.address;
      state.leaderId = department.leaderId;
    },
  },
  getters: {
    getDepartment(state: DepartmentState) {
      return state;
    },
  },
};

export default DepartmentModule;
