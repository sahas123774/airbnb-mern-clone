function TodoForm({
  task,
  setTask,
  addTask
}) {

  return (

    <div className="input-container">

      <input
        type="text"
        placeholder="Enter task"
        value={task}

        onChange={(event) =>
          setTask(event.target.value)
        }

        onKeyDown={(event) => {

          if(event.key === 'Enter'){
            addTask();
          }

        }}
      />

      <button onClick={addTask}>
        Add
      </button>

    </div>
  );
}

export default TodoForm;