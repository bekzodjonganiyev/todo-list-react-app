import "./todo-item.scss"

const TodoItem = ({ handleComplate, handleDeleteTodo, isComplated, title, id }) => {
  return (
    <li id={id}>
      <input type="checkbox" onChange={handleComplate} data-todo-id={id} checked={isComplated}/>
      <strong className={isComplated && "complated"}>{title}</strong>
      <button onClick={handleDeleteTodo} data-todo-id={id}>
        Delete
      </button>
    </li>
  )
}

export default TodoItem
