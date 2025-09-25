<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue'
import type { AccountRecord } from '@/types'

interface Props {
  accounts: AccountRecord[]
}

interface Emits {
  (e: 'delete-account', id: string): void
  (e: 'update-field', accountId: string, field: string, value: string | null): void
  (e: 'update-record-type', accountId: string, recordType: 'Локальная' | 'LDAP'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleDeleteAccount = (id: string) => {
  emit('delete-account', id)
}

const handleFieldUpdate = (accountId: string, field: string, value: string | null) => {
  emit('update-field', accountId, field, value)
}

const handleRecordTypeUpdate = (accountId: string, recordType: 'Локальная' | 'LDAP') => {
  emit('update-record-type', accountId, recordType)
}

const handleFieldBlur = (accountId: string, field: string, account: AccountRecord) => {
  const value = account[field as keyof AccountRecord] as string | null
  emit('update-field', accountId, field, value)
}
</script>

<template>
  <el-table :data="accounts" style="width: 100%">
    <el-table-column prop="label" label="Метки" min-width="200">
      <template #default="{ row }">
        <el-input
            :model-value="row.label"
            placeholder="Значение"
            @update:model-value="(value) => handleFieldUpdate(row.id, 'label', value)"
            @blur="() => handleFieldBlur(row.id, 'label', row)"
            maxlength="50"
            show-word-limit
            size="small"
        />
      </template>
    </el-table-column>

    <el-table-column prop="recordType" label="Тип записи" width="150">
      <template #default="{ row }">
        <el-select
            :model-value="row.recordType"
            @update:model-value="(value) => handleRecordTypeUpdate(row.id, value)"
            style="width: 100%"
        >
          <el-option label="Локальная" value="Локальная" />
          <el-option label="LDAP" value="LDAP" />
        </el-select>
      </template>
    </el-table-column>

    <el-table-column prop="login" label="Логин" min-width="150">
      <template #default="{ row }">
        <el-input
            class ="placeholder-text"
            :model-value="row.login"
            placeholder="Значение"
            @update:model-value="(value) => handleFieldUpdate(row.id, 'login', value)"
            @blur="() => handleFieldBlur(row.id, 'login', row)"
            maxlength="100"
            show-word-limit
        />
      </template>
    </el-table-column>

    <el-table-column prop="password" label="Пароль" min-width="150">
      <template #default="{ row }">
        <div v-if="row.recordType === 'LDAP'" class="ldap-password">
          Скрыто для LDAP
        </div>
        <el-input
            class ="masked-password"
            v-else
            :model-value="row.password || ''"
            type="password"
            placeholder="Введите пароль"
            @update:model-value="(value) => handleFieldUpdate(row.id, 'password', value)"
            @blur="() => handleFieldBlur(row.id, 'password', row)"
            maxlength="100"
            show-word-limit
        />
      </template>
    </el-table-column>

    <el-table-column label="Действия" width="100" align="center">
      <template #default="{ row }">
        <el-button
            type="danger"
            size="small"
            @click="handleDeleteAccount(row.id)"
            :icon="Delete"
        />
      </template>
    </el-table-column>

    <template #empty>
      <el-empty description="Нет учетных записей" />
    </template>
  </el-table>
</template>

<style scoped>
.placeholder-text {
  color: #c0c4cc;
  font-style: italic;
}

.ldap-password {
  color: #909399;
  font-style: italic;
  padding: 8px 12px;
}

.masked-password {
  font-family: monospace;
  letter-spacing: 2px;
}
</style>