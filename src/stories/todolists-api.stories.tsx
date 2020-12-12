import React, {ChangeEvent, useEffect, useState} from 'react'
import {todolistAPI} from "../API/todolist-api";


export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any[]>([])

    const getTodo = () =>
        todolistAPI.GetTodolists().then((res) => {
            setState(res.data);
        })


    return <>
        <div> {JSON.stringify(state)}</div>
        {state.map(td => {
            return <div>{td.order} ---------------- {td.id}</div>
        })
        }
        <button onClick={getTodo}>GET TODO</button>

    </>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [titleText, setTitleText] = useState<string>("")
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleText(e.currentTarget.value)
    }
    const CreateTodo = () => todolistAPI.CreateTodolist(titleText).then((res) => {
        setState(res.data);
    })

    return <>
        <div> {JSON.stringify(state)}</div>
        <button onClick={CreateTodo}>Create Todo</button>
        <input value={titleText} onChange={onChangeTitle}/>
    </>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const DeleteTodo = () => todolistAPI.DeleteTodolist(todolistId).then((res) => {
        setState(res.data);
    })


    return <>
        <div> {JSON.stringify(state)}</div>
        <button onClick={DeleteTodo}>Delete Todo</button>
        <input value={todolistId} onChange={onChangeTodolistId}/>
    </>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>("")
    const onChangeTodolistTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const [todolistId, setTodolistId] = useState<string>("")
    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const ChangeTitle = () => todolistAPI.updateTodoTitle(todolistId, title)
        .then((res) => {
            setState(res.data)
        })


    return <>
        <div> {JSON.stringify(state)}</div>
        <button onClick={ChangeTitle}>UPDATE TITLE</button>
        <input value={title} onChange={onChangeTodolistTitle}/>title
        <input value={todolistId} onChange={onChangeTodolistId}/>todolistId
    </>
}
