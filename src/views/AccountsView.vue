<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { useAccountsStore } from '@/stores/accounts'
import { useAccountOperations } from '@/components/composables/useAccountOperations'
import AccountsTable from '@/components/accounts/AccountsTable.vue'

const accountsStore = useAccountsStore()
const {
  addNewAccount,
  deleteAccount,
  onLabelInput,
  onLabelBlur,
  onRecordTypeChange,
  onLoginInput,
  onLoginBlur,
  onPasswordInput,
  onPasswordBlur
} = useAccountOperations()

onMounted(() => {
  accountsStore.loadFromStorage()
})

const debugData = computed(() => {
  return JSON.stringify(accountsStore.getAccountsForSave, null, 2)
})
</script>

<template>
  <div class="accounts-container">
    <el-card class="accounts-card">
      <template #header>
        <div class="card-header">
          <h1>Учетные записи</h1>
          <el-button
           type="primary"
           :icon="Plus"
           @click="addNewAccount"
           circle
          />
        </div>
      </template>

      <el-alert
          title="Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;"
          type="info"
          show-icon
          :closable="false"
          class="info-alert"
      />

      <AccountsTable
          :accounts="accountsStore.accounts"
          @delete-account="deleteAccount"
          @label-input="onLabelInput"
          @label-blur="onLabelBlur"
          @record-type-change="onRecordTypeChange"
          @login-input="onLoginInput"
          @login-blur="onLoginBlur"
          @password-input="onPasswordInput"
          @password-blur="onPasswordBlur"
      />
    </el-card>

    <el-card v-if="accountsStore.accounts.length > 0" class="debug-card">
      <template #header>
        <h3>Сохраненные данные (для демонстрации)</h3>
      </template>
      <el-scrollbar height="300px">
        <pre class="debug-content">{{ debugData }}</pre>
      </el-scrollbar>
    </el-card>
  </div>
</template>

<style scoped>
.accounts-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.accounts-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h1 {
  margin: 0;
  font-size: 24px;
  color: #303133;
}

.info-alert {
  margin-bottom: 20px;
}

.debug-card {
  margin-top: 20px;
}

.debug-content {
  background: #f5f7fa;
  padding: 15px;
  border-radius: 4px;
  font-size: 12px;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>