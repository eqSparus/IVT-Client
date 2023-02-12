<template>
    <div class="item-container">

        <select aria-label="Выбирете иконку" class="fs-20">
            <option disabled>Иконка</option>
            <option>Вк</option>
            <option>ОмГТУ</option>
            <option>Телеграм</option>
            <option>Ватсап</option>
        </select>

        <input type="text" placeholder="Введите ссылку" aria-label="Выбирете ссылку" class="field-standard" />

        <input type="button" value="УДАЛИТЬ" class="btn-warning" />
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppDepartmentLinkItem',
});
</script>

<style lang="scss" scoped>
.item-container {
    display: flex;
    flex-flow: row;
    justify-content: space-around;
    gap: 10px;

    select{
        border: 1px solid blue;
        background: transparent;
    }

    input:nth-child(1) {
        flex: 3;
    }

    input:nth-child(2) {
        flex: 1;
    }
}
</style>
