<template>
  <form class="edit-links-container">

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
               aria-label="Ссылка на сайт"
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
  </form>
</template>

<script lang="ts">

import {
  defineComponent, PropType,
} from 'vue';
import AppLinkItem from '@/components/views/primary/modal/AppLinkItem.vue';
import { Link } from '@/types/site.types';
import AppSelectImg from '@/components/UI/AppSelectImg.vue';
import useEditSiteLinks from '@/hooks/useEditSiteLinks';
import useAlerts from '@/hooks/useAlerts';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'TheSettingLinks',
  components: {
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
    const store = useStore();
    const { alerts } = useAlerts();

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
    } = useEditSiteLinks();

    const addLink = async () => {
      try {
        await store.dispatch('siteLinks/add', newLink.value);
        alerts.value.push({
          type: 'info',
          message: 'Ссылка добавлена',
        });
        newLink.value.href = '';
        // TODO сменить
        newLink.value.icon = 'http://localhost:8080/api/v1/images/links/default-link.svg';
        valid.value.$reset();
      } catch (e) {
        alerts.value.push({
          type: 'warning',
          message: 'Не удалось добавить ссылку',
        });
      }
    };

    const removeLink = async (id: string) => {
      try {
        await store.dispatch('siteLinks/remove', id);
        alerts.value.push({
          type: 'info',
          message: 'Ссылка удалена',
        });
      } catch (e) {
        alerts.value.push({
          type: 'warning',
          message: 'Не удалось удалить ссылку',
        });
      }
    };

    const updateLink = async (link: Link) => {
      try {
        await store.dispatch('siteLinks/update', link);
        alerts.value.push({
          type: 'info',
          message: 'Ссылка обновлена',
        });
      } catch (e) {
        alerts.value.push({
          type: 'warning',
          message: 'Не удалось обновить ссылку',
        });
      }
    };

    return {
      alerts,
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

.edit-links-container {
  display: flex;
  flex-flow: column;

  .setting-links-push {
    display: flex;
    flex-flow: row;
    gap: 1rem;

    input:nth-child(2) {
      flex: 1;
    }
  }
}

</style>
