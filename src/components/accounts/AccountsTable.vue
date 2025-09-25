<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue'
import type { AccountRecord } from '@/types'

interface Props {
  accounts: AccountRecord[]
}

interface Emits {
  (e: 'delete-account', id: string): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleDeleteAccount = (id: string) => {
  emit('delete-account', id)
}
</script>

<template>
  <el-table :data="accounts" style="width: 100%">
    <el-table-column prop="label" label="Метки" min-width="200">
      <template #default="{ row }">
        <span v-if="row.label">{{ row.label }}</span>
        <span v-else class="placeholder-text">Значение</span>
      </template>
    </el-table-column>

    <el-table-column prop="recordType" label="Тип записи" width="150">
      <template #default="{ row }">
        <span>{{ row.recordType }}</span>
      </template>
    </el-table-column>

    <el-table-column prop="login" label="Логин" min-width="150">
      <template #default="{ row }">
        <span v-if="row.login">{{ row.login }}</span>
        <span v-else class="placeholder-text">Значение</span>
      </template>
    </el-table-column>

    <el-table-column prop="password" label="Пароль" min-width="150">
      <template #default="{ row }">
        <span v-if="row.recordType === 'LDAP'" class="ldap-password">
          Скрыто для LDAP
        </span>
        <span v-else-if="row.password" class="masked-password">
          ••••••
        </span>
        <span v-else class="placeholder-text">Значение</span>
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
}

.masked-password {
  font-family: monospace;
  letter-spacing: 2px;
}
</style>