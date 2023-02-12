import { createStore, Store } from 'vuex';

interface State {
    isAthentication: boolean
}

export default createStore({
  state() {
    return {
      isAthentication: false,
    };
  },
  getters: {
    isAuth(state: State): boolean {
      return state.isAthentication;
    },
  },
  mutations: {
    login(state: State) {
      state.isAthentication = true;
    },
    logout(state: State) {
      state.isAthentication = false;
    },
  },
});

declare module '@vue/runtime-core' {

    interface ComponentCustomProperties {
        $store: Store<State>
    }
}
