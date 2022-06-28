/* eslint-disable mxm/have-begin-end-file-fns */
/* eslint-disable mxm/have-begin-end-file-comments */
import * as _ from '@xxx/3.tsplus.IO';

describe('program', () => {
  test('try', () => {
    const prog = _.IO.succeed(111)
      .map((n) => n * 2)
      .flatMap((n) => _.IO.succeedW(() => n + 1));

    const result = prog.run();
    expect(result).toEqual(223);
  });
});
