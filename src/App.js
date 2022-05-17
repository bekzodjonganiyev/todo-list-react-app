import { useState } from "react"
import TodoItem from "./Components/TodoItem"
import "./Assets/main.scss"

function App() {
  const [allTodos] = useState(
    JSON.parse(window.localStorage.getItem("todos")) || []
  )
  const [todos, setTodos] = useState(allTodos)
  const [defCheck, setDefCheck] = useState(true)

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

  const handleRadio = (evt) => {

    if (evt.target.id === 'complated') {
      const searchTodo = allTodos.filter((item) => item.isCompleted === true)
      setTodos(searchTodo)
      console.log(todos);
      setDefCheck(false)
      window.localStorage.setItem("todos", JSON.stringify(searchTodo))


    } else if (evt.target.id === 'all') {
      setTodos(allTodos)
      setDefCheck((prev) => !prev)
    } else if (evt.target.id === 'active') {
      const searchTodo = allTodos.filter((item) => item.isCompleted === false)
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
        <input type={'radio'} className='inputRadio' name='todos' id="all" checked={defCheck} onClick={handleRadio} />

        <label className="radioLabel" htmlFor="active" >active</label>
        <input type={'radio'} className='inputRadio' name='todos' id="active" onClick={handleRadio} />

        <label className="radioLabel" htmlFor="complated" >Complated</label>
        <input type={'radio'} className='inputRadio' name='todos' id="complated" onClick={handleRadio} />

      </div>
      <ul>
        {todos.map(item => (
          <TodoItem
            handleComplate={handleComplate}
            handleDeleteTodo={handleDeleteTodo}
            isCompleted={item.isCompleted}
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



// import { useState, useRef } from "react";

// import "./Assets/main.scss"

// function App() {

//   const [state, setState] = useState(JSON.parse(window.localStorage.getItem("todos")) || [])
//   const elInput = useRef()

//   const formSubmit = (e) => {
//     e.preventDefault()

//     const newItem = {
//       id: new Date().getTime(),
//       title: elInput.current.value,
//       isCompleted: false
//     }

//     window.localStorage.setItem("todos", JSON.stringify([...state, newItem]))
//     setState([...state, newItem])

//   }

//   const deleteItem = (e) => {
//     const deletedItemId = e.target.dataset.todoId - 0

//     const filteredItems = state.filter(item => item.id !== deletedItemId)

//     window.localStorage.removeItem("todos")
//     setState(filteredItems)
//   }

//   const handleIsCheck = (e) => {
//     const isCheckedId = e.target.dataset.todoId - 0;

//     const findedItem = state.find(item => item.id === isCheckedId)
// //     console.log(findedItem);
// //     const data = new Date(1652769393373)

// // console.log(data.getHours());
// //     console.log(findedItem.isCompleted );

//     findedItem.isCompleted = !findedItem.isCompleted
//     // console.log(findedItem.isCompleted );

//     setState([...state])
//     window.localStorage.setItem("todos", JSON.stringify([...state]))

//   }

//   return (
//     <>
//       <h1 className="todo-title">Todo List</h1>

//       <div className="btns">
//         <button className="btn all-btn">All</button>
//         <button className="btn active-btn">Active</button>
//         <button className="btn complate-btn">Complate</button>
//       </div>

//       <form className="form" onSubmit={formSubmit}>

//         <input ref={elInput} type="text" className="input" required />
//         <button type="submit" className="btn submit-btn">Add</button>

//         <ul style={{ padding: "0 10px" }}>
//           {
//             state.map(item => (
//               <li
//                 key={item.id}
//                 data-todo-id={item.id}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   margin: "30px auto",
//                   backgroundColor: "hsl(206, 33%, 96%)",
//                   boxSizing: "border-box",
//                   padding: "5px 10px",
//                   borderRadius: "10px"
//                 }}>
//                 <input
//                   type="checkbox"
//                   onChange={handleIsCheck}
//                   data-todo-id={item.id}
//                   style={{

//                   }}
//                 />
//                 <p
//                   className={item.isCompleted === true ? "complated" : "uncomplated"}
//                   style={{
//                     color: "hsl(209, 61%, 16%)",
//                     fontSize: "30px",
//                     fontWeight: "800",
//                     margin: "5px 0px",
//                   }}>{item.title}</p>
//                 <button type="button" className="btn delete-btn" onClick={deleteItem} data-todo-id={item.id}>Delete</button>
//               </li>
//             ))
//           }
//         </ul>

//       </form>
//     </>
//   )
// }

// export default App