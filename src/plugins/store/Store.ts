import { createStore } from 'vuex';
import department from '@/plugins/store/modules/department.module';
import siteLinks from '@/plugins/store/modules/links.module';
import about from '@/plugins/store/modules/about.module';
import direction from '@/plugins/store/modules/direction.module';
import entrant from '@/plugins/store/modules/entrant.module';
import teacher from '@/plugins/store/modules/teacher.module';
import partner from '@/plugins/store/modules/partner.module';
import review from '@/plugins/store/modules/review.module';
import { RootState } from '@/plugins/store/store.types';

const store = createStore({
  state: {
    isLoadAllTeacher: false,
    isLoadData: false,
  },
  modules: {
    department,
    siteLinks,
    about,
    direction,
    entrant,
    teacher,
    partner,
    review,
  },
  mutations: {
    teacherLoaded(state: RootState) {
      state.isLoadAllTeacher = true;
    },
    dataLoaded(state: RootState) {
      state.isLoadData = true;
    },
  },
});

export default store;
