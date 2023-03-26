import { Module } from 'vuex';
import { AuthState, RootState } from '@/plugins/store/types';
import { requestAuthentication, refreshToken } from '@/api/user/UserApi';
import { User } from '@/types/UserTypes';

const AuthModule: Module<AuthState, RootState> = {
  namespaced: true,
  state() {
    return {
      accessToken: localStorage.getItem('access'),
    };
  },
  getters: {
    isAuth(state: AuthState): boolean {
      return !!state.accessToken;
    },
    getAccessToken(state: AuthState): string | null {
      return state.accessToken;
    },
  },
  mutations: {
    setAccessToken(state: AuthState, token: string) {
      state.accessToken = token;
      localStorage.setItem('access', token);
    },
    removeAccessToken(state: AuthState) {
      state.accessToken = null;
      localStorage.removeItem('access');
    },
  },
  actions: {
    async login({ commit }, user: User) {
      const data = await requestAuthentication({
        email: user.email,
        password: user.password,
      });
      commit('setAccessToken', data.accessToken);
    },
    async refresh({ commit }) {
      const data = await refreshToken();
      commit('setAccessToken', data.accessToken);
    },
  },
};

export default AuthModule;
