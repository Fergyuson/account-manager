import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type {
    AccountEditableField,
    AccountRecord,
    LabelTag,
    RecordType,
    SavedAccountData
} from '@/types'

const STORAGE_KEY = 'vue-accounts'

const createLabelTags = (label: string): LabelTag[] => {
    return label
    .split(';')
    .map(tag => tag.trim())
    .filter(Boolean)
    .map(text => ({ text }))
}

const createEmptyAccount = (): AccountRecord => ({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    label: '',
    labelTags: [],
    recordType: 'Локальная',
    login: '',
    password: '',
    errors: {}
})

const mapSavedToAccount = (item: SavedAccountData): AccountRecord => {
    const labelTags = item.labelTags ?? []
    const label = labelTags.map(tag => tag.text).join(';')

    return {
    id: item.id,
    label,
    labelTags,
    recordType: item.recordType,
    login: item.login,
    password: item.recordType === 'LDAP' ? null : item.password ?? '',
    errors: {}
    }
}

export const useAccountsStore = defineStore('accounts', () => {
    const accounts = ref<AccountRecord[]>([])

    const getAccountsForSave = computed<SavedAccountData[]>(() =>
        accounts.value.map(account => ({
        id: account.id,
        labelTags: account.labelTags,
        recordType: account.recordType,
        login: account.login,
        password: account.recordType === 'LDAP' ? null : account.password ?? ''
        }))
    )

    const saveToStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getAccountsForSave.value))
    }

    const loadFromStorage = () => {
    const saved = localStorage.getItem(STORAGE_KEY)

        if (!saved) {
        return
        }

        try {
        const parsed = JSON.parse(saved) as SavedAccountData[]
        accounts.value = parsed.map(mapSavedToAccount)
        } catch (error) {
          console.error('Ошибка при загрузке данных из localStorage', error)
          accounts.value = []
        }
    }

    const addAccount = () => {
    accounts.value.push(createEmptyAccount())
    saveToStorage()
    }

    const deleteAccount = (id: string) => {
        const index = accounts.value.findIndex(account => account.id === id)

        if (index === -1) {
        return
        }

        accounts.value.splice(index, 1)
        saveToStorage()
    }

    const clearFieldError = (accountId: string, field: AccountEditableField) => {
        const account = accounts.value.find(item => item.id === accountId)

        if (!account) {
        return
        }

        delete account.errors[field]
    }

    const updateAccountField = (
        accountId: string,
        field: AccountEditableField,
        value: string | null
    ) => {
        const account = accounts.value.find(item => item.id === accountId)

        if (!account) {
        return
        }

        if (field === 'label') {
        account.label = (value ?? '').slice(0, 50)
        account.labelTags = createLabelTags(account.label)
        } else if (field === 'login') {
          account.login = (value ?? '').slice(0, 100)
        } else if (field === 'password') {
          account.password = value === null ? null : value.slice(0, 100)
        }

        clearFieldError(accountId, field)
        saveToStorage()
    }

    const updateRecordType = (accountId: string, recordType: RecordType) => {
        const account = accounts.value.find(item => item.id === accountId)

        if (!account) {
        return
        }

        account.recordType = recordType

        if (recordType === 'LDAP') {
        account.password = null
        delete account.errors.password
        } else if (account.password === null) {
          account.password = ''
        }

        saveToStorage()
    }

    const validateAccount = (accountId: string) => {
        const account = accounts.value.find(item => item.id === accountId)

        if (!account) {
        return false
        }

        const errors: AccountRecord['errors'] = {}

        if (account.label.length > 50) {
        errors.label = true
        }

        if (!account.login.trim()) {
        errors.login = true
        }

        if (account.recordType === 'Локальная') {
            if (!account.password || !account.password.trim()) {
            errors.password = true
            }
        }

        account.errors = errors

        if (Object.keys(errors).length === 0) {
        saveToStorage()
        return true
        }

        return false
    }

    return {
        accounts,
        addAccount,
        deleteAccount,
        loadFromStorage,
        updateAccountField,
        updateRecordType,
        validateAccount,
        clearFieldError,
        getAccountsForSave

    }
})