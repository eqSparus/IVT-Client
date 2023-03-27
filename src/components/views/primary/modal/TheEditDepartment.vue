<template>
  <div class="setting-container">

    <app-list-alert :alerts="alerts"
                    :time="3000"
                    @deleteAlert="alerts.splice(0, 1)"/>

    <label class="field-label" for="title">Название кафедры</label>
    <span class="field-fail" v-if="valid.title.$invalid && valid.title.$dirty">
      Поле не должно быть пустым
    </span>
    <input type="text"
           placeholder="Введите название кафедры"
           class="field-standard"
           id="title"
           v-model="departmentValue.title"
           @blur="valid.title.$touch()"/>

    <label class="field-label mt-10" for="slogan">Девиз кафедры</label>
    <span class="field-fail" v-if="valid.slogan.$invalid && valid.slogan.$dirty">
      Поле не должно быть пустым
    </span>
    <input type="text"
           id="slogan"
           placeholder="Введите девиз кафедры"
           class="field-standard"
           @blur="valid.slogan.$touch()"
           v-model="departmentValue.slogan"/>

    <div class="double-block mt-10">
      <label class="field-label block" for="phone">Номер телефона кафедры</label>

      <label class="field-label block" for="email">Почта кафедры</label>
    </div>

    <div class="double-block">
        <span class="field-fail block" v-if="valid.phone.$invalid && valid.phone.$dirty">
          Поле не должно быть пустым
        </span>

      <span class="field-fail block" v-if="valid.email.$invalid && valid.email.$dirty">
          Поле не должно быть пустым и быть адресом эл. почты
        </span>
    </div>

    <div class="double-block">

      <input type="tel"
             placeholder="Введите телефон кафедры"
             class="field-standard block"
             id="phone"
             @blur="valid.phone.$touch()"
             v-model="departmentValue.phone"/>

      <input type="email"
             placeholder="Введите почту кафедры"
             class="field-standard block"
             id="email"
             @blur="valid.email.$touch()"
             v-model="departmentValue.email"/>
    </div>

    <label class="field-label mt-10" for="address">Адрес кафедры</label>
    <span class="field-fail" v-if="valid.address.$invalid && valid.address.$dirty">
          Поле не должно быть пустым
    </span>
    <input type="text"
           placeholder="Введите адрес кафедры"
           class="field-standard"
           id="address"
           @blur="valid.address.$touch()"
           v-model="departmentValue.address"
           aria-label="Введите адрес кафедры"/>

    <label class="field-label mt-10" for="leader-teacher">Заведующий кафедры</label>
    <app-select id="leader-teacher"
                :options="teachers"
                @change="departmentValue.leaderId = $event"
                :select="departmentValue.leaderId"/>

    <input type="button"
           value="обновить"
           class="btn-standard mt-20"
           :disabled="valid.$invalid"
           @click="updateDepartment"/>

  </div>
</template>

<script lang="ts">

import {
  computed,
  defineComponent,
  PropType,
  ref,
} from 'vue';
import { Department, Teacher } from '@/types/SiteContentTypes';
import { useStore } from 'vuex';
import AppSelect from '@/components/UI/AppSelect.vue';
import useEditDepartment from '@/hooks/useEditDepartment';
import AppListAlert, { AlertMessage } from '@/components/UI/AppListAlert.vue';

export default defineComponent({
  name: 'TheSettingDepartment',
  components: {
    AppListAlert,
    AppSelect,
  },
  props: {
    department: {
      type: Object as PropType<Department>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const alerts = ref<Array<AlertMessage>>([]);

    const {
      department: departmentValue,
      valid,
      update,
    } = useEditDepartment(props.department);

    const updateDepartment = async () => {
      if (departmentValue.value.title !== props.department.title
        || departmentValue.value.slogan !== props.department.slogan
        || departmentValue.value.email !== props.department.email
        || departmentValue.value.phone !== props.department.phone
        || departmentValue.value.address !== props.department.address
        || departmentValue.value.leaderId !== props.department.leaderId) {
        try {
          await update();
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
