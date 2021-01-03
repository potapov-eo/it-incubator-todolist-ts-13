import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@material-ui/core';
import {RequestStatusType} from "../../app/App-reducer";
import s from "./EditableSpan.module.css";
type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
    entityStatusTodo?:RequestStatusType

}

export const EditableSpan = React.memo(function ({entityStatusTodo='idle', ...props}: EditableSpanPropsType) {
const disabled=(entityStatusTodo==="loading")
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return disabled
        ?<span className={s.dis}>{props.value}</span>
        :(editMode
        ?    <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} />
        : <span onDoubleClick={activateEditMode}>{props.value}</span>)
});
