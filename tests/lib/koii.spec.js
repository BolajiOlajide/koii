const koii = require('../../lib');

describe('KOII', () => {
  it('displays routes', () => {
    expect(koii._events.mount.length).toBe(2);
  });
});
