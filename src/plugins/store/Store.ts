import { createStore, Store } from 'vuex';
import { InformationDepartment, Link } from '@/api/model/ModelTypes';

interface State {
  isAuthentication: boolean,
  informationOfDepartment: InformationDepartment,
}

export default createStore({
  state() {
    return {
      isAuthentication: false,
      informationOfDepartment: {} as InformationDepartment,
    };
  },
  getters: {
    isAuth(state: State): boolean {
      return state.isAuthentication;
    },
    getInformationOfDepartment(state: State) {
      return state.informationOfDepartment;
    },
  },
  mutations: {
    login(state: State) {
      state.isAuthentication = true;
    },
    logout(state: State) {
      state.isAuthentication = false;
    },
    saveInformationDepartment(state: State, information: InformationDepartment) {
      state.informationOfDepartment = information;
    },
    addDepartmentLink(state: State, link: Link) {
      state.informationOfDepartment.links.push(link);
    },
    removeLink(state: State, id: string) {
      const index = state.informationOfDepartment.links.findIndex((li) => li.id === id);
      state.informationOfDepartment.links.splice(index, 1);
    },
  },
});

declare module '@vue/runtime-core' {

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
