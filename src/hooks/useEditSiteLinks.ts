import { ref } from 'vue';
import { Link } from '@/types/site.types';
import { required, url } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

const useEditSiteLinks = () => {
  const newLink = ref<Link>({
    href: '',
    icon: new URL('/src/assets/images/links/default-link.svg', import.meta.url).href,
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
