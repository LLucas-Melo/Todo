
import Clipboard from '../../assets/Clipboard.svg'
import style from './Empty.module.css'


export default function Empty() {
  return (
    <div className={style.container}>
      <img src={Clipboard} alt='Clipboard' />
      <strong>Você ainda não tem tarefas cadastradas</strong>
      <p>Crie tarefas e organize seus itens a fazer</p>
    </div>
  )
}