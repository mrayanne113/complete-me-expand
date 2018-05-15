import { assert } from 'chai';
import Node from '../scripts/Node.js';

describe.only('Node', () => {
  let node;

  beforeEach(() => {
    node = new Node();
  });

  it('should be an object', () => {
    assert.isObject(node);
  });

  it('should start with default values', () => {
    assert.deepEqual(node.children, {});
    assert.equal(node.complete, null);
  });

  it('should return null if data isnt passed in', () => {
    assert.deepEqual(node.data, null);
  });

  it('should return data if data is passed in', () => {
    let node2 = new Node('k');

    assert.equal(node2.data, 'k');
  });
});
