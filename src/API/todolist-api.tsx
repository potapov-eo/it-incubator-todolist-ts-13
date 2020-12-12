import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': 'b3ca8020-1484-4395-b201-af81d226c6c0'
    }
}


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': 'b3ca8020-1484-4395-b201-af81d226c6c0'
    }
})



export const todolistAPI = {
    GetTodolists() {
        return instance.get('todo-lists')
    },
    updateTodoTitle(todolistId: string, title: string) {debugger
        return instance.put(`todo-lists/${todolistId}`, {title: title})
    },
    CreateTodolist(title: string) {
        return instance.post('todo-lists', {title})
    },
    DeleteTodolist(todolistId: string) {
        return instance.delete(`todo-lists/${todolistId}`)
    },
}
