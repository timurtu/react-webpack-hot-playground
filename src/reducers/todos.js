/**
 * Created by timur on 1/17/17.
 */

const todos = (state = [], action) => {

  if (!state) {
    return state
  }

  const todo = state.find(todo => todo.id === action.id)
  const index = state.indexOf(todo)

  switch (action.type) {

    case 'ADD_TODO':
      return [
        ...state,
        {
          text: action.text,
          id: action.id,
          completed: false
        }
      ]

    case 'MOVE_TODO_UP':

      if (index === 0) {
        return state
      }

      return [
        ...state.slice(0, index - 1),
        todo,
        state[index - 1],
        ...state.slice(index + 1, state.length)
      ]

    case 'MOVE_TODO_DOWN':

      if(index === state.length - 1) {
        return state
      }

      return [
        ...state.slice(0, index),
        state[index + 1],
        todo,
        ...state.slice(index + 2, state.length)
      ]

    case 'REMOVE_TODO':
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1, state.length)
      ]

    default:
      return state
  }
}

export default todos
