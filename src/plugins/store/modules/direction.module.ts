import { Module } from 'vuex';
import { DirectionState, RootState, SiteLinksState } from '@/plugins/store/types';
import { InformationDirection, Link } from '@/api/model/ModelTypes';

const DirectionModule: Module<DirectionState, RootState> = {
  namespaced: true,
  state() {
    return {
      directions: [] as Array<InformationDirection>,
    };
  },
  mutations: {
    setDirections(state: DirectionState, directions: InformationDirection[]) {
      state.directions.push(...directions);
    },
    addDirection(state: DirectionState, directions: InformationDirection) {
      state.directions.push(directions);
    },
    removeDirection(state: DirectionState, id: string) {
      state.directions = state.directions.filter((d) => d.id !== id);
    },
    updateDirection(state: DirectionState, direction: InformationDirection) {
      const indexUpdate = state.directions.findIndex((d) => d.id === direction.id);
      state.directions[indexUpdate] = direction;
    },
  },
  getters: {
    getDirections(state: DirectionState) {
      return state.directions;
    },
  },
};

export default DirectionModule;
