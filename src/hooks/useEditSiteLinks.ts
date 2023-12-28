import { ref } from 'vue';
import { required, url } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import linkDefault from '@/assets/images/links/default-link.svg';
import linkOmgtu from '@/assets/images/links/omgtu-link.svg';
import linkVk from '@/assets/images/links/vk-link.svg';
import linkMessage from '@/assets/images/links/message-link.svg';
import linkWhatsapp from '@/assets/images/links/whatsapp-link.svg';
import linkTelegram from '@/assets/images/links/telegram-link.svg';
import { EditLink } from '@/types/edit.site.types';

const linksIcon = new Map<string, string>();
linksIcon.set('default-link', linkDefault);
linksIcon.set('omgtu-link', linkOmgtu);
linksIcon.set('vk-link', linkVk);
linksIcon.set('message-link', linkMessage);
linksIcon.set('whatsapp-link', linkWhatsapp);
linksIcon.set('telegram-link', linkTelegram);

const useEditSiteLinks = () => {
  const newLink = ref<EditLink>({
    href: '',
    icon: 'default-link',
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
    linksIcon,
  };
};

export default useEditSiteLinks;
