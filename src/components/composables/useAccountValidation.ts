import type { AccountRecord } from '@/types'

export function useAccountValidation() {
    const validateAccount = (account: AccountRecord): boolean => {
        let isValid = true

        if (!account.login || account.login.trim() === '') {
        account.errors.login = true
        isValid = false
        }

        if (account.recordType === 'Локальная') {
            if (!account.password || account.password.trim() === '') {
            account.errors.password = true
            isValid = false
            }
        }

        return isValid
    }

    const clearFieldError = (account: AccountRecord, field: keyof AccountRecord['errors']) => {
        account.errors[field] = false
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