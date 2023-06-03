import { Module } from 'vuex';
import { DirectionState, RootState } from '@/plugins/store/store.types';
import { Direction } from '@/types/site.types';
import {
  requestCreateDirection,
  requestDeleteDirection,
  requestSwapPosition,
  requestUpdateDirection,
} from '@/http/HttpDirectionApi';
import { EditDirection } from '@/hooks/useEditDirection';

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
    addDirection(state: DirectionState, direction: Direction) {
      state.directions.push(direction);
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
      return state.directions.sort((a, b) => a.position - b.position);
    },
  },
  actions: {
    async add({ commit }, direction: EditDirection) {
      const data = await requestCreateDirection(direction);
      commit('addDirection', data);
    },
    async update({ commit }, direction: EditDirection) {
      const data = await requestUpdateDirection(direction);
      commit('updateDirection', data);
    },
    async remove({ commit }, id: string) {
      await requestDeleteDirection(id);
      commit('removeDirection', id);
    },
    async directionUp({
      commit,
      getters,
    }, args: {
      id: string,
      position: number,
    }) {
      const dirUp = getters.getDirections.find((d: Direction) => d.position > args.position);
      if (dirUp) {
        const data = await requestSwapPosition(args.id, dirUp.id as string);
        data.forEach((dir: Direction) => commit('updateDirection', dir));
      }
    },
    async directionDown({
      commit,
      getters,
    }, args: {
      id: string,
      position: number,
    }) {
      const dirDown = getters.getDirections.reverse()
        .find((d: Direction) => d.position < args.position);
      if (dirDown) {
        const data = await requestSwapPosition(args.id, dirDown.id as string);
        data.forEach((dir: Direction) => commit('updateDirection', dir));
      }
    },
  },
};

export default DirectionModule;
