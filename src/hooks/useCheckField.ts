import { ref } from 'vue';

interface Check {

  check(value: string): boolean;

}

export default (options: Array<Check>, defaultValue = '') => {
  const value = ref<string>(defaultValue);
  const error = ref<string>('');

  return {
    value,
    error,
  };
};

export class CheckSize implements Check {

  private readonly size: number;

  constructor(size: number) {
    this.size = size;
  }

  check(value: string): boolean {
    return value.length > this.size;
  }
}
