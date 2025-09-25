export interface LabelTag {
    text: string
}

export type RecordType = 'Локальная' | 'LDAP'

export type AccountEditableField = 'label' | 'login' | 'password'

export interface AccountRecord {
    id: string
    label: string
    labelTags: LabelTag[]
    recordType: RecordType
    login: string
    password: string | null
    errors: {
        label?: boolean
        login?: boolean
        password?: boolean
    }
}

export interface AccountFormErrors {
[key: string]: boolean
}

export interface ValidationResult {
    isValid: boolean
    errors: AccountFormErrors
}

export interface SavedAccountData {
    id: string
    labelTags: LabelTag[]
    recordType: RecordType
    login: string
    password: string | null
}