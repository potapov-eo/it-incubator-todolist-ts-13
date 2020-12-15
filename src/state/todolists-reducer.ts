import {todolistAPI, TodoListType} from "../API/todolist-api";
import {Dispatch} from "redux";


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    todolist: TodoListType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}
export type SetTodoListsActionType = {
    type: 'SET-TODOLISTS',
    todolists: Array<TodoListType>
}

type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodoListsActionType

const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodoListType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST': {
            const newTodo: TodolistDomainType = {...action.todolist, filter: "all"}
            return [newTodo, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => {
                return {
                    ...tl, filter: 'all'
                }
            })
        }

        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (todolist: TodoListType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolist}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
export const setTodoListsAC = (todolists: Array<TodoListType>): SetTodoListsActionType => {
    return {type: 'SET-TODOLISTS', todolists}
}

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    todolistAPI.GetTodolists()
        .then((res) => {
            dispatch(setTodoListsAC(res.data))
        })
}
export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
    todolistAPI.DeleteTodolist(id)
        .then((res) => {
            dispatch(removeTodolistAC(id))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistAPI.CreateTodolist(title)
        .then((res) => {
            dispatch(addTodolistAC( res.data.data.item))
        })
}
export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodoTitle(id,title)
        .then((res) => {
            dispatch(changeTodolistTitleAC( id,title))
        })
}