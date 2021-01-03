import {setAppErrorAC, setAppStatusAC} from "../app/App-reducer";
import {Dispatch} from "redux";
import {addTaskAC, removeTaskAC} from "../features/TodolistsList/tasks-reducer";


type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
export const handleServerAppError =<D>(data:ResponseType<D>,dispatch:Dispatch<ActionsType>)=>{
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}
type ActionsType =  | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>


export const handleServerNetworkError =<D>(error: { message:string },dispatch:Dispatch<ActionsType>)=>{
    dispatch(setAppErrorAC(error.message? error.message: "some error occurred"))
    dispatch(setAppStatusAC('failed'))
}