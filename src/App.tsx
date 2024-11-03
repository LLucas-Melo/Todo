import { v4 as uuidv4 } from 'uuid';
import { ChangeEvent, useState } from 'react'

import styles from './App.module.css'


import Header from './components/header/Header'
import { Item } from './listComponets/item/Item'
import { Head } from './listComponets/head/Header'

import Empty from './listComponets/empty/Empty'
import { Input } from './components/input/Input'
import Button from './components/button/Button'
import { PlusCircle } from 'phosphor-react'
import { Task } from './utils/util'

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [inputValue, setInputValue] = useState('')

  const checkedTasksCounter = tasks.reduce((prevValue, currentTask) => {
    if (currentTask.isCompleted) {
      return prevValue + 1
    }
    return prevValue
  }, 0)

  function handleAddTask() {
    if (!inputValue) {
      return
    }

    const newTask: Task = {
      id: uuidv4(),
      text: inputValue,
      isCompleted: false,
    }

    setTasks((state) => [...state, newTask])
    setInputValue('')
  }

  function handleRemoveTask(id: string) {
    if (!confirm('Deseja mesmo apagar essa tarefa?')) {
      return
    }

    const filteredTasks = tasks.filter((task) => task.id !== id)
    setTasks(filteredTasks)
  }

  function handleToggleTask({ id, value }: { id: string; value: boolean }) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isCompleted: value } // Corrigido de 'iscompleted' para 'isCompleted'
      }
      return task // Simplificado, não precisa do spread
    })

    setTasks(updatedTasks)
  }

  return (
    <main>
      <Header />

      <section className={styles.content}>
        <div className={styles.taskInfoContainer}>
          <Input
            onChange={(event: ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value)}
            value={inputValue}
          />
          <Button onClick={handleAddTask}>
            Criar
            <PlusCircle size={16} color="#f2f2f2" weight="bold" />
          </Button>
        </div>

        <div className={styles.tasksList}>
          <Head
            tasksCounter={tasks.length}
            checkedTasksCounter={checkedTasksCounter}
          />

          {tasks.length > 0 ? (
            <div>
              {tasks.map((task) => (
                <Item
                  key={task.id}
                  data={task}  // Mudado de 'data' para 'task' para manter consistência
                  removeTask={handleRemoveTask}
                  toggleTaskStatus={handleToggleTask}
                />
              ))}
            </div>
          ) : (
            <Empty />
          )}
        </div>
      </section>
    </main>
  )
}