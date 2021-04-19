import { Component } from 'react'
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
const todosAPI = "http://localhost:3000/todos";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: 'All',
      loading: true,
      todos: [],

    };
    this.getTodos = this.getTodos.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.quitEditing = this.quitEditing.bind(this);
    this.startEditing = this.startEditing.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
  }
  async componentDidMount() {
    await this.getTodos();
  }

  //get Todos from Database and setState
  async getTodos() {
    const response = await fetch(todosAPI);
    const data = await response.json();
    this.setState({ todos: data, loading: false });
  }

  // add todo
  async addTodo(event) {
    // Create new todo
    const toAddTodo = {
      content: event.target.value,
      completed: false,
      editing: false
    }
    event.target.value = "";

    await fetch(todosAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toAddTodo),
    })
    this.getTodos();
  }

  // delete todo
  async deleteTodo(id) {
    await fetch(`${todosAPI}/${id}`, {
      method: 'DELETE'
    })
    this.getTodos();
  }

  // toggle complete
  async toggleComplete(id) {
    //get todo
    const response = await fetch(`${todosAPI}/${id}`);
    const todo = await response.json();
    //change completed
    todo.completed = !todo.completed;

    await fetch(`${todosAPI}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(todo)
    })

    this.getTodos();
  }
  //turn off editing mode
  async quitEditing(id) {
    //get todo
    const response = await fetch(`${todosAPI}/${id}`);
    const todo = await response.json();
    //change completed
    if (todo.editing === true) {
      todo.editing = false;
      await fetch(`${todosAPI}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(todo)
      });
      this.getTodos();
    }
  }


  //turn off editing mode
  async startEditing(id) {
    //get todo
    const response = await fetch(`${todosAPI}/${id}`);
    const todo = await response.json();
    //change completed
    if (todo.editing === false) {
      todo.editing = true;
      await fetch(`${todosAPI}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(todo)
      });

      this.getTodos();
    }
  }
  //handle Change
  handleChange(event, id) {
    this.setState(prevState => ({
      ...prevState,
      todos: prevState.todos.map(item => {
        if (item.id === id) {
          item.content = event.target.value;
        }
        return item;
      })
    }))
    this.render();
  }

  //Edit todo
  async editTodo(id, content) {
    //get todo
    const response = await fetch(`${todosAPI}/${id}`);
    const todo = await response.json();
    //change content
    todo.content = content;

    await fetch(`${todosAPI}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(todo)
    })

    this.quitEditing(id);

    this.getTodos();
  }

  //Set Filter
  setFilter(event) {
    this.setState(prevState => ({ ...prevState, filter: event.target.innerHTML }))
  }
  // Clear completed
  async clearCompleted() {
    for (const todo of this.state.todos) {
      if (todo.completed === true) {
        await fetch(`${todosAPI}/${todo.id}`, { method: 'DELETE' })
      }
    }

    const activeTodos = this.state.todos.filter(todo => todo.completed === false);
    this.setState({ ...this.state, todos: activeTodos })
  }

  render() {
    if (this.state.loading) {
      return <h1>...Loading</h1>
    }
    return (
      <div className="todoapp">
        <Header
          addTodo={this.addTodo}
        />
        <Main
          todos={this.state.todos}
          deleteTodo={this.deleteTodo}
          toggleComplete={this.toggleComplete}
          addTodo={this.addTodo}
          quitEditing={this.quitEditing}
          handleChange={this.handleChange}
          editTodo={this.editTodo}
          startEditing={this.startEditing}
          filter={this.state.filter}
        />
        {this.state.todos.length > 0 &&
          <Footer
            count={this.state.todos.filter(item => item.completed === false).length}
            filter={this.state.filter}
            setFilter={this.setFilter}
            clearCompleted={this.clearCompleted}
          />
        }
      </div>
    );

  }
}

export default App;
