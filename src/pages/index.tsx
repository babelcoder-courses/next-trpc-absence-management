import { type ChangeEventHandler, useState } from 'react'

const IndexPage = () => {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([
    { id: 1, content: 'Todo#1' },
    { id: 2, content: 'Todo#2' },
    { id: 3, content: 'Todo#3' },
  ])

  const handleTodoFormChanged: ChangeEventHandler<HTMLInputElement> = (event) => {
    setTodo(event.target.value)
  }

  const addTodo = () => {
    setTodos([{ id: todos.length + 1, content: todo}, ...todos])
    setTodo('')
  }

  return (
    <>
      <input type="text" onChange={handleTodoFormChanged} value={todo} />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {
          todos.map(todo => <li key={todo.id}>{todo.content}</li>)
        }
      </ul>
    </>
  )
}

export default IndexPage
