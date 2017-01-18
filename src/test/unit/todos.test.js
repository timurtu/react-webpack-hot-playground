/**
 * Created by timur on 1/17/17.
 */

import { expect } from 'chai'
import deepFreeze from 'deep-freeze'
import todos from '../../../dist/reducers/todos'

describe('todos reducer', () => {

  it('should return the state passed in by default', () => {
    expect(todos(null, { type: 'other' })).to.equal(null)
  })

  describe('add new todo', () => {

    it('to an empty list', () => {
      const stateBefore = []
      const action = {
        type: 'ADD_TODO',
        text: 'laundry',
        id: 0
      }
      const stateAfter = [
        {
          text: 'laundry',
          id: 0,
          completed: false
        }
      ]

      deepFreeze(stateBefore)
      deepFreeze(action)

      expect(todos(stateBefore, action)).to.deep.equal(stateAfter)
    })

    it('to a list with an item', () => {
      const stateBefore = [
        {
          text: 'laundry',
          id: 0,
          completed: false
        }
      ]
      const action = {
        type: 'ADD_TODO',
        text: 'dishes',
        id: 1
      }
      const stateAfter = [
        {
          text: 'laundry',
          id: 0,
          completed: false
        },
        {
          text: 'dishes',
          id: 1,
          completed: false
        }
      ]

      deepFreeze(stateBefore)
      deepFreeze(action)

      expect(todos(stateBefore, action)).to.deep.equal(stateAfter)
    })
  })

  describe('move a todo up', () => {

    it('should move the bottom todo up with 2 todos', () => {

      const stateBefore = [
        {
          text: 'laundry',
          id: 0
        },
        {
          text: 'dishes',
          id: 1
        }
      ]
      const action = {
        type: 'MOVE_TODO_UP',
        id: 1
      }
      const stateAfter = [
        {
          text: 'dishes',
          id: 1
        },
        {
          text: 'laundry',
          id: 0
        }
      ]

      deepFreeze(stateBefore)
      deepFreeze(action)

      expect(todos(stateBefore, action)).to.deep.equal(stateAfter)
    })

    it('should move the bottom todo up with 3 todos', () => {
      const stateBefore = [
        {
          text: 'dishes',
          id: 0
        },
        {
          text: 'laundry',
          id: 1
        },
        {
          text: 'shrimp',
          id: 2
        }
      ]

      const action = {
        type: 'MOVE_TODO_UP',
        id: 2
      }

      const stateAfter = [
        {
          text: 'dishes',
          id: 0
        },
        {
          text: 'shrimp',
          id: 2
        },
        {
          text: 'laundry',
          id: 1
        }
      ]

      deepFreeze(stateBefore)
      deepFreeze(action)

      expect(todos(stateBefore, action)).to.deep.equal(stateAfter)
    })

    it('should move a middle todo up with 4 todos', () => {
      const stateBefore = [
        {
          text: 'dishes',
          id: 0
        },
        {
          text: 'laundry',
          id: 1
        },
        {
          text: 'shrimp',
          id: 2
        },
        {
          text: 'caviar',
          id: 3
        }
      ]

      const action = {
        type: 'MOVE_TODO_UP',
        id: 2
      }

      const stateAfter = [
        {
          text: 'dishes',
          id: 0
        },
        {
          text: 'shrimp',
          id: 2
        },
        {
          text: 'laundry',
          id: 1
        },
        {
          text: 'caviar',
          id: 3
        }
      ]

      deepFreeze(stateBefore)
      deepFreeze(action)

      expect(todos(stateBefore, action)).to.deep.equal(stateAfter)
    })

    it('should do nothing when trying to move the top todo up', () => {

      const stateBefore = [
        {
          text: 'laundry',
          id: 0
        },
        {
          text: 'dishes',
          id: 1
        }
      ]
      const action = {
        type: 'MOVE_TODO_UP',
        id: 0
      }
      const stateAfter = [
        {
          text: 'laundry',
          id: 0
        },
        {
          text: 'dishes',
          id: 1
        }
      ]

      deepFreeze(stateBefore)
      deepFreeze(action)

      expect(todos(stateBefore, action)).to.deep.equal(stateAfter)
    })
  })

  describe('move a todo down', () => {

    it('should move the top todo down with 2 todos', () => {

      const stateBefore = [
        {
          text: 'laundry',
          id: 0
        },
        {
          text: 'dishes',
          id: 1
        }
      ]
      const action = {
        type: 'MOVE_TODO_DOWN',
        id: 0
      }
      const stateAfter = [
        {
          text: 'dishes',
          id: 1
        },
        {
          text: 'laundry',
          id: 0
        }
      ]

      deepFreeze(stateBefore)
      deepFreeze(action)

      expect(todos(stateBefore, action)).to.deep.equal(stateAfter)
    })

    it('should move the top todo down with 3 todos', () => {
      const stateBefore = [
        {
          text: 'dishes',
          id: 0
        },
        {
          text: 'laundry',
          id: 1
        },
        {
          text: 'shrimp',
          id: 2
        }
      ]

      const action = {
        type: 'MOVE_TODO_DOWN',
        id: 0
      }

      const stateAfter = [
        {
          text: 'laundry',
          id: 1
        },
        {
          text: 'dishes',
          id: 0
        },
        {
          text: 'shrimp',
          id: 2
        }
      ]

      deepFreeze(stateBefore)
      deepFreeze(action)

      expect(todos(stateBefore, action)).to.deep.equal(stateAfter)
    })

    it('should move a middle todo up with 4 todos', () => {
      const stateBefore = [
        {
          text: 'dishes',
          id: 0
        },
        {
          text: 'laundry',
          id: 1
        },
        {
          text: 'shrimp',
          id: 2
        },
        {
          text: 'caviar',
          id: 3
        }
      ]

      const action = {
        type: 'MOVE_TODO_DOWN',
        id: 1
      }

      const stateAfter = [
        {
          text: 'dishes',
          id: 0
        },
        {
          text: 'shrimp',
          id: 2
        },
        {
          text: 'laundry',
          id: 1
        },
        {
          text: 'caviar',
          id: 3
        }
      ]

      deepFreeze(stateBefore)
      deepFreeze(action)

      expect(todos(stateBefore, action)).to.deep.equal(stateAfter)
    })

    it('should do nothing when trying to move the bottom todo down', () => {

      const stateBefore = [
        {
          text: 'laundry',
          id: 0
        },
        {
          text: 'dishes',
          id: 1
        }
      ]
      const action = {
        type: 'MOVE_TODO_DOWN',
        id: 1
      }
      const stateAfter = [
        {
          text: 'laundry',
          id: 0
        },
        {
          text: 'dishes',
          id: 1
        }
      ]

      deepFreeze(stateBefore)
      deepFreeze(action)

      expect(todos(stateBefore, action)).to.deep.equal(stateAfter)
    })
  })

  describe('delete a todo', () => {
    it('should remove a single todo', () => {

      const stateBefore = [
        {
          text: 'laundry',
          id: 0
        }
      ]
      const action = {
        type: 'REMOVE_TODO',
        id: 0
      }
      const stateAfter = []

      deepFreeze(stateBefore)
      deepFreeze(action)

      expect(todos(stateBefore, action)).to.deep.equal(stateAfter)
    })

    it('should remove a middle todo', () => {
      const stateBefore = [
        {
          text: 'dishes',
          id: 0
        },
        {
          text: 'laundry',
          id: 1
        },
        {
          text: 'shrimp',
          id: 2
        }
      ]

      const action = {
        type: 'REMOVE_TODO',
        id: 1
      }

      const stateAfter = [
        {
          text: 'dishes',
          id: 0
        },
        {
          text: 'shrimp',
          id: 2
        }
      ]

      deepFreeze(stateBefore)
      deepFreeze(action)

      expect(todos(stateBefore, action)).to.deep.equal(stateAfter)
    })
  })
})
