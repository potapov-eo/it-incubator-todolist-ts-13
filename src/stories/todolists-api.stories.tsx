import React, {ChangeEvent, useState} from 'react'
import {todolistAPI, TodoListType} from "../API/todolist-api";


export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<TodoListType[]>([])

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
        <button onClick={getTodo}>GET TODOs</button>
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
export const GetTasks = () => {
    const [state, setState] = useState<any>([])
    const [todolistId, setTodolistId] = useState<string>("6d780f66-25c6-45e9-b603-606016195c54")
    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const getTodo = () =>
        todolistAPI.GetTasks(todolistId).then((res) => {
            setState(res.data.items);
        })
    return <>
        <div> {JSON.stringify(state)}</div>
        <button onClick={getTodo}>GET TASKS</button>
        <input value={todolistId} onChange={onChangeTodolistId}/>
    </>
}
export const CreateTodolistTasks = () => {
    const [state, setState] = useState<any>(null)
    const [titleText, setTitleText] = useState<string>("")
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleText(e.currentTarget.value)
    }
    const [todolistId, setTodolistId] = useState<string>("6d780f66-25c6-45e9-b603-606016195c54")
    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }


    const CreateTodo = () => todolistAPI.CreateTodolistTasks(todolistId, titleText).then((res) => {
        setState(res.data);
    })

    return <>
        <div> {JSON.stringify(state)}</div>
        <button onClick={CreateTodo}>Create TodoTasks</button>
        <input value={titleText} onChange={onChangeTitle}/>
        <input value={todolistId} onChange={onChangeTodolistId}/>
    </>
}
export const DeleteTodolistTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("6d780f66-25c6-45e9-b603-606016195c54")
    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const [taskId, setTaskId] = useState<string>("")
    const onChangeTaskId = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }
    const DeleteTodo = () => todolistAPI.DeleteTodolistTasks(todolistId, taskId).then((res) => {
        setState(res.data);
    })


    return <>
        <div> {JSON.stringify(state)}</div>
        <button onClick={DeleteTodo}>Delete Todo</button>
        TODOLIST_ID<input value={todolistId} onChange={onChangeTodolistId}/>
        <>TASK_ID<input value={taskId} onChange={onChangeTaskId}/></>
    </>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>("")
    const onChangeTodolistTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const [todolistId, setTodolistId] = useState<string>("6d780f66-25c6-45e9-b603-606016195c54")
    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const [taskId, setTaskId] = useState<string>("3f339ffb-aa37-4872-a7d2-a78a3cf3aa53")
    const onChangeTaskId = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }
    let newTask = {
        title: title,
        description: "",
        completed: false,
        status: 0,
        priority: 0,
        startDate: "2020-12-14T06:29:43.143",
        deadline: "2020-12-14T06:29:43.143"
    }

    const ChangeTitle = () => todolistAPI.updateTaskTitle(todolistId, taskId, newTask)
        .then((res) => {
            setState(res.data)
        })


    return <>
        <div> {JSON.stringify(state)}</div>
        <button onClick={ChangeTitle}>UPDATE TITLE</button>
        <div> TITLE<input value={title} onChange={onChangeTodolistTitle}/></div>
        <div> TODOLIST_ID<input value={todolistId} onChange={onChangeTodolistId}/></div>
        <div>TASK_ID<input value={taskId} onChange={onChangeTaskId}/></div>
    </>
}