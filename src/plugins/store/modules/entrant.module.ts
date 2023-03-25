import { Module } from 'vuex';
import { EntrantState, RootState } from '@/plugins/store/types';
import { Entrant } from '@/types/SiteContentTypes';

const DirectionModule: Module<EntrantState, RootState> = {
  namespaced: true,
  state() {
    return {
      entrants: [] as Array<Entrant>,
    };
  },
  mutations: {
    setEntrants(state: EntrantState, entrants: Entrant[]) {
      state.entrants.push(...entrants);
    },
    setEntrant(state: EntrantState, entrant: Entrant) {
      state.entrants.push(entrant);
    },
    removeEntrant(state: EntrantState, id: string) {
      const deleteIndex = state.entrants.findIndex((e) => e.id === id);
      state.entrants.splice(deleteIndex, 1);
    },
    updateEntrant(state: EntrantState, entrant: Entrant) {
      const indexUpdate = state.entrants.findIndex((e) => e.id === entrant.id);
      state.entrants[indexUpdate] = entrant;
    },
  },
  getters: {
    getEntrants(state: EntrantState) {
      return state.entrants;
    },
  },
};

export default DirectionModule;
