import { isInt, asyncForEach } from '../';

describe('util/index', () => {
  it.each([
    [9, true],
    ['t', false],
    [{}, false],
    [undefined, false],
  ])('should test int', (val: any, result: boolean) => {
    expect(isInt(val)).toBe(result);
  });
});
