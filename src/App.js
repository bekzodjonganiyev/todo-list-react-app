import { useState } from "react"
import TodoItem from "./Components/TodoItem"
import "./Assets/main.scss"

function App() {
  const [todos, setTodos] = useState(
    JSON.parse(window.localStorage.getItem("todos")) || []
  )

  const handleInput = evt => {
    const newTodo = {
      id: todos[todos.length - 1]?.id + 1 || 0,
      title: evt.target.value,
      isCompleted: false,
    }

    if (evt.code === "Enter") {
      evt.target.value = null
      window.localStorage.setItem("todos", JSON.stringify([...todos, newTodo]))
      setTodos([...todos, newTodo])
    }
  }

  const handleDeleteTodo = evt => {
    const deletedTodoId = evt.target.dataset.todoId - 0

    const filteredTodos = todos.filter(item => item.id !== deletedTodoId)

    window.localStorage.setItem("todos", JSON.stringify(filteredTodos))

    console.log(deletedTodoId)
    setTodos(filteredTodos)
  }

  const handleComplate = evt => {
    const complatedId = evt.target.dataset.todoId - 0;

    const findedItem = todos.find(item => item.id === complatedId)

    findedItem.isCompleted = !findedItem.isCompleted

    setTodos([...todos])

    window.localStorage.setItem("todos", JSON.stringify([...todos]))
  }

  return (
    <>
      <h1>Todo List with Reac Js</h1>
      <input className="input" onKeyUp={handleInput} type="text" placeholder="Todo..." />

      <ul>
        {todos.map(item => (
          <TodoItem
            handleComplate={handleComplate}
            handleDeleteTodo={handleDeleteTodo}
            isComplated={item.isCompleted}
            key={item.id}
            id={item.id}
            title={item.title}>
            </TodoItem>
        ))}
      </ul>
    </>
  )
}

export default App
