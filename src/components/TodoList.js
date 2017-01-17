/**
 * Created by timur on 1/17/17.
 */

import React from 'react'
import cuid from 'cuid'

const AddTodo = ({
  onAddTodo
}) => {

  let input

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        onAddTodo(input.value)
        input.value = ''
      }}
    >
      <input
        ref={node => {
          input = node
        }}
        type="text"
      />
      <button>
        Add todo
      </button>
    </form>
  )
}

const Todos = ({
  todos
}) => {
  console.log(todos)
  return (
    <div>
      {todos.map(todo =>
        <div key={todo.id}>
          <button>^</button>
          <button>v</button>
          {todo.text}
          {' '}
          <button>Completed</button>
          <button>Delete</button>
        </div>
      )}
    </div>
  )
}

class TodoList extends React.Component {

  componentWillMount() {
    const { store } = this.context

    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate()
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const { store } = this.context
    const state = store.getState()

    return (
      <div>
        <AddTodo
          onAddTodo={text => {

            store.dispatch({
              type: 'ADD_TODO',
              id: cuid(),
              text
            })
          }}
        />

        <Todos todos={state}/>
      </div>
    )
  }
}
TodoList.contextTypes = {
  store: React.PropTypes.object
}

export default TodoList
