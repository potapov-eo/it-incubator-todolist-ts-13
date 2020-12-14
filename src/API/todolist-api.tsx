import axios from 'axios'

export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type TasksType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    data: T
    fieldsErrors: string[]
}
type GetTaskResponseType = {
    items: TasksType[]
    totalCount: number
    error: string | null
}
export type UpdateTaskType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
         'API-KEY': 'b3ca8020-1484-4395-b201-af81d226c6c0'
    }
})


export const todolistAPI = {
    GetTodolists() {
        return instance.get<Array<TodoListType>>('todo-lists')
    },
    updateTodoTitle(todolistId: string, title: string) {
        debugger
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
    },
    CreateTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>('todo-lists', {title})
    },
    DeleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    GetTasks(todolistId: string) {
        return instance.get<GetTaskResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    CreateTodolistTasks(todolistId: string, title: string) {
        return instance.post<ResponseType<TasksType>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    DeleteTodolistTasks(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTaskTitle(todolistId: string, taskId: string, updateTask: UpdateTaskType) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, updateTask)
    },
}
