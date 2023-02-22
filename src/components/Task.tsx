import { DOMAttributes } from 'react';
import styles from './Task.module.css';

interface TaskProps {
    content: string;
    onDeleteTask: (task: string) => void;
    onToggleTaskStatus: (task: string) => void;
    finished: boolean;
}

export function Task({ content, onDeleteTask, onToggleTaskStatus, finished }: TaskProps) {

    function handleDeleteTask() {
        onDeleteTask(content);
    }

    function handleChangeTaskStatus() {
        onToggleTaskStatus(content)
    }

    return (
        <div className={styles.tasksTable}>
            <input type="checkbox" onChange={handleChangeTaskStatus} checked={finished} ></input>
            <span className={finished ? styles.taskCompleted : styles.taskUncompleted}>{content}</span>
            <button onClick={handleDeleteTask} >excluir</button>
        </div>
    )
}