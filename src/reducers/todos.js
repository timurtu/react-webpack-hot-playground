/**
 * Created by timur on 1/17/17.
 */

const todos = (state = [], action) => {

  switch (action.type) {

    case 'ADD_TODO':
      return [
        ...state,
        {
          text: action.text,
          id: action.id
        }
      ]

    case 'MOVE_TODO_UP':
      return state.find(todo => todo.id === action.id)
        .reduce((x, y) => {

          return 7
        }, [])

    default:
      return state
  }
}

export default todos
