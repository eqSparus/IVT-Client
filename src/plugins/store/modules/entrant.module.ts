import { Module } from 'vuex';
import { EntrantState, RootState } from '@/plugins/store/store.types';
import { Entrant } from '@/types/site.types';
import { requestCreateEntrant, requestDeleteEntrant, requestUpdateEntrant } from '@/http/HttpEntrantApi';
import { EditEntrant } from '@/types/edit.site.types';

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
    addEntrant(state: EntrantState, entrant: Entrant) {
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
  actions: {
    async add({ commit }, entrant: EditEntrant) {
      const data = await requestCreateEntrant(entrant);
      commit('addEntrant', data);
    },
    async update({ commit }, args: {
      entrant: EditEntrant,
      id: string,
    }) {
      const data = await requestUpdateEntrant(args.entrant, args.id);
      commit('updateEntrant', data);
    },
    async remove({ commit }, id: string) {
      await requestDeleteEntrant(id);
      commit('removeEntrant', id);
    },
  },
};

export default DirectionModule;
