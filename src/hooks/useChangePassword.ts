import { ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import {
  minLength,
  required,
  sameAs,
  email as validEmail,
  maxLength,
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
      maxLength: maxLength(64),
      samePassword: sameAs(repeatPassword),
    },
    repeatPassword: {
      required,
    },
  };

  const valid = useVuelidate(rules, {
    email,
    password,
    repeatPassword,
  });

  return {
    email,
    password,
    repeatPassword,
    valid,
  };
};
