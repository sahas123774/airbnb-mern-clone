import { useState, useEffect } from 'react';
import './App.css';

import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {

  // INPUT STATE
  const [task, setTask] = useState('');

  // FILTER STATE
  const [filter, setFilter] =
    useState('all');

  // TODOS STATE
  const [todos, setTodos] = useState(() => {

    const savedTodos =
      localStorage.getItem('todos');

    return savedTodos
      ? JSON.parse(savedTodos)
      : [];

  });

  // SAVE TODOS
  useEffect(() => {

    localStorage.setItem(
      'todos',
      JSON.stringify(todos)
    );

  }, [todos]);

  // ADD TASK
  function addTask() {

    if(task.trim() === ''){
      return;
    }

    setTodos([
      ...todos,
      {
        text: task,
        completed: false
      }
    ]);

    setTask('');
  }

  // DELETE TASK
  function deleteTask(indexToDelete){

    const updatedTodos = todos.filter(
      (todo, index) =>
        index !== indexToDelete
    );

    setTodos(updatedTodos);
  }

  // TOGGLE COMPLETE
  function toggleComplete(indexToToggle){

    const updatedTodos = todos.map(
      (todo, index) => {

        if(index === indexToToggle){

          return {
            ...todo,
            completed: !todo.completed
          };

        }

        return todo;

      }
    );

    setTodos(updatedTodos);
  }

  // EDIT TASK
  function editTask(indexToEdit, newText){

    const updatedTodos = todos.map(
      (todo, index) => {

        if(index === indexToEdit){

          return {
            ...todo,
            text: newText
          };

        }

        return todo;

      }
    );

    setTodos(updatedTodos);
  }

  // FILTER TODOS
  const filteredTodos = todos.filter(
    (todo) => {

      if(filter === 'completed'){
        return todo.completed;
      }

      if(filter === 'pending'){
        return !todo.completed;
      }

      return true;

    }
  );

  return (

    <div className="container">

      <h1>Todo App</h1>

      <TodoForm
        task={task}
        setTask={setTask}
        addTask={addTask}
      />

      {/* FILTER BUTTONS */}
      <div className="filter-buttons">

        <button
          onClick={() => setFilter('all')}
        >
          All
        </button>

        <button
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>

        <button
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>

      </div>

      <TodoList
        todos={filteredTodos}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
        editTask={editTask}
      />

    </div>

  );
}

export default App;