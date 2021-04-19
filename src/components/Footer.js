import React from 'react';

function Footer({ count, filter, setFilter, clearCompleted }) {

    return (
        <footer className="footer">
            <span className="todo-count"><strong>{count}</strong> item left</span>
            <ul className="filters">
                <li>
                    <a
                        className={filter === 'All' ? 'selected' : ''}
                        href="#/"
                        onClick={(event) => setFilter(event)}
                    >All</a>
                </li>
                <li>
                    <a
                        className={filter === 'Active' ? 'selected' : ''}
                        href="#/"
                        onClick={(event) => setFilter(event)}
                    >Active</a>
                </li>
                <li>
                    <a
                        className={filter === 'Completed' ? 'selected' : ''}
                        href="#/"
                        onClick={(event) => setFilter(event)}
                    >Completed</a>
                </li>
            </ul>
            <button className="clear-completed" onClick={() => clearCompleted()}>Clear completed</button>
        </footer>
    );

}

export default Footer;