<script setup lang="ts">
import { onMounted } from 'vue'
import { useAccountsStore } from '@/stores/accounts'
import AccountsTable from '@/components/accounts/AccountsTable.vue'

const accountsStore = useAccountsStore()

onMounted(() => {
  accountsStore.loadFromStorage()
})

const handleAddAccount = () => {
  accountsStore.addAccount()
}

const handleDeleteAccount = (id: string) => {
  accountsStore.deleteAccount(id)
}
</script>

<template>
  <div class="accounts-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <h1>Учетные записи</h1>
          <el-button type="primary" @click="handleAddAccount">+</el-button>
        </div>
      </template>

      <el-alert
      title="Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;"
      type="info"
      :closable="false"
      show-icon
      class="mb-4"
      />

      <AccountsTable
      :accounts="accountsStore.accounts"
      @delete-account="handleDeleteAccount"
      />
    </el-card>
  </div>
</template>

<style scoped>
.accounts-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mb-4 {
  margin-bottom: 16px;
}
</style>