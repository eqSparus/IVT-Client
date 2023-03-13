import { Tokens } from '@/api/model/ModelTypes';
import { Module } from 'vuex';
import { AuthState, RootState } from '@/plugins/store/types';

const AuthModule: Module<AuthState, RootState> = {
  namespaced: true,
  state() {
    return {
      accessToken: localStorage.getItem('access'),
      refreshToken: localStorage.getItem('refresh'),
    };
  },
  getters: {
    isAuth(state: AuthState): boolean {
      return !!state.accessToken;
    },
    getAccessToken(state: AuthState): string | null {
      return state.accessToken;
    },
    getRefreshToken(state: AuthState): string | null {
      return state.refreshToken;
    },
  },
  mutations: {
    setTokens(state: AuthState, tokens: Tokens) {
      state.accessToken = tokens.accessToken;
      state.refreshToken = tokens.refreshToken;
      localStorage.setItem('access', tokens.accessToken);
      localStorage.setItem('refresh', tokens.refreshToken);
    },
    removeTokens(state: AuthState) {
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
    },
  },
};

export default AuthModule;
