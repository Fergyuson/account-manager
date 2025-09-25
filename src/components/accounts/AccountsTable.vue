<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue'
import LabelTags from './LabelTags.vue'
import AccountTypeSelect from './AccountTypeSelect.vue'
import PasswordField from './PasswordField.vue'
import type { AccountRecord } from '@/types'

interface Props {
  accounts: AccountRecord[]
}

interface Emits {
  (e: 'delete-account', id: string): void
  (e: 'label-input', account: AccountRecord): void
  (e: 'label-blur', account: AccountRecord): void
  (e: 'record-type-change', account: AccountRecord): void
  (e: 'login-input', account: AccountRecord): void
  (e: 'login-blur', account: AccountRecord): void
  (e: 'password-input', account: AccountRecord): void
  (e: 'password-blur', account: AccountRecord): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()


const cellSpanMethod = ({ row, columnIndex }: any) => {
  if (columnIndex === 2 && row.recordType === 'LDAP') {
    return {
    rowspan: 1,
    colspan: 2
    }
  }

  if (columnIndex === 3 && row.recordType === 'LDAP') {
    return {
    rowspan: 0,
    colspan: 0
    }
  }

  return {
  rowspan: 1,
  colspan: 1
  }
}

const deleteAccount = (id: string) => {
  emit('delete-account', id)
}

const onLabelInput = (account: AccountRecord) => {
  emit('label-input', account)
}

const onLabelBlur = (account: AccountRecord) => {
  emit('label-blur', account)
}

const onRecordTypeChange = (account: AccountRecord) => {
  emit('record-type-change', account)
}

const onLoginInput = (account: AccountRecord) => {
  emit('login-input', account)
}

const onLoginBlur = (account: AccountRecord) => {
  emit('login-blur', account)
}

const onPasswordInput = (account: AccountRecord) => {
  emit('password-input', account)
}

const onPasswordBlur = (account: AccountRecord) => {
  emit('password-blur', account)
}
</script>

<template>
  <el-table
   :data="accounts"
   :span-method="cellSpanMethod"
   empty-text="Нет учетных записей. Нажмите кнопку '+' для добавления новой записи."
   class="accounts-table"
  >

    <el-table-column label="Метка" min-width="150">
      <template #default="{ row }">
        <LabelTags
         v-model="row.label"
         :error="row.errors.label"
         @input="onLabelInput(row)"
         @blur="onLabelBlur(row)"
        />
      </template>
    </el-table-column>

    <el-table-column label="Тип записи" width="160">
      <template #default="{ row }">
        <AccountTypeSelect
         v-model="row.recordType"
         @change="onRecordTypeChange(row)"
        />
      </template>
    </el-table-column>

    <el-table-column
     label="Логин"
     min-width="150"
    >
      <template #default="{ row }">
        <el-input
         v-model="row.login"
         placeholder="Значение"
         maxlength="100"
         how-word-limit
         :class="{ 'is-error': row.errors.login }"
         @input="onLoginInput(row)"
         @blur="onLoginBlur(row)"
        />
      </template>
    </el-table-column>

    <el-table-column
        label="Пароль"
        min-width="150"
    >
      <template #default="{ row }">
        <PasswordField
         v-model="row.password"
         :record-type="row.recordType"
         :error="row.errors.password"
         @input="onPasswordInput(row)"
         @blur="onPasswordBlur(row)"
        />
      </template>
    </el-table-column>

    <el-table-column label="Действия" width="100" align="center">
      <template #default="{ row }">
        <el-button
         type="danger"
         :icon="Delete"
         size="small"
         circle
         @click="deleteAccount(row.id)"
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
.accounts-table {
  width: 100%;
}

.is-error {
  border-color: #f56c6c !important;
}
</style>