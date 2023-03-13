<template>
  <div class="setting-links-container">
    <app-department-link-item v-for="link in links" :key="link.id"
                              :link="link"
                              :links="optionLinks"
                              class="mt-10"
                              @deleteLink="removeLink"
                              @updateLink="updateLink"/>

    <div class="mt-10">
      <span class="field-fail" v-if="validate.href.$invalid && validate.href.$dirty">
        Поле не должно быть пустым
      </span>
      <div class="setting-links-push">
        <app-select-img :options="optionLinks"
                        :select="newLink.icon"
                        @changeIcon="newLink.icon = $event"/>

        <input type="text"
               placeholder="Введите ссылку"
               aria-label="Введите ссылку"
               @blur="validate.href.$touch()"
               v-model="newLink.href"
               class="field-standard"/>
      </div>
    </div>

    <input type="button"
           value="добавить ссылку"
           :disabled="validate.href.$invalid"
           class="btn-standard mt-20"
           @click="addLink"/>
  </div>
</template>

<script lang="ts">

import {
  defineComponent, PropType, ref, toRefs,
} from 'vue';
import AppDepartmentLinkItem from '@/components/modals/departmnet/AppDepartmentLinkItem.vue';
import { Link } from '@/api/model/ModelTypes';
import AppSelectImg from '@/components/UI/AppSelectImg.vue';
import { createLink, deleteLink, putLink } from '@/api/SiteLinkApi';
import { useStore } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export default defineComponent({
  name: 'TheSettingLinks',
  components: {
    AppSelectImg,
    AppDepartmentLinkItem,
  },
  props: {
    links: {
      type: Array as PropType<Array<Link>>,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    const optionLinks = [
      'http://localhost:8080/api/v1/images/links/message-link.svg',
      'http://localhost:8080/api/v1/images/links/omgtu-link.svg',
      'http://localhost:8080/api/v1/images/links/telegram-link.svg',
      'http://localhost:8080/api/v1/images/links/vk-link.svg',
      'http://localhost:8080/api/v1/images/links/whatsapp-link.svg',
    ];

    const newLink = ref<Link>({
      href: '',
      icon: '',
    });

    const rules = {
      href: {
        required,
      },
    };

    const validate = useVuelidate(rules, toRefs(newLink.value));

    const removeLink = async (id: string) => {
      await deleteLink(id);
      store.commit('siteLinks/removeLink', id);
    };

    const updateLink = async (link: Link) => {
      const data = await putLink(link);
      store.commit('siteLinks/updateLink', data);
    };

    const addLink = async () => {
      const data = await createLink(newLink.value.href, newLink.value.icon);
      store.commit('siteLinks/addLink', data);
      newLink.value.href = '';
      newLink.value.icon = '';
      validate.value.$reset();
    };

    return {
      optionLinks,
      newLink,
      removeLink,
      updateLink,
      addLink,
      validate,
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
