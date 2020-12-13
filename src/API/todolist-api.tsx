import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': 'b3ca8020-1484-4395-b201-af81d226c6c0'
    }
}
export type TodoListType = {
    id:string
    title:string
    addedDate:string
    order:number
}
export type TasksType = {
    description: string
    title: string
    completed: boolean
    status: any
    priority:any
    startDate: any
    deadline: any
    id: string
    todoListId: string
    order: any
    addedDate: any
}
type ResponseType<T={}> = {
    resultCode: number
    messages: Array<string>
    data: T
}
type ResponseGetTasksType={
    error: string
    items: TasksType[]
    totalCount: number

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
        return instance.get<Array<TodoListType>>('todo-lists')
    },
    updateTodoTitle(todolistId: string, title: string) {debugger
        return instance.put< ResponseType>(`todo-lists/${todolistId}`, {title: title})
    },
    CreateTodolist(title: string) {
        return instance.post<ResponseType<{  item: TodoListType }>>('todo-lists', {title})
    },
    DeleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    GetTasks(todolistId: string) {
        return instance.get<ResponseGetTasksType>(`todo-lists/${todolistId}/tasks`)
    },
    CreateTodolistTasks(todolistId: string, title: string) {
        return instance.post(`todo-lists/${todolistId}/tasks`, {title})
    },
    DeleteTodolistTasks(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    /*updateTaskTitle(todolistId: string,taskId: string, title: string) {debugger
        return instance.put< ResponseType>(`todo-lists/${todolistId}`, {title: title, description:null, completed             })
    },*/
}
