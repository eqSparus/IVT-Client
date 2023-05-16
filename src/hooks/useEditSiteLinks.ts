import { ref } from 'vue';
import { Link } from '@/types/site.types';
import { required, url } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

const useEditSiteLinks = () => {
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

  return {
    newLink,
    valid,
  };
};

export default useEditSiteLinks;
