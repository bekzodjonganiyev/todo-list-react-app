import { useEffect, useState } from "react"
import TodoItem from "./Components/TodoItem"
import "./Assets/main.scss"
import Alert from "./Components/alert/Alert";

function App() {
  const [todos, setTodos] = useState(JSON.parse(window.localStorage.getItem("todos")) || [])
  const [filter, setFilter] = useState('all');
  const [isAlert, setIsAlert] = useState(false)

  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  const handleInput = evt => {
    const newTodo = {
      id: todos[todos.length - 1]?.id + 1 || 0,
      title: evt.target.value,
      isCompleted: false,
    }

    if (evt.code === "Enter") {
      setIsAlert(true)
      evt.target.value = null
      setTodos([...todos, newTodo])
    }
  }

  const handleDeleteTodo = id => {
    const filteredTodos = todos.filter(item => item.id !== id)
    setTodos(filteredTodos)
  }

  const handleComplete = id => {
    const idx = todos.findIndex(item => item.id === id)

    setTodos((todos) => ([
      ...todos.slice(0, idx),
      {
        ...todos[idx],
        isCompleted: true
      },
      ...todos.slice(idx + 1)
    ]));
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter == 'all') {
      return true;
    }

    if (filter == 'completed') {
      return todo.isCompleted
    }

    if (filter == 'active') {
      return !todo.isCompleted
    }
  });

  setTimeout(() => {
    setIsAlert(false)
  },2000)

  return (
    <>
    <Alert hidden={isAlert ? "hidden" : ""} />
      <h1 style={{color:"white"}}>Todo List with Reac Js</h1>

      <input className="input" onKeyUp={handleInput} type="text" placeholder="Todo..." />
      <div className="btns">
        <label className="btn all-btn" htmlFor="all"  >All</label>
        <input type={'radio'} className='inputRadio' name='todos' id="all" checked={filter === 'all'} onChange={() => setFilter('all')} />

        <label className="btn active-btn" htmlFor="active" >Active</label>
        <input type={'radio'} className='inputRadio' name='todos' id="active" checked={filter === 'active'} onChange={() => setFilter('active')} />

        <label className="btn complate-btn" htmlFor="completed" >Completed</label>
        <input type={'radio'} className='inputRadio' name='todos' id="completed" checked={filter === 'completed'} onChange={() => setFilter('completed')} />
      </div>
      <ul>
        {filteredTodos.map(item => (
          <TodoItem
            handleComplete={() => handleComplete(item.id)}
            handleDeleteTodo={() => handleDeleteTodo(item.id)}
            isCompleted={item.isCompleted}
            key={item.id}
            title={item.title}>
          </TodoItem>
        ))}
      </ul>
    </>
  )
}
export default App


