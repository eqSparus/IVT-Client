import { computed, reactive, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import {
  minLength, required, sameAs, email as validEmail,
} from '@vuelidate/validators';

export default () => {
  const email = ref<string>('');
  const password = ref<string>('');
  const repeatPassword = ref<string>('');

  const rules = {
    email: {
      required,
      email: validEmail,
    },
    password: {
      required,
      minLength: minLength(12),
      samePassword: sameAs(repeatPassword),
    },
    repeatPassword: {
      required,
    },
  };

  const validate = useVuelidate(rules, {
    email,
    password,
    repeatPassword,
  });

  const isPasswordLength = computed(() => validate.value.password.minLength.$invalid);
  const isPasswordRequired = computed(() => validate.value.password.required.$invalid
    && validate.value.password.$dirty);
  const isPasswordSame = computed(() => validate.value.password.samePassword.$invalid
    && validate.value.password.$dirty && validate.value.repeatPassword.$dirty);
  const isRepeatPasswordRequired = computed(() => validate.value.repeatPassword.$invalid
    && validate.value.repeatPassword.$dirty);
  const isDisableBtnPassword = computed(() => validate.value.password.$invalid
    || validate.value.repeatPassword.$invalid);

  const isEmail = computed(() => validate.value.email.$invalid && validate.value.email.$dirty);
  const isDisableBtnEmail = computed(() => validate.value.email.$invalid);

  const valid = reactive({
    isPasswordLength,
    isPasswordRequired,
    isPasswordSame,
    isRepeatPasswordRequired,
    isDisableBtnPassword,
    isEmail,
    isDisableBtnEmail,
  });

  return {
    email,
    password,
    repeatPassword,
    validate,
    valid,
  };
};
