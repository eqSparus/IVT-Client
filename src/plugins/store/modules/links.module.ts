import { Module } from 'vuex';
import { RootState, SiteLinksState } from '@/plugins/store/store.types';
import { Link } from '@/types/site.types';
import { requestCreateLink, requestDeleteLink, requestUpdateLink } from '@/http/HttpSiteLinkApi';
import { EditLink } from '@/types/edit.site.types';

const SiteLinksModule: Module<SiteLinksState, RootState> = {
  namespaced: true,
  state() {
    return {
      links: [] as Array<Link>,
    };
  },
  mutations: {
    setLinks(state: SiteLinksState, links: Link[]) {
      state.links.push(...links);
    },
    addLink(state: SiteLinksState, link: Link) {
      state.links.push(link);
    },
    removeLink(state: SiteLinksState, id: string) {
      state.links = state.links.filter((link) => link.id !== id);
    },
    updateLink(state: SiteLinksState, link: Link) {
      const indexUpdate = state.links.findIndex((l) => l.id === link.id);
      state.links[indexUpdate] = link;
    },
  },
  getters: {
    getLinks(state: SiteLinksState) {
      return state.links;
    },
  },
  actions: {
    async add({ commit }, link: Link) {
      const data = await requestCreateLink(link);
      commit('addLink', data);
    },
    async update({ commit }, args: {
      link: EditLink,
      id: string
    }) {
      const data = await requestUpdateLink(args.link, args.id);
      commit('updateLink', data);
    },
    async remove({ commit }, id: string) {
      await requestDeleteLink(id);
      commit('removeLink', id);
    },
  },
};

export default SiteLinksModule;
