import React from 'react';

function Todo({ todo, deleteTodo, toggleComplete, addTodo, startEditing, quitEditing, handleChange, editTodo, filter }) {
    const completed = todo.completed ? 'completed' : '';
    const editing = todo.editing ? 'editing' : '';
    const classes = `${editing} ${completed}`
    return (

        <li className={classes} id={todo.id}    >
            <div className="view">
                <input
                    className="toggle"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                />

                <label onDoubleClick={() => startEditing(todo.id)}>{todo.content}</label>
                <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
            </div>
            <input
                className="edit"
                value={todo.content}
                onKeyUp={(event) => {
                    event.code === 'Enter' && editTodo(todo.id, event.target.value);
                    event.code === 'Escape' && quitEditing(todo.id);
                }}
                onChange={(event) => handleChange(event, todo.id)}
                onBlur={() => quitEditing(todo.id)}
                ref={input => input && input.focus()}
            />
        </li >
    );

}

export default Todo;