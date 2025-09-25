<script setup lang="ts">
interface Props {
  modelValue: 'Локальная' | 'LDAP' | ''
}

interface Emits {
  (e: 'update:modelValue', value: 'Локальная' | 'LDAP'): void
  (e: 'change'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const onChange = (value: 'Локальная' | 'LDAP') => {
  emit('update:modelValue', value)
  emit('change')
}
</script>

<template>
  <el-select
      :model-value="modelValue"
      @update:model-value="onChange"
      placeholder="Выберите тип"
  >
    <el-option label="Локальная" value="Локальная" />
    <el-option label="LDAP" value="LDAP" />
  </el-select>
</template>