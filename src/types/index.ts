export interface LabelTag {
    text: string
}

export type RecordType = 'Локальная' | 'LDAP'

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
        recordType?: boolean
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