import './App.css';
import { useState, useEffect } from 'react'
import Form from './components/Form'
import Todolist from './components/Todolist'

function App() {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);


  const filterHandler = () => {
      switch (status) {
        case "completed":
          setFilteredTodos(todos.filter((todo) => todo.completed === true));
          break;
        case "uncompleted":
          setFilteredTodos(todos.filter((todo) => todo.completed === false));
          break;
        default:
          setFilteredTodos(todos)
          break;
      }
  }

  useEffect(()=> {
    getLocalTodos();
  },[]);

  useEffect(()=> {
    filterHandler();
    saveLocalTodos();
  },[todos, status])


  // save to local storage

  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if(localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  }


  return (
    <div className="App">
      <header>
        <h1>Simple to do list</h1>
      </header>
      <Form
      inputText={inputText}
      todos={todos}
      setTodos={setTodos}
      setInputText={setInputText}
      setStatus={setStatus}
      />
      <Todolist
      setTodos={setTodos}
      todos={todos}
      filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;
