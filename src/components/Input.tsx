import { ChangeEvent } from "react";

interface InputProps {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function Input(props: InputProps) {
    return (
        <input type="text" name="task" value={props.value} onChange={props.onChange} placeholder='Adicione uma nova tarefa'/>
    )
}