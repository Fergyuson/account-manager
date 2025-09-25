import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAccountsStore = defineStore('accounts', () => {

    const accounts = ref([])

    const loadFromStorage = () => {
        console.log('loadFromStorage - будет реализовано')
    }

    const addAccount = () => {
        console.log('addAccount - будет реализовано')
    }

    return {
        accounts,
        loadFromStorage,
        addAccount
    }
})