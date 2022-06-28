/* eslint-disable mxm/have-begin-end-file-fns */
/* eslint-disable mxm/have-begin-end-file-comments */

export class IO<A> {
  private constructor(readonly io: () => A) {}

  static succeed = <A>(a: A) => new IO(() => a);
  static succeedW = <A>(a: () => A) => new IO(a);

  map<A, B>(this: IO<A>, f: (a: A) => B): IO<B> {
    return new IO(() => f(this.io()));
  }

  flatMap<A, B>(this: IO<A>, f: (a: A) => IO<B>): IO<B> {
    return new IO(() => f(this.io()).io());
  }

  zip<A, B>(this: IO<A>, b: IO<B>): IO<[A, B]> {
    return new IO(() => [this.io(), b.io()]);
  }

  run<A>(this: IO<A>) {
    return this.io();
  }
}
