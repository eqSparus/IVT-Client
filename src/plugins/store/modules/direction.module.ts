import { Module } from 'vuex';
import { DirectionState, RootState } from '@/plugins/store/types';
import { Direction } from '@/types/SiteContentTypes';

const DirectionModule: Module<DirectionState, RootState> = {
  namespaced: true,
  state() {
    return {
      directions: [] as Array<Direction>,
    };
  },
  mutations: {
    setDirections(state: DirectionState, directions: Direction[]) {
      state.directions.push(...directions);
    },
    addDirection(state: DirectionState, directions: Direction) {
      state.directions.push(directions);
    },
    removeDirection(state: DirectionState, id: string) {
      state.directions = state.directions.filter((d) => d.id !== id);
    },
    updateDirection(state: DirectionState, direction: Direction) {
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
