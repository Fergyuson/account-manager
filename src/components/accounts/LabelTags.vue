<script setup lang="ts">


interface Props {
  modelValue: string
  error?: boolean
  maxlength?: number
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'blur'): void
  (e: 'input'): void
}

const props = withDefaults(defineProps<Props>(), {
  maxlength: 50
})

const emit = defineEmits<Emits>()

const onInput = () => {
  if (props.modelValue.length <= props.maxlength) {
    emit('input')
  }
}

const onBlur = () => {
  emit('blur')
}
</script>

<template>
  <el-input
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      placeholder="XXX"
      :maxlength="maxlength"
      show-word-limit
      :class="{ 'is-error': error }"
      @input="onInput"
      @blur="onBlur"
  />
</template>

<style scoped>
.is-error {
  border-color: #f56c6c !important;
}
</style>