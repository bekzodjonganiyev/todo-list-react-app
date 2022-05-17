import "./todo-item.scss"

const TodoItem = ({ handleComplete, handleDeleteTodo, isCompleted, title }) => {
  return (
    <li>
      <input type="checkbox" onChange={handleComplete} checked={isCompleted}/>
      <strong className={isCompleted ? "completed" : ''}>{title}</strong>
      <button onClick={handleDeleteTodo}>
        Delete
      </button>
    </li>
  )
}

export default TodoItem
