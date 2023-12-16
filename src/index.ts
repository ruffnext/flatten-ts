import * as flat from "flat"

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never;

type JoinPath<A, B> = A extends string | number
  ? B extends string | number
  ? `${A}.${B}`
  : A
  : B extends string | number
  ? B
  : "";

type FlattenInner<T extends Object, P = {}> = number extends T
  ? /* catch any */ Object
  : T extends (infer V)[]
  ? /* array */ { [K in JoinPath<P, number>] ? : V } & (V extends Object
    ? Partial<FlattenInner<V, JoinPath<P, number>>>
    : {})
  : /* record */ UnionToIntersection<{ [K in keyof T]: T[K] extends Object ? FlattenInner<T[K], JoinPath<P, K>> : never }[keyof T]> 
  & { [K in keyof T as JoinPath<P, K>]: T[K] };

  export type Flatten<T extends Object, P = {}> = number extends T
  ? /* catch any */ Object
  : T extends (infer V)[]
  ? /* array */ { [K in JoinPath<P, number>] ? : V } & (V extends Object
    ? Partial<FlattenInner<V, JoinPath<P, number>>>
    : {})
  : /* record */ UnionToIntersection<{ [K in keyof T]: T[K] extends Object ? FlattenInner<T[K], JoinPath<P, K>> : never }[keyof T]> ;

export function flatten<T>(val : T) : Flatten<T> {
  const res : any = flat.flatten(val) as any;
  return res as Flatten<T>
}

export function unflatten<T>(val : Flatten<T>) : T {
  const res : T = flat.unflatten(val) as T;
  return res
}
