import { useRef, useState } from "react"
import TodoItem from "./Components/TodoItem"
import "./Assets/main.scss"

function App() {
  const [allTodos, setAllTodos] = useState(
    JSON.parse(window.localStorage.getItem("todos")) || []
  )
    const [todos , setTodos] = useState(allTodos)
    const [defCheck , setDefCheck] = useState(true)

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

  const handleRadio = (evt) =>{

    if(evt.target.id === 'complated'){
      const  searchTodo  = allTodos.filter((item)=>item.isCompleted === true)
      setTodos(searchTodo)
      console.log(todos);
      setDefCheck(false)
    }else if(evt.target.id === 'all'){
      setTodos(allTodos)
      setDefCheck((prev)=>!prev)
    }else if(evt.target.id === 'active'){
      const  searchTodo  = allTodos.filter((item)=>item.isCompleted === false)
      console.log(searchTodo);
      setTodos(searchTodo)
      setDefCheck(false)

    }
  }

  return (
    <>
      <h1>Todo List with Reac Js</h1>
      <input className="input" onKeyUp={handleInput} type="text" placeholder="Todo..." />
      <div>
        <label className="radioLabel" htmlFor="all"  >All</label>
        <input type={'radio'} className='inputRadio' name = 'todos'  id="all" checked = {defCheck} onClick={handleRadio} />
        <label className="radioLabel" htmlFor="active" >active</label>
        <input type={'radio'} className='inputRadio' name = 'todos' id="active"  onClick={handleRadio}/>
        <label className="radioLabel" htmlFor="complated" >complated</label>
        <input type={'radio'} className='inputRadio' name = 'todos' id="complated" onClick={handleRadio}/>
      </div>
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
