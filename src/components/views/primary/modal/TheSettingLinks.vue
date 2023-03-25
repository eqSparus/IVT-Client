<template>
  <div class="setting-links-container">

    <app-message-alert type="info"
                       :timeout="3000"
                       :message="alertMessage"
                       @vanish="alertMessage = ''"/>

    <app-link-item v-for="link in links" :key="link.id"
                   :link="link"
                   :links="optionLinks"
                   class="mt-10"
                   @deleteLink="removeLink"
                   @updateLink="updateLink"/>

    <div class="mt-10">
      <span class="field-fail" v-if="valid.href.$invalid && valid.href.$dirty">
        Поле не должно быть пустым и должно являться url адресом
      </span>
      <div class="setting-links-push">
        <app-select-img :options="optionLinks"
                        :select="{img: newLink.icon, value:newLink.icon}"
                        @changeIcon="newLink.icon = $event"/>

        <input type="text"
               placeholder="Введите ссылку"
               aria-label="Введите ссылку"
               @blur="valid.href.$touch()"
               v-model="newLink.href"
               class="field-standard"/>
      </div>
    </div>

    <input type="button"
           value="добавить ссылку"
           :disabled="valid.href.$invalid"
           class="btn-standard mt-20"
           @click="addLink"/>
  </div>
</template>

<script lang="ts">

import {
  defineComponent, PropType, ref,
} from 'vue';
import AppLinkItem from '@/components/views/primary/modal/AppLinkItem.vue';
import { Link } from '@/types/SiteContentTypes';
import AppSelectImg from '@/components/UI/AppSelectImg.vue';
import AppMessageAlert from '@/components/UI/AppMessageAlert.vue';
import useEditSiteLinks from '@/hooks/useEditSiteLinks';

export default defineComponent({
  name: 'TheSettingLinks',
  components: {
    AppMessageAlert,
    AppSelectImg,
    AppLinkItem,
  },
  props: {
    links: {
      type: Array as PropType<Array<Link>>,
      required: true,
    },
  },
  setup() {
    const alertMessage = ref<string>('');

    // TODO Сменить адрес
    const optionLinks = [
      {
        value: 'http://localhost:8080/api/v1/images/links/default-link.svg',
        img: 'http://localhost:8080/api/v1/images/links/default-link.svg',
      },
      {
        value: 'http://localhost:8080/api/v1/images/links/message-link.svg',
        img: 'http://localhost:8080/api/v1/images/links/message-link.svg',
      },
      {
        value: 'http://localhost:8080/api/v1/images/links/omgtu-link.svg',
        img: 'http://localhost:8080/api/v1/images/links/omgtu-link.svg',
      },
      {
        value: 'http://localhost:8080/api/v1/images/links/telegram-link.svg',
        img: 'http://localhost:8080/api/v1/images/links/telegram-link.svg',
      },
      {
        value: 'http://localhost:8080/api/v1/images/links/vk-link.svg',
        img: 'http://localhost:8080/api/v1/images/links/vk-link.svg',
      },
      {
        value: 'http://localhost:8080/api/v1/images/links/whatsapp-link.svg',
        img: 'http://localhost:8080/api/v1/images/links/whatsapp-link.svg',
      },
    ];

    const {
      newLink,
      valid,
      remove,
      update,
      add,
    } = useEditSiteLinks();

    const addLink = async () => {
      await add();
      alertMessage.value = 'Новая ссылка добавлена';
    };

    const removeLink = (id: string) => {
      remove(id);
      alertMessage.value = 'Ссылка удалена';
    };

    const updateLink = (oldLink: Link, link: Link) => {
      update(oldLink, link);
      alertMessage.value = 'Ссылка обновлена';
    };

    return {
      alertMessage,
      optionLinks,
      newLink,
      valid,
      removeLink,
      updateLink,
      addLink,
    };
  },
});
</script>

<style lang="scss" scoped>

.setting-links-container {
  display: flex;
  flex-flow: column;

  .setting-links-push {
    display: flex;
    flex-flow: row;
    gap: 10px;

    input:nth-child(2) {
      flex: 1;
    }
  }
}

</style>
