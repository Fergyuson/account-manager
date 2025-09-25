import type { AccountRecord, AccountEditableField } from '@/types'

export function useAccountValidation() {
    const validateAccount = (account: AccountRecord): boolean => {
        let isValid = true
        const errors: AccountRecord['errors'] = {}

        if (account.label.length > 50) {
        errors.label = true
        isValid = false
        }

        if (!account.login || account.login.trim() === '') {
        errors.login = true
        isValid = false
        }

        if (account.recordType === 'Локальная') {
            if (!account.password || account.password.trim() === '') {
            errors.password = true
            isValid = false
            }
        }

        account.errors = errors

        return isValid
    }

    const clearFieldError = (account: AccountRecord, field: AccountEditableField) => {
        if (account.errors[field]) {
        delete account.errors[field]
        }
    }

    const transformLabelToTags = (label: string) => {
        if (!label.trim()) return []

        return label
        .split(';')
        .map(tag => tag.trim())
        .filter(tag => tag !== '')
        .map(tag => ({ text: tag }))
    }

    const transformTagsToLabel = (tags: { text: string }[]) => {
        return tags.map(tag => tag.text).join(';')
    }

    return {
        validateAccount,
        clearFieldError,
        transformLabelToTags,
        transformTagsToLabel
    }
}