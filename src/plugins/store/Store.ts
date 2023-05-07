import { createStore } from 'vuex';
import auth from '@/plugins/store/modules/auth.module';
import department from '@/plugins/store/modules/department.module';
import siteLinks from '@/plugins/store/modules/links.module';
import about from '@/plugins/store/modules/about.module';
import direction from '@/plugins/store/modules/direction.module';
import entrant from '@/plugins/store/modules/entrant.module';
import teacher from '@/plugins/store/modules/teacher.module';
import partner from '@/plugins/store/modules/partner.module';
import { RootState } from '@/plugins/store/types';

const store = createStore({
  state: {
    isLoadAllTeacher: true,
  },
  modules: {
    auth,
    department,
    siteLinks,
    about,
    direction,
    entrant,
    teacher,
    partner,
  },
  mutations: {
    toggleLoadTeacher(state: RootState) {
      state.isLoadAllTeacher = false;
    },
  },
  actions: {
    async loadTeacher({
      state,
      commit,
    }, loadTeacher: () => void) {
      if (state.isLoadAllTeacher) {
        loadTeacher();
        commit('toggleLoadTeacher');
      }
    },
  },
});

export default store;
