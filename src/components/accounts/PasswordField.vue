<script setup lang="ts">
interface Props {
  modelValue?: string
  recordType: 'Локальная' | 'LDAP'
  error?: boolean
  maxlength?: number
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'blur'): void
  (e: 'input'): void
}

const props = withDefaults(defineProps<Props>(), {
  maxlength: 100
})

const emit = defineEmits<Emits>()

const onInput = () => {
  if (props.modelValue && props.modelValue.length <= props.maxlength) {
    emit('input')
  }
}

const onBlur = () => {
  emit('blur')
}
</script>

<template>
  <el-input
      v-if="recordType === 'Локальная'"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      type="password"
      placeholder="••••••"
      :maxlength="maxlength"
      show-word-limit
      :class="{ 'is-error': error }"
      @input="onInput"
      @blur="onBlur"
  />
  <span v-else class="ldap-text">Скрыто для LDAP</span>
</template>

<style scoped>
.ldap-text {
  color: #909399;
  font-style: italic;
}

.is-error {
  border-color: #f56c6c !important;
}
</style>