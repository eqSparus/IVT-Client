<template>
  <div class="setting-container">

    <app-message-alert message="Данные обновлены"
                       type="info"
                       :timeout="3000"
                       :is-show="isMessage"
                       @vanish="isMessage = false"/>

    <label class="field-label" for="title">Название кафедры</label>
    <span class="field-fail" v-if="validate.title.$invalid && validate.title.$dirty">
      Поле не должно быть пустым
    </span>
    <input type="text"
           placeholder="Введите название кафедры"
           class="field-standard"
           id="title"
           v-model="departmentValue.title"
           @blur="validate.title.$touch()"/>

    <label class="field-label mt-10" for="slogan">Девиз кафедры</label>
    <span class="field-fail" v-if="validate.slogan.$invalid && validate.slogan.$dirty">
      Поле не должно быть пустым
    </span>
    <input type="text"
           id="slogan"
           placeholder="Введите девиз кафедры"
           class="field-standard"
           @blur="validate.slogan.$touch()"
           v-model="departmentValue.slogan"/>

    <div class="double-block mt-10">
        <label class="field-label block" for="phone">Номер телефона кафедры</label>

        <label class="field-label block" for="email">Почта кафедры</label>
    </div>

    <div class="double-block">
        <span class="field-fail block" v-if="validate.phone.$invalid && validate.phone.$dirty">
          Поле не должно быть пустым
        </span>

        <span class="field-fail block" v-if="validate.email.$invalid && validate.email.$dirty">
          Поле не должно быть пустым и быть адресом эл. почты
        </span>
    </div>

    <div class="double-block">

      <input type="tel"
             placeholder="Введите телефон кафедры"
             class="field-standard block"
             id="phone"
             @blur="validate.phone.$touch()"
             v-model="departmentValue.phone"/>

      <input type="email"
             placeholder="Введите почту кафедры"
             class="field-standard block"
             id="email"
             @blur="validate.email.$touch()"
             v-model="departmentValue.email"/>

    </div>

    <label class="field-label mt-10" for="address">Адрес кафедры</label>
    <span class="field-fail" v-if="validate.address.$invalid && validate.address.$dirty">
          Поле не должно быть пустым
    </span>
    <input type="text"
           placeholder="Введите адрес кафедры"
           class="field-standard"
           id="address"
           @blur="validate.address.$touch()"
           v-model="departmentValue.address"
           aria-label="Введите адрес кафедры"/>

    <input type="button"
           value="обновить"
           class="btn-standard mt-20"
           :disabled="validate.$invalid"
           @click="updateDepartmentEvent"/>

  </div>
</template>

<script lang="ts">

import {
  defineComponent,
  PropType,
  reactive,
  ref,
} from 'vue';
import { InformationDepartment } from '@/api/model/ModelTypes';
import { email, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import updateDepartment from '@/api/DepartmentApi';
import { useStore } from 'vuex';
import AppMessageAlert from '@/components/UI/AppMessageAlert.vue';

export default defineComponent({
  name: 'TheSettingDepartment',
  components: { AppMessageAlert },
  props: {
    department: {
      type: Object as PropType<InformationDepartment>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const departmentValue = reactive<InformationDepartment>({
      title: props.department.title,
      slogan: props.department.slogan,
      email: props.department.email,
      phone: props.department.phone,
      address: props.department.address,
    });
    const isMessage = ref<boolean>(false);

    const rules = {
      title: {
        required,
      },
      slogan: {
        required,
      },
      email: {
        required,
        email,
      },
      phone: {
        required,
      },
      address: {
        required,
      },
    };
    const validate = useVuelidate(rules, departmentValue);

    const updateDepartmentEvent = async () => {
      const data = await updateDepartment(departmentValue);
      const newDepartment = {
        title: data.title,
        slogan: data.slogan,
        phone: data.phone,
        email: data.email,
        address: data.address,
      };
      store.commit('department/setDepartment', newDepartment);
      isMessage.value = true;
    };

    return {
      isMessage,
      departmentValue,
      validate,
      updateDepartmentEvent,
    };
  },
});
</script>

<style lang="scss" scoped>

.setting-container {
  display: flex;
  flex-flow: column;

  .double-block {
    width: 100%;
    display: flex;
    flex-flow: row;
    gap: 10px;

    .block {
      width: 50%;
      display: flex;
      flex-flow: column;
    }
  }

}

</style>
