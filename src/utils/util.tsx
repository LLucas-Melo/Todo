import { v4 as uuidv4 } from 'uuid';


export interface Task {
  id: string;
  text: string;
  isCompleted: boolean;
};

export const creatTask = (text: string): Task => ({
  id: uuidv4(),
  text,
  isCompleted: false
});

export const editTask = (task: Task, newText: string): Task => ({
  ...task,
  text: newText
})


export const deleteTask = (tasks: Task[], id: string): Task[] => {
  return tasks.filter(task => task.id !== id);
}
