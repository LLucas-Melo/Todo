import { Trash, Check } from 'phosphor-react'

import { Task } from '../../utils/util'

import styles from './Item.module.css'

interface Props {
  data: Task
  removeTask: (id: string) => void
  toggleTaskStatus: ({ id, value }: { id: string; value: boolean }) => void
}

export function Item({ data, removeTask, toggleTaskStatus }: Props) {
  function handleTaskToggle() {
    toggleTaskStatus({ id: data.id, value: !data.isCompleted })
  }

  function handleRemove() {
    removeTask(data.id)
  }

  const checkboxCheckedClassname = data.isCompleted
    ? styles['checkbox-checked']
    : styles['checkbox-unchecked']
  const paragraphCheckedClassname = data.isCompleted
    ? styles['paragraph-checked']
    : ''

  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="checkbox" onClick={handleTaskToggle}>
          <input readOnly type="checkbox" checked={data.isCompleted} />
          <span className={`${styles.checkbox} ${checkboxCheckedClassname}`}>
            {data.isCompleted && <Check size={12} />}
          </span>

          <p className={`${styles.paragraph} ${paragraphCheckedClassname}`}>
            {data.text}
          </p>
        </label>
      </div>

      <button onClick={handleRemove}>
        <Trash size={16} color="#808080" />
      </button>
    </div>
  )
}