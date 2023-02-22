import { ChangeEvent, useState } from 'react'
import { Header } from './components/Header'
import styles from './App.module.css';

import './css/global.css'
import { Input } from './components/Input';
import { Task } from './components/Task';

interface TaskProps {
  content: string;
  finished: boolean;
}

function App() {

   //{content: 'Estudar React', finished: false},
    //{content: 'Estudar Next.js', finished: false},
    //{content: 'Estudar TypeScript', finished: false}
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [newTask, setNewTask] = useState('');
  const [countTasks, setCountTasks] = useState(tasks.length);
  const [countFinishedTasks, setCountFinishedTasks] = useState(0);

  function createNewTask(event: any) {
    event?.preventDefault();

    setTasks([...tasks, {
      content: newTask,
      finished: false
    }])
    setCountTasks((tasks) => {
      return tasks + 1
    });
    setNewTask('');
  }

  function newTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  function deleteTask(taskToDelete: string) {
    const tasksWithoutDeletedOne = tasks.filter((task) => {
      if (task.content === taskToDelete && task.finished === true) {
        setCountFinishedTasks((tasks) => {
          return tasks - 1
        });
      }
      return task.content !== taskToDelete
    });

    setTasks(tasksWithoutDeletedOne);
    setCountTasks((tasks) => {
      return tasks - 1
    });
  }

  function toggleTaskStatus(taskToComplete: string) {
    const tasksWithCompletedOne = tasks.map((task) => {
      if (task.content === taskToComplete)
        task.finished = !task.finished

      return task;
    });
    setTasks(tasksWithCompletedOne);

    const finishedTasks = tasks.filter((task) => {
      return task.finished === true
    });
    setCountFinishedTasks(finishedTasks.length);
  }

  return (
    <div>
      <Header />
      <div className={styles.wraper}>
        <form onSubmit={createNewTask} className={styles.taskForm}>
          <Input value={newTask} onChange={newTaskChange} />

          <button type="submit">Criar</button>
        </form>
        <div className={styles.tasksOverview}>
          <span>
            Tarefas criadas
            <span className={styles.tasksCounts}>
              {countTasks}
            </span>
          </span>
        
          <span>
            Concluídas
            <span className={styles.tasksCounts}>
              {countFinishedTasks} de {countTasks}
            </span>
          </span>  
        </div>
        <div className={styles.divTasks}>
          {tasks.length ?
            tasks.map((task) => {
              return (
                <Task
                  content={task.content}
                  key={task.content}
                  onDeleteTask={deleteTask}
                  onToggleTaskStatus={toggleTaskStatus}
                  finished={task.finished}
                />
              )
            }) : 
          <div className={styles.divEmptyTasks}>
            <p>Você ainda não tem tarefas criadas</p>
            <p>Crie tarefas e organize seus itens à fazer</p>
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default App
