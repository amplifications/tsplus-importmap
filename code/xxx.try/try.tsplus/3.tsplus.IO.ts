/* eslint-disable mxm/have-begin-end-file-fns */
/* eslint-disable mxm/have-begin-end-file-comments */

/**
 * @tsplus type mxm.IO
 */

export class IO<A> {
  constructor(readonly io: () => A) {}

  static succeed = <A>(a: A) => new IO(() => a);
  static succeedW = <A>(a: () => A) => new IO(a);
}

/** ### map ‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥
 * @tsplus fluent mxm.IO map
 * @haskell `map :: ( IO A  ->  (( A ) ---> B) ) -> IO B`
 * @
 */
export const map = <A, B>(self: IO<A>, f: (a: A) => B): IO<B> => {
  return new IO(() => f(self.io()));
};

/** ### flatMap ‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥
 * @tsplus fluent mxm.IO flatMap
 * @haskell `flatMap :: ( IO A  ->  (( A ) ---> IO B) ) -> IO B`
 * @
 */
export const flatMap = <A, B>(self: IO<A>, f: (a: A) => IO<B>): IO<B> => {
  return new IO(() => f(self.io()).io());
};

/** ### zip ‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥
 * @tsplus fluent mxm.IO zip
 * @haskell `zip :: ( IO B ) -> ( IO A ) -> IO ?TSTupleType?`
 * @
 */
export const zip =
  <A, B>(b: IO<B>) =>
  (self: IO<A>): IO<[A, B]> =>
    new IO(() => [self.io(), b.io()]);

/** ### run ‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥
 * @tsplus fluent mxm.IO run
 * @haskell `run :: ( IO A ) -> ?`
 * @
 */
export const run = <A>(self: IO<A>) => self.io();
