import { createStore } from 'vuex';
import auth from '@/plugins/store/modules/auth.module';
import department from '@/plugins/store/modules/department.module';
import siteLinks from '@/plugins/store/modules/links.module';
import about from '@/plugins/store/modules/about.module';
import direction from '@/plugins/store/modules/direction.module';
import entrant from '@/plugins/store/modules/entrant.module';
import teacher from '@/plugins/store/modules/teacher.module';
import partner from '@/plugins/store/modules/partner.module';

const store = createStore({
  state: {
    version: '1',
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
});

export default store;
