import { ref } from 'vue';
import { useStore } from 'vuex';

export default () => {
  const store = useStore();
  const email = ref<string>();
  const password = ref<string>();

  const login = () => {
    store.commit('login');
    window.history.replaceState(null, 'Админ', '?auth');
  };

  const logout = () => {
    store.commit('logout');
    window.history.replaceState(null, 'Пользователь', '/');
  };

  return {
    email,
    password,
    login,
    logout,
  };
};
