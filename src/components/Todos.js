import React from 'react';
import Todo from './Todo';

function Todos({ todos, deleteTodo, toggleComplete, addTodo, quitEditing, startEditing, handleChange, editTodo, filter }) {
    var filterTodos = [];
    if (filter === "Completed") {
        filterTodos = todos.filter(item => item.completed === true);
    } else if (filter === "Active") {
        filterTodos = todos.filter(item => item.completed === false);
    } else {
        filterTodos = todos;
    }
    return (
        <ul className="todo-list">
            {
                filterTodos.map((todo) =>
                (<Todo
                    key={todo.id}
                    todo={todo}
                    deleteTodo={deleteTodo}
                    toggleComplete={toggleComplete}
                    addTodo={addTodo}
                    quitEditing={quitEditing}
                    handleChange={handleChange}
                    editTodo={editTodo}
                    startEditing={startEditing}
                    filter={filter}
                />))
            }
        </ul>
    );

}

export default Todos;