/**
 * Created by timur on 1/17/17.
 */

import React from 'react'
import cuid from 'cuid'

const AddTodo = ({
  onAddTodo,
  type
}) => {

  let input

  return (
    <form
      onSubmit={e => {
        e.preventDefault()

        if (input.value === '') {
          return
        }

        onAddTodo(input.value)

        input.value = ''
      }}
    >
      <input
        ref={node => {
          input = node
        }}

        type="text"

        className="form-control"

        placeholder="Add a new todo"
      />

      <button
        className={`btn btn-block btn-${type}`}
        style={{
          marginTop: '.5em'
        }}
      >
        <span className="glyphicon glyphicon-plus"/>
      </button>
    </form>
  )
}

const Icon = ({
  children,
  onClick,
  color,
  type
}) => (
  <span
    onClick={onClick}
    className={`glyphicon glyphicon-${children} text-${type}`}
    style={{
      color
    }}
  />
)

const Btn = ({
  type,
  children,
  onClick
}) => (
  <button
    onClick={onClick}
    className={`btn btn-${type}`}
  >
    {children}
  </button>
)
Btn.propTypes = {
  type: React.PropTypes.string.isRequired
}

const Todos = ({
  todos,
  onMoveUp,
  onMoveDown,
  onDelete
}) => (
  <ul className="list-group">
    {todos.map(todo =>
      <li
        key={todo.id}
        className="list-group-item"
      >
        <div className="btn-group" role="group">
          <Btn
            type="default"
            onClick={() => {
              onMoveUp(todo.id)
            }}
          >
            <Icon>chevron-up</Icon>
          </Btn>

          <Btn
            type="default"
            onClick={() => {
              onMoveDown(todo.id)
            }}
          >
            <Icon>chevron-down</Icon>
          </Btn>
        </div>

        <div className="pull-right">
          <Btn
            onClick={e => {

              e.preventDefault()

              if (confirm(`Are you sure you want to delete ${todo.text}?`)) {
                onDelete(todo.id)
              }
            }}
            type="default"
          >
            <Icon type="danger">
              remove-circle
            </Icon>
          </Btn>
        </div>

        <span
          style={{
            marginLeft: '1em'
          }}
        >
          {todo.text}
        </span>
      </li>
    )}
  </ul>

)

const ColorLink = ({
  type,
  children,
  onClick
}) => (
  <a
    href="#"
    onClick={e => {
      e.preventDefault()

      onClick(type)
    }}
  >
    <span
      className={`text-${type}`}
      style={{
        textTransform: 'capitalize'
      }}
    >
      {children}
    </span>
  </a>
)

class TodoList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      type: 'primary'
    }
  }

  componentDidMount() {
    const { store } = this.context
    store.subscribe(() => {
      this.forceUpdate()
    })
  }

  render() {
    const { store } = this.context
    const state = store.getState()

    return (
      <div className={`panel panel-${this.state.type}`}>

        <div className="panel-heading">

          <div className="dropdown pull-right">
            <button
              className={`btn btn-${this.state.type} dropdown-toggle`}
              style={{
                color: this.state.type === 'default' ?
                  '#000' :
                  '#fff'
              }}
              type="button"
              id="dropdownMenu1"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="true"
            >
              Colors
              {' '}
              <span className="caret"/>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
              <li>
                <ColorLink
                  type="primary"
                  onClick={type => {
                    this.setState({
                      type
                    })
                  }}
                >
                  blue
                </ColorLink>
              </li>
              <li>
                <ColorLink
                  type="danger"
                  onClick={type => {
                    this.setState({
                      type
                    })
                  }}
                >
                  red
                </ColorLink>
              </li>
              <li>
                <ColorLink
                  type="warning"
                  onClick={type => {
                    this.setState({
                      type
                    })
                  }}
                >
                  yellow
                </ColorLink>
              </li>
              <li>
                <ColorLink
                  type="success"
                  onClick={type => {
                    this.setState({
                      type
                    })
                  }}
                >green</ColorLink>
              </li>
              <li>
                <ColorLink
                  type="info"
                  onClick={type => {
                    this.setState({
                      type
                    })
                  }}
                >light blue</ColorLink>
              </li>
              <li>
                <ColorLink
                  type="default"
                  onClick={type => {
                    this.setState({
                      type
                    })
                  }}
                >white</ColorLink>
              </li>
            </ul>
          </div>

          <div className="panel-title">
            Todo List
          </div>
        </div>

        <div className="panel-body">
          <AddTodo

            onAddTodo={text => {

              store.dispatch({
                type: 'ADD_TODO',
                id: cuid(),
                text
              })
            }}

            type={this.state.type}
          />
        </div>

        <Todos
          todos={state}

          onMoveUp={id => {
            store.dispatch({
              type: 'MOVE_TODO_UP',
              id
            })
          }}

          onMoveDown={id => {
            store.dispatch({
              type: 'MOVE_TODO_DOWN',
              id
            })
          }}

          onDelete={id => {
            store.dispatch({
              type: 'REMOVE_TODO',
              id
            })
          }}

        />
      </div>
    )
  }
}
TodoList.contextTypes = {
  store: React.PropTypes.object
}

export default TodoList
