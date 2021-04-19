import React from 'react';

function Header({ addTodo }) {
    return (
        <header className="header">
            <h1>todos</h1>
            <input
                className="new-todo"
                placeholder="What needs to be done?"
                autoFocus
                onKeyUp={(event) => event.keyCode === 13 && addTodo(event)}
                onBlur={event => event.target.value = ""} />
        </header>
    );

}

export default Header;