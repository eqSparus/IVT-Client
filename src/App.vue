<template>
  <the-main-page/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheMainPage from '@/components/TheMainPage.vue';
import { InformationDepartment } from '@/api/model/ModelTypes';
import { useStore } from 'vuex';

export default defineComponent({
  components: { TheMainPage },
  name: 'App',
  setup() {
    const store = useStore();

    const informationOfDepartment: InformationDepartment = {
      id: '1',
      title: 'Информатика и вычислительная техника',
      slogan: 'Научим программировать твоё будущее',
      phone: '+7 (3812) 72-90-55',
      email: 'ivt@omgtu.ru',
      address: 'Пр. Мира, 11 гл. корпус, каб. П-102',
      links: [
        {
          id: '1',
          name: 'vk',
          href: 'https://vk.com/department_of_computer_science',
        },
        {
          id: '2',
          name: 'omgtu',
          href: 'https://www.omgtu.ru/',
        },
      ],
    };

    store.commit('saveInformationDepartment', informationOfDepartment);
  },
});
</script>

<style lang="scss">

</style>
