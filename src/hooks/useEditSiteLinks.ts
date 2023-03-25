import { ref } from 'vue';
import { Link } from '@/types/SiteContentTypes';
import { required, url } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { createLink, deleteLink, putLink } from '@/api/SiteLinkApi';
import { useStore } from 'vuex';

const useEditSiteLinks = () => {
  const store = useStore();
  // TODO Сменить адрес
  const newLink = ref<Link>({
    href: '',
    icon: 'http://localhost:8080/api/v1/images/links/default-link.svg',
  });

  const rules = {
    href: {
      required,
      url,
    },
  };

  const valid = useVuelidate(rules, newLink.value);

  const remove = async (id: string) => {
    await deleteLink(id);
    store.commit('siteLinks/removeLink', id);
  };

  const update = async (oldLink: Link, link: Link) => {
    if (oldLink.icon !== link.icon || oldLink.href !== link.href) {
      const data = await putLink(link);
      store.commit('siteLinks/updateLink', data);
    }
  };

  const add = async () => {
    const data = await createLink(newLink.value);
    store.commit('siteLinks/addLink', data);
    newLink.value.href = '';
    newLink.value.icon = 'http://localhost:8080/api/v1/images/links/default-link.svg';
    valid.value.$reset();
  };

  return {
    newLink,
    valid,
    remove,
    update,
    add,
  };
};

export default useEditSiteLinks;
