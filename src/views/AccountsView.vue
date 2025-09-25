<script setup lang="ts">
import { onMounted } from 'vue'
import { useAccountsStore } from '@/stores/accounts'

const accountsStore = useAccountsStore()

onMounted(() => {
  accountsStore.loadFromStorage()
})

const handleAddAccount = () => {
  accountsStore.addAccount()
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

      <el-empty description="Accounts table" />
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
</style>