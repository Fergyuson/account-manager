import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { AccountRecord } from '@/types'

export const useAccountsStore = defineStore('accounts', () => {
    const accounts = ref<AccountRecord[]>([])

    const loadFromStorage = () => {
        const saved = localStorage.getItem('vue-accounts')
        if (saved) {
            try {
            accounts.value = JSON.parse(saved)
            console.log(`Загружено ${accounts.value.length} аккаунтов из localStorage`)
            } catch (error) {
            console.error('Ошибка при загрузке данных:', error)
            accounts.value = []
            }
        }
    }

    const saveToStorage = () => {
        localStorage.setItem('vue-accounts', JSON.stringify(accounts.value))
    }

    const addAccount = () => {
        const newAccount: AccountRecord = {
        id: Date.now().toString(),
        label: '',
        labelTags: [],
        recordType: 'Локальная',
        login: '',
        password: '',
        errors: {}
        }

        accounts.value.push(newAccount)
        saveToStorage()
        console.log(`Добавлен аккаунт. Всего: ${accounts.value.length}`)
    }

    return {
        accounts,
        loadFromStorage,
        addAccount
    }
})