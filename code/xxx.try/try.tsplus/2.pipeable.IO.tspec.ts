/* eslint-disable mxm/have-begin-end-file-fns */
/* eslint-disable mxm/have-begin-end-file-comments */
import * as _ from './2.pipeable.IO';
import { pipe } from 'fp-ts/function';

describe('program', () => {
  test('try', () => {
    const prog = pipe(
      _.succeed(222),
      _.map((n: number) => n * 2),
      _.flatMap((n) => _.succeedW(() => n + 1))
    );

    const result = _.run(prog);
    expect(result).toEqual(445);
  });
});
