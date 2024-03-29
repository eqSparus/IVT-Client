<template>
  <div class="edit-links-container">

    <app-link-item v-for="link in links" :key="link.id"
                   :link="link"
                   :links="linksIcon"
                   class="mt-10"
                   @deleteLink="removeLink"
                   @updateLink="updateLink"/>

    <div class="mt-10">
      <div class="setting-links-push">
        <app-select-img :options="linksIcon"
                        :select="newLink.icon"
                        @changeIcon="newLink.icon = $event"/>

        <app-base-field :fails="[{
          description: 'Поле не должно быть пустым и должно являться url адресом',
          isShow: valid.href.$invalid && valid.href.$dirty,
        }]" style="width: 100%;">
          <input type="text"
                 placeholder="Введите новую ссылку"
                 aria-label="Ссылка на сайт"
                 @blur="valid.href.$touch()"
                 v-model="newLink.href"
                 class="field-standard"/>
        </app-base-field>

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
  defineComponent, PropType,
} from 'vue';
import AppLinkItem from '@/components/views/primary/modal/AppLinkItem.vue';
import { Link } from '@/types/site.types';
import AppSelectImg from '@/components/UI/AppSelectImg.vue';
import useEditSiteLinks from '@/hooks/useEditSiteLinks';
import useAlerts from '@/hooks/useAlerts';
import { useStore } from 'vuex';
import AppBaseField from '@/components/UI/AppBaseField.vue';
import { EditLink } from '@/types/edit.site.types';

export default defineComponent({
  name: 'TheSettingLinks',
  components: {
    AppSelectImg,
    AppLinkItem,
    AppBaseField,
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

    const {
      newLink,
      valid,
      linksIcon,
    } = useEditSiteLinks();

    const addLink = async () => {
      try {
        await store.dispatch('siteLinks/add', newLink.value);
        alerts.value.push({
          type: 'info',
          message: 'Ссылка добавлена',
        });
        newLink.value.href = '';
        newLink.value.icon = 'default-link';
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

    const updateLink = async (link: EditLink, id: string) => {
      try {
        await store.dispatch('siteLinks/update', {
          link,
          id,
        });
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
      linksIcon,
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

    div:nth-child(1) {
      align-self: flex-end;
    }

    input:nth-child(2) {
      flex: 1;
    }
  }
}

</style>
