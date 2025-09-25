import { useAccountsStore } from '@/stores/accounts.ts'
import { useAccountValidation } from './useAccountValidation.ts'
import type { AccountRecord } from '@/types'

export function useAccountOperations() {
    const accountsStore = useAccountsStore()
    const { validateAccount, clearFieldError } = useAccountValidation()

    const addNewAccount = () => {
        accountsStore.addAccount()
    }

    const deleteAccount = (id: string) => {
        accountsStore.deleteAccount(id)
    }

    const onLabelInput = (account: AccountRecord) => {
        if (account.label.length <= 50) {
            accountsStore.updateAccountField(account.id, 'label', account.label)
            clearFieldError(account, 'label')
        }
    }

    const onLabelBlur = (account: AccountRecord) => {
        validateAccount(account)
        accountsStore.validateAccount(account.id)
    }

    const onRecordTypeChange = (account: AccountRecord) => {
        accountsStore.updateRecordType(account.id, account.recordType)
        validateAccount(account)
        accountsStore.validateAccount(account.id)
    }

    const onLoginInput = (account: AccountRecord) => {
        if (account.login.length <= 100) {
            accountsStore.updateAccountField(account.id, 'login', account.login)
            clearFieldError(account, 'login')
        }
    }

    const onLoginBlur = (account: AccountRecord) => {
        validateAccount(account)
        accountsStore.validateAccount(account.id)
    }

    const onPasswordInput = (account: AccountRecord) => {
        if (account.password && account.password.length <= 100) {
            accountsStore.updateAccountField(account.id, 'password', account.password)
            clearFieldError(account, 'password')
        }
    }

    const onPasswordBlur = (account: AccountRecord) => {
        validateAccount(account)
        accountsStore.validateAccount(account.id)
    }

    return {
        addNewAccount,
        deleteAccount,
        onLabelInput,
        onLabelBlur,
        onRecordTypeChange,
        onLoginInput,
        onLoginBlur,
        onPasswordInput,
        onPasswordBlur
    }
}