import TodoItem from './TodoItem';

function TodoList({
  todos,
  deleteTask,
  toggleComplete,
  editTask
}) {

  return (

    <div className="todo-list">

      {
        todos.length === 0 ? (

          <h2>No Todos Yet</h2>

        ) : (

          todos.map((todo, index) => (

            <TodoItem
              key={index}
              todo={todo}
              index={index}
              deleteTask={deleteTask}
              toggleComplete={toggleComplete}
              editTask={editTask}
            />

          ))

        )
      }

    </div>

  );
}

export default TodoList;