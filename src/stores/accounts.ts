import { defineStore } from 'pinia'
import type { AccountRecord } from '@/types'

export const useAccountsStore = defineStore('accounts', {
    state: () => ({
        accounts: [] as AccountRecord[]
    }),

    actions: {
        loadFromStorage() {
            const saved = localStorage.getItem('vue-accounts')
            if (saved) {
                try {
                    this.accounts = JSON.parse(saved)
                } catch (error) {
                    console.error('Ошибка при загрузке данных:', error)
                    this.accounts = []
                }
            }
        },

        saveToStorage() {
            localStorage.setItem('vue-accounts', JSON.stringify(this.accounts))
        },

        addAccount() {
            const newAccount: AccountRecord = {
                id: Date.now().toString(),
                label: '',
                labelTags: [],
                recordType: 'Локальная',
                login: '',
                password: '',
                errors: {}
            }

            this.accounts.push(newAccount)
            this.saveToStorage()
        },

        updateAccountField(id: string, field: keyof AccountRecord, value: any) {
            const account = this.accounts.find(acc => acc.id === id)
            if (!account) return

                ;(account as any)[field] = value

            if (field === 'label') {
                account.labelTags = value
                    ? value.split(';').filter((tag: string) => tag.trim()).map((tag: string) => ({ text: tag.trim() }))
                    : []
            }

            if (field === 'recordType' && value === 'LDAP') {
                account.password = null
            }

            this.saveToStorage()
        },

        deleteAccount(id: string) {
            const index = this.accounts.findIndex(acc => acc.id === id)
            if (index !== -1) {
                this.accounts.splice(index, 1)
                this.saveToStorage()
            }
        },

        validateAccount(id: string): boolean {
            const account = this.accounts.find(acc => acc.id === id)
            if (!account) return false

            const errors: AccountRecord['errors'] = {}

            if (!account.login.trim()) {
                errors.login = true
            }

            if (account.recordType === 'Локальная' && !account.password?.trim()) {
                errors.password = true
            }

            if (account.label.length > 50) {
                errors.label = true
            }

            if (account.login.length > 100) {
                errors.login = true
            }

            if (account.password && account.password.length > 100) {
                errors.password = true
            }

            account.errors = errors
            this.saveToStorage()

            return Object.keys(errors).length === 0
        },

        clearFieldError(id: string, field: keyof AccountRecord['errors']) {
            const account = this.accounts.find(acc => acc.id === id)
            if (account && account.errors) {
                delete account.errors[field]
            }
        }
    },

    getters: {
        getAccountsForSave: (state) => {
            return state.accounts.map(account => ({
                id: account.id,
                labelTags: account.labelTags,
                recordType: account.recordType,
                login: account.login,
                password: account.recordType === 'LDAP' ? null : account.password
            }))
        },

        validAccountsCount: (state) => {
            return state.accounts.filter(account =>
                Object.keys(account.errors).length === 0 &&
                account.login.trim() &&
                (account.recordType === 'LDAP' || account.password?.trim())
            ).length
        }
    }
})