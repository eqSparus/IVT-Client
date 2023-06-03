<template>
  <form class="edit-department-container">
    <app-base-field id="title"
                    label="Название кафедры"
                    :fails="[{
                      isShow: valid.title.$invalid && valid.title.$dirty,
                      description: 'Поле не должно быть пустым',
                    }]">
      <input type="text"
             placeholder="Введите название кафедры"
             class="field-standard"
             id="title"
             v-model="departmentValue.title"
             @blur="valid.title.$touch()"/>
    </app-base-field>

    <app-base-field id="slogan"
                    class="mt-10"
                    label="Девиз кафедры"
                    :fails="[{
                      isShow: valid.slogan.$invalid && valid.slogan.$dirty,
                      description: 'Поле не должно быть пустым',
                    }]">
      <input type="text"
             id="slogan"
             placeholder="Введите девиз кафедры"
             class="field-standard"
             @blur="valid.slogan.$touch()"
             v-model="departmentValue.slogan"/>
    </app-base-field>

    <div class="double-block mt-10">
      <app-base-field id="phone"
                      label="Номер телефона кафедры"
                      :fails="[{
                        isShow: valid.phone.$invalid && valid.phone.$dirty,
                        description: 'Поле не должно быть пустым',
                      }]">
        <input type="tel"
               placeholder="Введите телефон кафедры"
               class="field-standard"
               id="phone"
               @blur="valid.phone.$touch()"
               v-model="departmentValue.phone"/>
      </app-base-field>

      <app-base-field id="email"
                      label="Почта кафедры"
                      :fails="[{
                        isShow: valid.email.$invalid && valid.email.$dirty,
                        description: 'Поле не должно быть пустым и быть адресом эл. почты',
                      }]">
        <input type="email"
               placeholder="Введите почту кафедры"
               class="field-standard"
               id="email"
               @blur="valid.email.$touch()"
               v-model="departmentValue.email"/>
      </app-base-field>
    </div>

    <app-base-field id="address"
                    class="mt-10"
                    label="Адрес кафедры"
                    :fails="[{
                      isShow: valid.address.$invalid && valid.address.$dirty,
                      description: 'Поле не должно быть пустым',
                    }]">
      <input type="text"
             placeholder="Введите адрес кафедры"
             class="field-standard"
             id="address"
             @blur="valid.address.$touch()"
             v-model="departmentValue.address"/>
    </app-base-field>

    <input type="button"
           value="обновить"
           class="btn-standard mt-20"
           :disabled="valid.$invalid"
           @click="updateDepartment"/>

  </form>
</template>

<script lang="ts">

import {
  computed,
  defineComponent,
  PropType,
} from 'vue';
import { Department, Teacher } from '@/types/site.types';
import { useStore } from 'vuex';
import useEditDepartment from '@/hooks/useEditDepartment';
import useAlerts from '@/hooks/useAlerts';
import AppBaseField from '@/components/UI/AppBaseField.vue';

export default defineComponent({
  name: 'TheSettingDepartment',
  components: { AppBaseField },
  props: {
    department: {
      type: Object as PropType<Department>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const { alerts } = useAlerts();

    const {
      department: departmentValue,
      valid,
    } = useEditDepartment(props.department);

    const updateDepartment = async () => {
      if (departmentValue.value.title !== props.department.title
        || departmentValue.value.slogan !== props.department.slogan
        || departmentValue.value.email !== props.department.email
        || departmentValue.value.phone !== props.department.phone
        || departmentValue.value.address !== props.department.address) {
        try {
          await store.dispatch('department/update', departmentValue.value);
          alerts.value.push({
            message: 'Данные обновлены',
            type: 'info',
          });
        } catch (e) {
          alerts.value.push({
            message: 'Не удалось обновить данные',
            type: 'warning',
          });
        }
      } else {
        alerts.value.push({
          message: 'Данные не изменены',
          type: 'warning',
        });
      }
    };

    const teachers = computed(() => store.getters['teacher/getTeachers']
      .map((t: Teacher) => ({
        value: t.id,
        content: `${t.lastName} ${t.firstName} ${t.middleName}`,
      })));
    return {
      alerts,
      departmentValue,
      valid,
      teachers,
      updateDepartment,
    };
  },
});
</script>

<style lang="scss" scoped>

.edit-department-container {
  display: flex;
  flex-flow: column;

  .double-block {
    width: 100%;
    display: flex;
    flex-flow: row;
    gap: 1rem;

    div {
      flex: 1;
    }
  }

}

</style>
