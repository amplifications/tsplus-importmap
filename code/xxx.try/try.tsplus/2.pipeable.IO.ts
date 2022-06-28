/* eslint-disable mxm/have-begin-end-file-fns */
/* eslint-disable mxm/have-begin-end-file-comments */

export class IO<A> {
  constructor(readonly io: () => A) {}
}

/** ### succeed ‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥
 * @haskell `succeed :: ( A ) -> ?`
 * @
 */
export const succeed = <A>(a: A) => new IO(() => a);

/** ### succeedW ‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥
 * @haskell `succeedW :: ( (() ---> A) ) -> ?`
 * @
 */
export const succeedW = <A>(a: () => A) => new IO(a);

/** ### map ‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥
 * @haskell `map :: ( (( A ) ---> B) ) -> ( IO A ) -> IO B`
 * @
 */
export const map =
  <A, B>(f: (a: A) => B) =>
  (self: IO<A>): IO<B> => {
    return new IO(() => f(self.io()));
  };

/** ### flatMap ‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥
 * @haskell `flatMap :: ( (( A ) ---> IO B) ) -> ( IO A ) -> IO B`
 * @
 */
export const flatMap =
  <A, B>(f: (a: A) => IO<B>) =>
  (self: IO<A>): IO<B> => {
    return new IO(() => f(self.io()).io());
  };

/** ### zip ‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥
 * @haskell `zip :: ( IO A  ->  IO B ) -> IO ?TSTupleType?`
 * @
 */
export const zip = <A, B>(self: IO<A>, b: IO<B>): IO<[A, B]> =>
  new IO(() => [self.io(), b.io()]);

/** ### run ‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥
 * @haskell `run :: ( IO A ) -> ?`
 * @
 */
export const run = <A>(self: IO<A>) => self.io();
