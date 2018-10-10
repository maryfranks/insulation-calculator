const index = require('../index.js')

var assert = require("assert");

describe('index.js', () => {

  it('should populate people', () => {
    assert.deepEqual(index.people, {
      'John Doe': [ 'Canada/Ontario/Toronto', 1.5 ],
      'Samanta Smith': [ 'Canada/Ontario/London', 3.7 ],
      'Adam Xin': [ 'Canada/British Columbia/Vancouver', 2.11 ],
      'Monica Taylor': [ 'Canada/Ontario/Toronto', 2.11 ],
      'Alicia Yazzie': [ 'US/Arizona/Phoenix', 5.532 ],
      'Mohammed Zadeh': [ 'Canada/Ontario/Toronto', 1.43 ]
    })
  });

  it('should make properly formatted places', () => {
    assert.deepEqual(index.places, {
      'Canada/Ontario/Toronto': [ 1.5, 2.11, 1.43 ],
      'Canada/Ontario': [ 1.5, 3.7, 2.11, 1.43 ],
      'Canada': [ 1.5, 3.7, 2.11, 2.11, 1.43 ],
      'Canada/Ontario/London': [ 3.7 ],
      'Canada/British Columbia/Vancouver': [ 2.11 ],
      'Canada/British Columbia': [ 2.11 ],
      'US/Arizona/Phoenix': [ 5.532 ],
      'US/Arizona': [ 5.532 ],
      'US': [ 5.532 ]
    })
  });

  it('should make properly formatted queries', () => {
    assert.deepEqual(index.queries, [
        [ 'John Doe', 'Canada' ],
        [ 'John Doe', 'Canada/Ontario' ],
        [ 'Alicia Yazzie', 'US/Arizona' ]
      ])
  });

  it('should populate results', () => {
    assert.deepEqual(index.results, [
      [ 'John Doe', 'Canada', 4 ],
      [ 'John Doe', 'Canada/Ontario', 5 ],
      [ 'Alicia Yazzie', 'US/Arizona', 10 ] 
    ])
  });

});
