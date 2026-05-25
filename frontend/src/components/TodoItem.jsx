import { useState } from 'react';

function TodoItem({
  todo,
  index,
  deleteTask,
  toggleComplete,
  editTask
}) {

  const [isEditing, setIsEditing] =
    useState(false);

  const [editedText, setEditedText] =
    useState(todo.text);

  return (

    <div className="todo-item">

      {
        isEditing ? (

          <input
            type="text"
            value={editedText}

            onChange={(event) =>
              setEditedText(event.target.value)
            }
          />

        ) : (

          <h3
            style={{
              textDecoration:
                todo.completed
                  ? 'line-through'
                  : 'none'
            }}
          >
            {todo.text}
          </h3>

        )
      }

      <div className="button-group">

        <button
          onClick={() => {

            if(isEditing){

              editTask(index, editedText);

            }

            setIsEditing(!isEditing);

          }}
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>

        <button
          onClick={() => toggleComplete(index)}
        >
         {
           todo.completed
           ? 'Not Completed'
          : 'Complete'
         }
        </button>

        <button
          onClick={() => deleteTask(index)}
        >
          Delete
        </button>

      </div>

    </div>

  );
}

export default TodoItem;