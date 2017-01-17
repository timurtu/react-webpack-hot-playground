/**
 * Created by timur on 1/17/17.
 */

import { expect } from 'chai'

describe('todos reducer', function () {

  let todos

  beforeEach(function() {
    todos = require('../dist/reducers/todos')
  })

  describe('add new todo', function() {

    it('should add a todo to an empty list', () => {
      expect(
        todos(
          [],
          {
            type: 'ADD_TODO',
            text: 'fooby',
            id: 0
          }
        )
      ).to.equal([
        {
          text: 'fooby',
          id: 0
        }
      ])
    })
  })

})
