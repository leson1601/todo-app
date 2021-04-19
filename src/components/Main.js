import React from 'react';
import Todos from './Todos';


function Main({ todos, deleteTodo, toggleComplete, addTodo, quitEditing, startEditing, handleChange, editTodo, filter }) {
    return (

        <div className="main">
            <input id="toggle-all" className="toggle-all" type="checkbox" />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <Todos
                todos={todos}
                deleteTodo={deleteTodo}
                toggleComplete={toggleComplete}
                addTodo={addTodo}
                quitEditing={quitEditing}
                handleChange={handleChange}
                editTodo={editTodo}
                startEditing={startEditing}
                filter={filter}
            />
        </div>
    );

}

export default Main;